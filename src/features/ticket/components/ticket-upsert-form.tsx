"use client";

import { Ticket } from "@prisma/client";
import { LucideLoaderCircle } from "lucide-react";
import { useActionState } from "react";
import { ErrorList } from "@/components/form/field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EMPTY_ACTION_STATE } from "@/lib/action-state";
import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [state, action, isPending] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        type="text"
        name="title"
        defaultValue={(state.payload?.get("title") as string) ?? ticket?.title}
        aria-describedby="title-error"
      />
      <ErrorList errors={state.fieldErrors.title} id="title-error" />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (state.payload?.get("content") as string) ?? ticket?.content
        }
        aria-describedby="content-error"
      />
      <ErrorList errors={state.fieldErrors.content} id="content-error" />

      <Button type="submit">
        {isPending && (
          <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        )}
        {ticket ? "Edit" : "Create"}
      </Button>
      {state.message}
    </form>
  );
};

export { TicketUpsertForm };
