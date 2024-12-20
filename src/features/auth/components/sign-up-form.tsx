"use client";

import { LucideLoaderCircle } from "lucide-react";
import { useActionState } from "react";
import { ErrorList } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMPTY_ACTION_STATE } from "@/lib/action-state";
import { signUp } from "../actions/sign-up";

const SignUpForm = () => {
  const [actionState, action, isPending] = useActionState(
    signUp,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState} className="gap-y-4">
      <div className="flex flex-col gap-1">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="your.username"
            defaultValue={actionState.payload?.get("username") as string}
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
            placeholder="your.email@provider.com"
            defaultValue={actionState.payload?.get("email") as string}
            aria-describedby="email-error"
          />

          <ErrorList errors={actionState.fieldErrors.email} id="email-error" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••••••"
            defaultValue={actionState.payload?.get("password") as string}
            aria-describedby="password-error"
          />
          <ErrorList
            errors={actionState.fieldErrors.password}
            id="password-error"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••••••"
            defaultValue={actionState.payload?.get("confirmPassword") as string}
            aria-describedby="confirmPassword-error"
          />
          <ErrorList
            errors={actionState.fieldErrors.confirmPassword}
            id="confirmPassword-error"
          />
        </div>
      </div>
      <Button type="submit">
        {isPending && (
          <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        )}
        Sign Up
      </Button>
    </Form>
  );
};

export { SignUpForm };
