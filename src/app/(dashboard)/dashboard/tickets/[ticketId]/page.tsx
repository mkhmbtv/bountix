import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { dashboardPath } from "@/paths";

const TicketPage = async ({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) => {
  const ticketId = (await params).ticketId;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    return notFound();
  }

  return (
    <section className="px-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: dashboardPath() },
          { title: ticket.title },
        ]}
      />
      <div className="mt-12 flex animate-fade-from-top justify-center">
        <TicketItem ticket={ticket} isDetail />
      </div>
    </section>
  );
};

export default TicketPage;
