import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { passwordForgotPath, signUpPath } from "@/paths";

export default function SignInPage() {
  return (
    <main className="flex flex-col items-center justify-center py-20">
      <Card className="w-full max-w-[420px] animate-fade-from-top">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={signUpPath()} className="text-sm text-primary">
            No account yet?
          </Link>
          <Link href={passwordForgotPath()} className="text-sm text-primary">
            Forgot password?
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
