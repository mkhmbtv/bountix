"use server";

import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/features/auth/actions/get-current-session";
import { isOwner } from "@/features/auth/utils/user";
import { errorToActionState, toActionState } from "@/lib/action-state";
import { prisma } from "@/lib/prisma";
import { signInPath, ticketsPath } from "@/paths";

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  const { user } = await getCurrentSession();
  if (!user) {
    redirect(signInPath());
  }

  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
      },
    });

    if (!ticket || !isOwner(user, ticket)) {
      return toActionState("ERROR", "Not Authorized");
    }

    await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  } catch (error) {
    return errorToActionState(error);
  }

  revalidatePath(ticketsPath());

  return toActionState("SUCCESS", "Status updated");
};
