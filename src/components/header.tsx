"use client";

import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { useSession } from "@/features/auth/hooks/use-session";
import { dashboardPath, homePath, signInPath, signUpPath } from "@/paths";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { buttonVariants } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const Header = () => {
  const { user, isLoading } = useSession();

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full justify-between border-b border-border bg-background/80 px-5 backdrop-blur-sm">
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
        {isLoading ? (
          <>
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </>
        ) : user ? (
          <>
            <Link
              href={dashboardPath()}
              className={buttonVariants({ variant: "default" })}
            >
              Dashboard
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
