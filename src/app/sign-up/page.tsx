import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { signInPath } from "@/paths";

export default function SignUpPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Card className="w-full max-w-[420px] animate-fade-from-top">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create an account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            Already have an account?{" "}
            <Link href={signInPath()} className="text-primary">
              Sign In now.
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
