import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentSession } from "@/features/auth/actions/get-current-session";
import { signUpPath } from "@/paths";
import { AppSidebar } from "./_components/app-sidebar";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect(signUpPath());
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="flex-1">
        <SidebarTrigger className="ml-2 mt-[calc(var(--header-height)+0.5rem)]" />
        {children}
      </main>
    </SidebarProvider>
  );
}
