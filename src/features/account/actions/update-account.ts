"use server";

import { z } from "zod";
import {
  errorToActionState,
  toActionState,
  validatedActionWithUser,
} from "@/lib/action-state";
import { prisma } from "@/lib/prisma";

const updateAccountSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().email("Invalid email address"),
});

export const updateAccount = validatedActionWithUser(
  updateAccountSchema,
  async (data, formData, user) => {
    try {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data,
      });
    } catch (error) {
      return errorToActionState(error, formData);
    }

    return toActionState("SUCCESS", "Account updated successfully", formData);
  },
);
