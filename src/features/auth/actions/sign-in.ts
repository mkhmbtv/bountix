"use server";

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
import { verifyPasswordHash } from "../utils/password";
import { setSessionTokenCookie } from "../utils/session-cookie";

const signInSchema = z.object({
  email: z.string().min(1, { message: "Is required" }).max(191).email(),
  password: z.string().min(6).max(191),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  try {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return toActionState("ERROR", "Invalid email or password", formData);
    }

    const validPassword = await verifyPasswordHash(user.passwordHash, password);

    if (!validPassword) {
      return toActionState("ERROR", "Invalid email or password", formData);
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionTokenCookie(sessionToken, session.expiresAt);
  } catch (error) {
    return errorToActionState(error, formData);
  }

  redirect(ticketsPath());
});
