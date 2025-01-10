import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketsSkeleton } from "@/features/ticket/components/ticket-skeletons";
import { searchParamsCache } from "@/features/ticket/search-params";

type DashboardPageProps = {
  searchParams: Promise<SearchParams>;
};

const DashboardPage = async ({ searchParams }: DashboardPageProps) => {
  return (
    <section className="flex flex-col gap-y-8 px-8 py-24">
      <Heading
        title="Browse all tickets"
        description="Tickets by everyone at one place"
      />
      <Suspense fallback={<TicketsSkeleton />}>
        <TicketList
          searchParams={searchParamsCache.parse(await searchParams)}
        />
      </Suspense>
    </section>
  );
};

export default DashboardPage;
