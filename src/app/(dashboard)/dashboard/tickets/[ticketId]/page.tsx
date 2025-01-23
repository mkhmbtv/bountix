import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Comments } from "@/features/comments/components/comments";
import { getComments } from "@/features/comments/queries/get-comments";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { dashboardPath } from "@/paths";

const TicketPage = async ({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) => {
  const ticketId = (await params).ticketId;
  const ticketPromise = getTicket(ticketId);
  const commentsPromise = getComments(ticketId);

  const [ticket, commentsData] = await Promise.all([
    ticketPromise,
    commentsPromise,
  ]);
  const { data: comments, nextCursor } = commentsData;

  if (!ticket) {
    return notFound();
  }

  return (
    <section className="px-8 py-24">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: dashboardPath() },
          { title: ticket.title },
        ]}
      />
      <div className="mt-12 flex animate-fade-from-top flex-col items-center gap-y-8">
        <TicketItem ticket={ticket} isDetail />
        <Comments
          ticketId={ticket.id}
          initialComments={comments}
          nextCursor={nextCursor}
        />
      </div>
    </section>
  );
};

export default TicketPage;
