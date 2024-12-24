"use client";

import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { useSession } from "@/features/auth/hooks/use-session";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/paths";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { buttonVariants } from "./ui/button";

const Header = () => {
  const { user, isLoading } = useSession();

  if (isLoading) {
    return null;
  }

  return (
    <header className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 flex w-full animate-header-from-top justify-between border-b bg-background/95 px-5 py-2.5 backdrop-blur">
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
        {user ? (
          <>
            <Link
              href={ticketsPath()}
              className={buttonVariants({ variant: "default" })}
            >
              Tickets
            </Link>
            <SignOutButton />
          </>
        ) : (
          <>
            <Link
              href={signUpPath()}
              className={buttonVariants({ variant: "outline" })}
            >
              Sign Up
            </Link>
            <Link
              href={signInPath()}
              className={buttonVariants({ variant: "default" })}
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export { Header };
