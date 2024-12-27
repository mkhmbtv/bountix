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
import { ticketPath, ticketsPath } from "@/paths";
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
  bounty: z.coerce.number().positive(),
});

export const upsertTicket = validatedActionWithUser(
  upsertTicketSchema,
  async (data, formData, user) => {
    const { id, title, content, deadline, bounty } = data;

    try {
      if (id) {
        const ticket = await prisma.ticket.findUnique({
          where: {
            id,
          },
        });

        if (!ticket || !isOwner(user, ticket)) {
          return toActionState("ERROR", "Not Authorized");
        }
      }

      const dbData = {
        title,
        content,
        deadline,
        userId: user.id,
        bounty: toCent(bounty),
      };

      await prisma.ticket.upsert({
        where: {
          id: data.id || "",
        },
        create: dbData,
        update: dbData,
      });
    } catch (error) {
      return errorToActionState(error, formData);
    }

    revalidatePath(ticketsPath());
    if (id) {
      await setCookieByKey("toast", "Ticket updated");
      redirect(ticketPath(id));
    }

    return toActionState("SUCCESS", "Ticket created");
  },
);
