"use client";

import {
  LucideHouse,
  LucideKanban,
  LucideLock,
  LucideUser,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { useSession } from "@/features/auth/hooks/use-session";
import {
  accountPasswordPath,
  accountProfilePath,
  dashboardPath,
  homePath,
  signUpPath,
} from "@/paths";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, triggerSessionUpdate } = useSession();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-[--header-height] justify-between border-b border-border bg-background/80 px-5 backdrop-blur-sm">
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
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Avatar className="size-9 cursor-pointer">
                <AvatarImage alt={user.username || ""} />
                <AvatarFallback>
                  {user.email
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="flex w-56 flex-col gap-1"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Link
                  href={dashboardPath()}
                  className="flex w-full items-center"
                >
                  <LucideHouse className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link
                  href={accountProfilePath()}
                  className="flex w-full items-center"
                >
                  <LucideUser className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link
                  href={accountPasswordPath()}
                  className="flex w-full items-center"
                >
                  <LucideLock className="mr-2 h-4 w-4" />
                  <span>Password</span>
                </Link>
              </DropdownMenuItem>
              <SignOutButton onClick={triggerSessionUpdate} />
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href={signUpPath()}
            className={buttonVariants({ variant: "outline" })}
          >
            Sign Up
          </Link>
        )}
      </div>
    </header>
  );
};

export { Header };
