import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketsSkeleton } from "@/features/ticket/components/ticket-skeletons";

const TicketsPage = async () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Tickets Page"
        description="All your tickets at one place"
      />
      <Suspense fallback={<TicketsSkeleton />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
