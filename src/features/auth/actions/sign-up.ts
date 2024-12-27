"use server";

import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  errorToActionState,
  toActionState,
  validatedAction,
} from "@/lib/action-state";
import { prisma } from "@/lib/prisma";
import { createSession, generateSessionToken } from "@/lib/session";
import { ticketsPath } from "@/paths";
import { hashPassword } from "../utils/password";
import { setSessionTokenCookie } from "../utils/session-cookie";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine(
        (value) => !value.includes(" "),
        "Username cannot contain spaces",
      ),
    email: z.string().min(1, { message: "Is required" }).max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
  try {
    const { username, email, password } = data;

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionTokenCookie(sessionToken, session.expiresAt);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return toActionState(
        "ERROR",
        "Either email or username is already in use",
        formData,
      );
    }
    return errorToActionState(error, formData);
  }

  redirect(ticketsPath());
});
