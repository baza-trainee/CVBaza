import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export const AccountButton = () => {
  return (
    <Link href="/profile/dashboard">
      <Button className="hidden lg:flex 2xl:px-9 3xl:px-[3.125rem] 3xl:py-4">
        <div className="relative h-6 w-6">
          <Image src="/icons/person.svg" fill alt="user" />
        </div>
        <p className="font-sans text-btn text-blue-500 3xl:text-btn-semibold">Miй Акаунт</p>
      </Button>
    </Link>
  );
};
