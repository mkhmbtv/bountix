"use server";

import { getCurrentSession, invalidateSession } from "@/lib/session";
import { deleteSessionTokenCookie } from "../utils/session-cookie";

export const signOut = async () => {
  const { session } = await getCurrentSession();
  if (session !== null) {
    await invalidateSession(session.id);
    await deleteSessionTokenCookie();
  }
};
