"use client";

import { LucideBook, LucideCircleUser, LucideLibrary } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { accountProfilePath, dashboardPath, ticketsPath } from "@/paths";

// Menu items.
const items = [
  {
    title: "All Tickets",
    url: dashboardPath(),
    icon: LucideLibrary,
  },
  {
    title: "My Tickets",
    url: ticketsPath(),
    icon: LucideBook,
  },
  {
    title: "Account",
    url: accountProfilePath(),
    icon: LucideCircleUser,
  },
];

const isMenuItemActive = (pathname: string, itemUrl: string) => {
  if (itemUrl === accountProfilePath()) {
    return pathname.startsWith("/dashboard/account");
  } else {
    return pathname === itemUrl;
  }
};

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="top-[--header-height] pb-[--header-height]"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isMenuItemActive(pathname, item.url)}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
