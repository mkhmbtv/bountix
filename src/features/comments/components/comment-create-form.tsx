"use client";

import { LucideLoaderCircle } from "lucide-react";
import { useActionState } from "react";
import { ErrorList } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EMPTY_ACTION_STATE } from "@/lib/action-state";
import { createComment } from "../actions/create-comment";

type CommentCreateFormProps = {
  ticketId: string;
};

const CommentCreateForm = ({ ticketId }: CommentCreateFormProps) => {
  const [actionState, action, isPending] = useActionState(
    createComment,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form
      action={action}
      actionState={actionState}
      className="w-full max-w-[580px] gap-y-4"
    >
      <input type="hidden" name="ticketId" value={ticketId} />
      <div className="space-y-2">
        <Textarea
          name="content"
          placeholder="Write your comment..."
          className="min-h-[100px]"
          aria-describedby="content-error"
        />
        <ErrorList
          errors={actionState.fieldErrors.content}
          id="content-error"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            "Post Comment"
          )}
        </Button>
      </div>
    </Form>
  );
};

export { CommentCreateForm };
