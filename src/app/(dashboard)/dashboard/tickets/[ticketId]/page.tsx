import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Spinner } from "@/components/spinner";
import { CommentList } from "@/features/comments/components/comment-list";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { TicketItemSkeleton } from "@/features/ticket/components/ticket-skeletons";
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
    <section className="px-8 py-24">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: dashboardPath() },
          { title: ticket.title },
        ]}
      />
      <div className="mt-12 flex animate-fade-from-top flex-col items-center gap-y-8">
        <Suspense fallback={<TicketItemSkeleton isDetail />}>
          <TicketItem ticket={ticket} isDetail />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <CommentList ticketId={ticket.id} />
        </Suspense>
      </div>
    </section>
  );
};

export default TicketPage;
