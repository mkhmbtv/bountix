"use client";

import { LucideLoader2, LucideTrash2 } from "lucide-react";
import { useActionState } from "react";
import { ErrorList } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMPTY_ACTION_STATE } from "@/lib/action-state";
import { deleteAccount } from "../actions/delete-account";

const DeleteAccountForm = () => {
  const [actionState, formAction, isPending] = useActionState(
    deleteAccount,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={formAction} actionState={actionState} className="space-y-4">
      <div>
        <Label htmlFor="delete-password">Confirm Password</Label>
        <Input
          id="delete-password"
          name="password"
          type="password"
          aria-describedby="password-error"
          defaultValue={actionState.payload?.get("password") as string}
        />
        <ErrorList
          errors={actionState.fieldErrors.password}
          id="password-error"
        />
      </div>
      <Button
        type="submit"
        variant="destructive"
        className="bg-red-600 hover:bg-red-700"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
            Deleting...
          </>
        ) : (
          <>
            <LucideTrash2 className="mr-2 h-4 w-4" />
            Delete Account
          </>
        )}
      </Button>
    </Form>
  );
};

export { DeleteAccountForm };
