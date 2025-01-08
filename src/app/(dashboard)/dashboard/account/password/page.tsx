import { Heading } from "@/components/heading";
import { AccountTabs } from "../_components/account-tabs";

const PasswordPage = () => {
  return (
    <section className="flex flex-col px-8 pt-24">
      <Heading title="Password" description="Change your password here.">
        <AccountTabs />
      </Heading>
    </section>
  );
};

export default PasswordPage;
