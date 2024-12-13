import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { RedirectToast } from "@/components/redirect-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketsSkeleton } from "@/features/ticket/components/ticket-skeletons";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";

const TicketsPage = async () => {
  return (
    <>
      <div className="flex flex-1 flex-col gap-y-8">
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
          <TicketList />
        </Suspense>
      </div>
      <RedirectToast />
    </>
  );
};

export default TicketsPage;
