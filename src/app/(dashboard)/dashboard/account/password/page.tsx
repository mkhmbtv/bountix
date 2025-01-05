import { Heading } from "@/components/heading";
import { AccountTabs } from "@/features/account/components/account-tabs";

const PasswordPage = () => {
  return (
    <section className="flex flex-col px-8">
      <Heading title="Password" description="Change your password here.">
        <AccountTabs />
      </Heading>
    </section>
  );
};

export default PasswordPage;
