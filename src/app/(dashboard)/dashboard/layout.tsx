import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentSession } from "@/features/auth/actions/get-current-session";
import { signUpPath } from "@/paths";

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
        <SidebarTrigger className="sticky top-[calc(var(--header-height)+0.5rem)] ml-2 mt-2" />
        {children}
      </main>
    </SidebarProvider>
  );
}
