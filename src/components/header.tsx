"use client";

import { LucideKanban, LucideLogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/features/auth/actions/sign-out";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/paths";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { Button, buttonVariants } from "./ui/button";

const Header = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push(signInPath());
  };

  return (
    <header className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 flex w-full justify-between border-b bg-background/95 px-5 py-2.5 backdrop-blur">
      <div className="flex items-center gap-x-2">
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideKanban />
          <h1 className="text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-2">
        <ThemeSwitcher />
        <Link
          href={ticketsPath()}
          className={buttonVariants({ variant: "default" })}
        >
          Tickets
        </Link>
        <Link
          href={signUpPath()}
          className={buttonVariants({ variant: "outline" })}
        >
          Sign Up
        </Link>
        <Link
          href={signInPath()}
          className={buttonVariants({ variant: "outline" })}
        >
          Sign In
        </Link>
        <form action={handleSignOut}>
          <Button>
            <LucideLogOut className="h-4 w-4" />
            <span>Sign out</span>
          </Button>
        </form>
      </div>
    </header>
  );
};

export { Header };
