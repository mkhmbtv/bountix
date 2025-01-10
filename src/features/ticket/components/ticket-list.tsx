import { Placeholder } from "@/components/placeholder";
import { Search } from "@/components/search";
import { SortSelect } from "@/components/sort-select";
import { getTickets } from "../queries/get-tickets";
import { TicketItem } from "./ticket-item";

type TicketListProps = {
  userId?: string;
  query: string;
  sort: string;
};

const TicketList = async ({ userId, query, sort }: TicketListProps) => {
  const tickets = await getTickets(userId, query, sort);

  return (
    <div className="flex animate-fade-from-top flex-col items-center gap-y-4">
      <div className="flex w-full max-w-[420px] gap-x-2">
        <Search placeholder="Search tickets..." />
        <SortSelect
          defaultValue="newest"
          options={[
            { label: "Newest", value: "newest" },
            { label: "Bounty", value: "bounty" },
          ]}
        />
      </div>
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
