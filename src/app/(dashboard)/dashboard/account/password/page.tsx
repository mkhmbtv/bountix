import { Heading } from "@/components/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdatePasswordForm } from "@/features/account/components/update-password-form";
import { AccountTabs } from "../_components/account-tabs";

const PasswordPage = () => {
  return (
    <section className="flex flex-col gap-y-20 px-8 py-24">
      <Heading title="Password" description="Change your password here.">
        <AccountTabs />
      </Heading>
      <Card className="w-full max-w-[580px] self-center">
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdatePasswordForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default PasswordPage;
