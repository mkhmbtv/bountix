"use server";

import { invalidateSession } from "@/lib/session";
import { deleteSessionTokenCookie } from "../utils/session-cookie";
import { getCurrentSession } from "./get-current-session";

export const signOut = async () => {
  const { session } = await getCurrentSession();
  if (session !== null) {
    await invalidateSession(session.id);
    await deleteSessionTokenCookie();
  }
};
