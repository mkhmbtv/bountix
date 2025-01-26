"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { verifyPasswordHash } from "@/features/auth/utils/password";
import { deleteSessionTokenCookie } from "@/features/auth/utils/session-cookie";
import {
  errorToActionState,
  toActionState,
  validatedActionWithUser,
} from "@/lib/action-state";
import { prisma } from "@/lib/prisma";
import { signInPath } from "@/paths";

const deleteAccountSchema = z.object({
  password: z.string().min(6).max(191),
});

export const deleteAccount = validatedActionWithUser(
  deleteAccountSchema,
  async (data, formData, user) => {
    const { password } = data;

    const validPassword = await verifyPasswordHash(user.passwordHash, password);

    if (!validPassword) {
      return toActionState(
        "ERROR",
        "Incorrect password. Account deletion failed.",
        formData,
      );
    }

    try {
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });
      await deleteSessionTokenCookie();
    } catch (error) {
      return errorToActionState(error, formData);
    }

    redirect(signInPath());
  },
);
