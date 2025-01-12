import { Placeholder } from "@/components/placeholder";
import { getTickets } from "../queries/get-tickets";
import { ParsedSearchParams } from "../search-params";
import { TicketItem } from "./ticket-item";
import { TicketSearch } from "./ticket-search";
import { TicketSortSelect } from "./ticket-sort-select";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);

  return (
    <div className="flex animate-fade-from-top flex-col items-center gap-y-4">
      <div className="flex w-full max-w-[420px] gap-x-2">
        <TicketSearch />
        <TicketSortSelect
          options={[
            { label: "Newest", sortKey: "createdAt", sortValue: "desc" },
            { label: "Oldest", sortKey: "createdAt", sortValue: "asc" },
            { label: "Bounty", sortKey: "bounty", sortValue: "desc" },
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
