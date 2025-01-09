import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketsSkeleton } from "@/features/ticket/components/ticket-skeletons";

type SearchParams = Promise<{ query?: string }>;

const DashboardPage = async (props: { searchParams?: SearchParams }) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  return (
    <section className="flex flex-col gap-y-8 px-8 py-24">
      <Heading
        title="Browse all tickets"
        description="Tickets by everyone at one place"
      />
      <Suspense fallback={<TicketsSkeleton />}>
        <TicketList query={query} />
      </Suspense>
    </section>
  );
};

export default DashboardPage;
