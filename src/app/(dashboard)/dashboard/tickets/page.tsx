import { Suspense } from "react";
import { Heading } from "@/components/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentSession } from "@/features/auth/actions/get-current-session";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketsSkeleton } from "@/features/ticket/components/ticket-skeletons";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";

type SearchParams = Promise<{ query?: string; sort?: string }>;

const TicketsPage = async (props: { searchParams?: SearchParams }) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "";

  const { user } = await getCurrentSession();

  return (
    <section className="flex flex-col gap-y-8 px-8 py-24">
      <Heading
        title="Tickets Page"
        description="All your tickets at one place"
      />
      <Card className="w-full max-w-[420px] self-center">
        <CardHeader>
          <CardTitle>Create Ticket</CardTitle>
          <CardDescription>A new ticket will be created</CardDescription>
        </CardHeader>
        <CardContent>
          <TicketUpsertForm />
        </CardContent>
      </Card>
      <Suspense fallback={<TicketsSkeleton />}>
        <TicketList userId={user?.id} query={query} sort={sort} />
      </Suspense>
    </section>
  );
};

export default TicketsPage;
