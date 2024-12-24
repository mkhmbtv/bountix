"use client";

import { LucideLoaderCircle, LucideLogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { signInPath } from "@/paths";
import { signOut } from "../actions/sign-out";

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push(signInPath());
  };

  return (
    <form action={handleSignOut}>
      <FormButton />
    </form>
  );
};

const FormButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending}>
      {pending ? (
        <LucideLoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <LucideLogOut className="h-4 w-4" />
      )}
      <span>Sign out</span>
    </Button>
  );
};

export { SignOutButton };
