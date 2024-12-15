"use client";

import { Ticket } from "@prisma/client";
import { LucideLoaderCircle } from "lucide-react";
import { useActionState, useRef } from "react";
import { toast } from "sonner";
import { DatePicker,type DatePickerHandle } from "@/components/date-picker";
import { ErrorList } from "@/components/form/field-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionFeedback } from "@/hooks/use-action-feedback";
import { EMPTY_ACTION_STATE } from "@/lib/action-state";
import { fromCent } from "@/utils/currency";
import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action, isPending] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE,
  );

  const datePickerRef = useRef<DatePickerHandle>(null);

  const handleSuccess = () => {
    datePickerRef.current?.reset();
  };

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }

      handleSuccess();
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
    },
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        type="text"
        name="title"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
        aria-describedby="title-error"
      />
      <ErrorList errors={actionState.fieldErrors.title} id="title-error" />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
        aria-describedby="content-error"
      />
      <ErrorList errors={actionState.fieldErrors.content} id="content-error" />

      <div className="mb-2 flex gap-x-2">
        <div className="flex-1">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker
            ref={datePickerRef}
            id="deadline"
            name="deadline"
            defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline
            }
            ariaDescribedBy="deadline-error"
          />
          <ErrorList
            errors={actionState.fieldErrors.deadline}
            id="deadline-error"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            id="bounty"
            type="number"
            name="bounty"
            step=".01"
            defaultValue={
              (actionState.payload?.get("bounty") as string) ??
              (ticket?.bounty ? fromCent(ticket.bounty) : "")
            }
            aria-describedby="bounty-error"
          />
          <ErrorList
            errors={actionState.fieldErrors.bounty}
            id="bounty-error"
          />
        </div>
      </div>

      <Button type="submit">
        {isPending && (
          <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        )}
        {ticket ? "Edit" : "Create"}
      </Button>
    </form>
  );
};

export { TicketUpsertForm };
