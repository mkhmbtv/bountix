"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { isOwner } from "@/features/auth/utils/user";
import {
  errorToActionState,
  toActionState,
  validatedActionWithUser,
} from "@/lib/action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/paths";

const deleteCommentSchema = z.object({
  id: z.string(),
});

export const deleteComment = validatedActionWithUser(
  deleteCommentSchema,
  async (data, _, user) => {
    const { id } = data;
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment || !isOwner(user, comment)) {
      return toActionState("ERROR", "Not Authorized");
    }

    try {
      await prisma.comment.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return errorToActionState(error);
    }

    revalidatePath(ticketPath(comment.ticketId));
    return toActionState("SUCCESS", "Comment deleted");
  },
);
