import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
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
import { dashboardPath, ticketPath } from "@/paths";

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
    <section className="px-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: dashboardPath() },
          { title: ticket.title, href: ticketPath(ticket.id) },
          { title: "Edit" },
        ]}
      />
      <div className="flex flex-col items-center justify-center py-12">
        <Card className="w-full max-w-[420px] animate-fade-from-top">
          <CardHeader>
            <CardTitle>Edit Ticket</CardTitle>
            <CardDescription>Edit an existing ticket</CardDescription>
          </CardHeader>
          <CardContent>
            <TicketUpsertForm ticket={ticket} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EditTicketPage;
