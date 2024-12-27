"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/actions/cookies";
import { isOwner } from "@/features/auth/utils/user";
import {
  errorToActionState,
  toActionState,
  validatedActionWithUser,
} from "@/lib/action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const deleteTicketSchema = z.object({
  id: z.string(),
});

export const deleteTicket = validatedActionWithUser(
  deleteTicketSchema,
  async (data, _, user) => {
    try {
      const { id } = data;
      const ticket = await prisma.ticket.findUnique({
        where: {
          id,
        },
      });

      if (!ticket || !isOwner(user, ticket)) {
        return toActionState("ERROR", "Not Authorized");
      }
      await prisma.ticket.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return errorToActionState(error);
    }

    revalidatePath(ticketsPath());
    await setCookieByKey("toast", "Ticket deleted");
    redirect(ticketsPath());
  },
);
