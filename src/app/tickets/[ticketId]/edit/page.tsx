import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentSession } from "@/features/auth/actions/get-current-session";
import { isOwner } from "@/features/auth/utils/user";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

const EditTicketPage = async ({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) => {
  const ticketId = (await params).ticketId;
  const ticket = await getTicket(ticketId);

  const { user } = await getCurrentSession();

  const isTicketFound = !!ticket;
  const isTicketOwner = isOwner(user, ticket);

  if (!isTicketFound || !isTicketOwner) {
    return notFound();
  }

  return (
    <div className="flex flex-1 animate-fade-from-top flex-col items-center justify-center">
      <Card className="w-full max-w-[420px]">
        <CardHeader>
          <CardTitle>Edit Ticket</CardTitle>
          <CardDescription>Edit an existing ticket</CardDescription>
        </CardHeader>
        <CardContent>
          <TicketUpsertForm ticket={ticket} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditTicketPage;
