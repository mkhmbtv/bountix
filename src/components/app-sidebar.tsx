import { LucideBook, LucideLibrary } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { dashboardPath, ticketsPath } from "@/paths";
import Link from "next/link";

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
];

export function AppSidebar() {
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
                  <SidebarMenuButton asChild tooltip={item.title}>
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
