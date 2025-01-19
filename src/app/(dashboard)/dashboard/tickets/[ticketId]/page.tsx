import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CommentCreateForm } from "@/features/comments/components/comment-create-form";
import { CommentList } from "@/features/comments/components/comment-list";
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
  const ticketData = getTicket(ticketId);
  const commentsData = getComments(ticketId);

  const [ticket, comments] = await Promise.all([ticketData, commentsData]);

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
        <CommentCreateForm ticketId={ticket.id} />
        <CommentList comments={comments} />
      </div>
    </section>
  );
};

export default TicketPage;
