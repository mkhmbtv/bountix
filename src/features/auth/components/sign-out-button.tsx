"use client";

import { LucideLogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { homePath } from "@/paths";
import { signOut } from "../actions/sign-out";

type SignOutButtonProps = {
  onClick?: () => void;
};

const SignOutButton = ({ onClick }: SignOutButtonProps) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push(homePath());
    onClick?.();
  };

  return (
    <form action={handleSignOut} className="w-full">
      <FormButton />
    </form>
  );
};

const FormButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="flex w-full" disabled={pending}>
      <DropdownMenuItem className="w-full flex-1 cursor-pointer">
        <LucideLogOut className="h-4 w-4" />
        <span>Sign out</span>
      </DropdownMenuItem>
    </button>
  );
};

export { SignOutButton };
