"use server";

import { z } from "zod";
import {
  hashPassword,
  verifyPasswordHash,
} from "@/features/auth/utils/password";
import {
  errorToActionState,
  toActionState,
  validatedActionWithUser,
} from "@/lib/action-state";
import { prisma } from "@/lib/prisma";

const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(6).max(191),
    newPassword: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const updatePassword = validatedActionWithUser(
  updatePasswordSchema,
  async (data, formData, user) => {
    const { currentPassword, newPassword } = data;

    const validPassword = await verifyPasswordHash(
      user.passwordHash,
      currentPassword,
    );

    if (!validPassword) {
      return toActionState("ERROR", "Current password is incorrect", formData);
    }

    if (newPassword === currentPassword) {
      return toActionState(
        "ERROR",
        "New password must be different from the current password.",
        formData,
      );
    }

    try {
      const newPasswordHash = await hashPassword(newPassword);
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          passwordHash: newPasswordHash,
        },
      });
    } catch (error) {
      return errorToActionState(error);
    }

    return toActionState("SUCCESS", "Password updated successfully.");
  },
);
