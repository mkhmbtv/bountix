import { Heading } from "@/components/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateAccountForm } from "@/features/account/components/change-profile-form";
import { DeleteAccountForm } from "@/features/account/components/delete-account-form";
import { getCurrentSession } from "@/features/auth/actions/get-current-session";
import { AccountTabs } from "../_components/account-tabs";

const ProfilePage = async () => {
  const { user } = await getCurrentSession();

  return (
    <section className="flex flex-col px-8 py-24">
      <Heading
        title="Profile"
        className="mb-20"
        description="Make changes to your profile here."
      >
        <AccountTabs />
      </Heading>
      <Card className="mb-8 w-full max-w-[580px] self-center">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateAccountForm user={user!} />
        </CardContent>
      </Card>
      <Card className="w-full max-w-[580px] self-center">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-gray-500">
            Account deletion is non-reversable. Please proceed with caution.
          </p>
          <DeleteAccountForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default ProfilePage;
