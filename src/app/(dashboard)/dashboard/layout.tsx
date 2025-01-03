import { redirect } from "next/navigation";
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

  return <>{children}</>;
}
