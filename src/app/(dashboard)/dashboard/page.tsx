import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketsSkeleton } from "@/features/ticket/components/ticket-skeletons";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-y-8 px-8 py-24">
      <Heading
        title="Browse all tickets"
        description="Tickets by everyone at one place"
      />
      <main>
        <Suspense fallback={<TicketsSkeleton />}>
          <TicketList />
        </Suspense>
      </main>
    </div>
  );
};

export default DashboardPage;
