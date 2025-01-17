"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  errorToActionState,
  toActionState,
  validatedActionWithUser,
} from "@/lib/action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/paths";

const createCommentSchema = z.object({
  ticketId: z.string(),
  content: z.string().min(1).max(1024),
});

export const createComment = validatedActionWithUser(
  createCommentSchema,
  async (data, _formData, user) => {
    const { content, ticketId } = data;
    try {
      await prisma.comment.create({
        data: {
          userId: user.id,
          ticketId,
          content,
        },
      });
    } catch (error) {
      return errorToActionState(error);
    }

    revalidatePath(ticketPath(ticketId));
    return toActionState("SUCCESS", "Comment created");
  },
);
