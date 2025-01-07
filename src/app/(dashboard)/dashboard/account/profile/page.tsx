import { Heading } from "@/components/heading";
import { AccountTabs } from "@/features/account/components/account-tabs";

const ProfilePage = () => {
  return (
    <section className="flex flex-col px-8 pt-24">
      <Heading title="Profile" description="Make changes to your profile here.">
        <AccountTabs />
      </Heading>
    </section>
  );
};

export default ProfilePage;
