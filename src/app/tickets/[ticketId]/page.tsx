import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { ticketsPath } from "@/paths";

const TicketPage = async ({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) => {
  const ticketId = (await params).ticketId;
  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);

  if (!ticket) {
    return (
      <Placeholder
        label="Ticket not found"
        button={
          <Button asChild variant="outline">
            <Link href={ticketsPath()}>Go to tickets</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="animate-fade-from-top flex justify-center">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
};

export default TicketPage;
