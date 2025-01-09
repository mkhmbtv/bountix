import { Placeholder } from "@/components/placeholder";
import { Search } from "@/components/search";
import { getTickets } from "../queries/get-tickets";
import { TicketItem } from "./ticket-item";

type TicketListProps = {
  userId?: string;
  query: string;
};

const TicketList = async ({ userId, query }: TicketListProps) => {
  const tickets = await getTickets(userId, query);

  return (
    <div className="flex animate-fade-from-top flex-col items-center gap-y-4">
      <Search placeholder="Search tickets..." />
      {tickets.length > 0 ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <div className="pt-20">
          <Placeholder label="No tickets found" />
        </div>
      )}
    </div>
  );
};

export { TicketList };
