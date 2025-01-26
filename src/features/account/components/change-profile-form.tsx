"use client";

import { User } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { ErrorList } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionState, EMPTY_ACTION_STATE } from "@/lib/action-state";
import { updateAccount } from "../actions/update-account";

type UpdateAccountFormProps = {
  user: User;
};

const UpdateAccountForm = ({ user }: UpdateAccountFormProps) => {
  const [actionState, formAction, isPending] = useActionState<
    ActionState,
    FormData
  >(updateAccount, EMPTY_ACTION_STATE);

  return (
    <Form action={formAction} actionState={actionState} className="space-y-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          placeholder="Enter your username"
          defaultValue={
            (actionState.payload?.get("username") as string) ?? user?.username
          }
          aria-describedby="username-error"
        />
        <ErrorList
          errors={actionState.fieldErrors.username}
          id="username-error"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          defaultValue={
            (actionState.payload?.get("email") as string) ?? user?.email
          }
          aria-describedby="email-error"
        />
        <ErrorList errors={actionState.fieldErrors.email} id="email-error" />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </Form>
  );
};

export { UpdateAccountForm };
