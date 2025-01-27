import Image from "next/image";
import Link from "next/link";
import { homePath } from "@/paths";

export const HeaderLogo = () => {
  return (
    <Link href={homePath()}>
      <div className="flex items-center">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <p className="ml-2.5 text-2xl font-semibold text-foreground">Bountix</p>
      </div>
    </Link>
  );
};
