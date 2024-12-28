import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketsSkeleton } from "@/features/ticket/components/ticket-skeletons";

const HomePage = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="Home Page"
        description="Tickets by everyone at one place"
      />
      <Suspense fallback={<TicketsSkeleton />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default HomePage;
