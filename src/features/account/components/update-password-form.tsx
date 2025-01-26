"use client";

import { LucideLoader2, LucideLock } from "lucide-react";
import { useActionState } from "react";
import { ErrorList } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMPTY_ACTION_STATE } from "@/lib/action-state";
import { updatePassword } from "../actions/update-password";

const UpdatePasswordForm = () => {
  const [actionState, formAction, isPending] = useActionState(
    updatePassword,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={formAction} actionState={actionState} className="space-y-4">
      <div>
        <Label htmlFor="current-password">Current Password</Label>
        <Input
          id="current-password"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          aria-describedby="current-password-error"
          defaultValue={actionState.payload?.get("currentPassword") as string}
        />
        <ErrorList
          errors={actionState.fieldErrors.currentPassword}
          id="current-password-error"
        />
      </div>

      <div>
        <Label htmlFor="new-password">New Password</Label>
        <Input
          id="new-password"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          aria-describedby="new-password-error"
          defaultValue={actionState.payload?.get("newPassword") as string}
        />
        <ErrorList
          errors={actionState.fieldErrors.newPassword}
          id="new-password-error"
        />
      </div>
      <div>
        <Label htmlFor="confirm-password">Confirm New Password</Label>
        <Input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          aria-describedby="confirm-password-error"
          defaultValue={actionState.payload?.get("confirmPassword") as string}
        />
        <ErrorList
          errors={actionState.fieldErrors.confirmPassword}
          id="confirm-password-error"
        />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          <>
            <LucideLock className="mr-2 h-4 w-4" />
            Update Password
          </>
        )}
      </Button>
    </Form>
  );
};

export { UpdatePasswordForm };
