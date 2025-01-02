import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const headerLinks = [
    { name: "Резюме", href: "/" },
    { name: "Супровідний лист", href: "/" },
  ];
  return (
    <header className="bg-white px-[16px] py-2 lg:py-3 lg:px-10 xl:px-20 2xl:px-[120px]">
      <div className="flex justify-between">
        <ul className="flex gap-9">
          <li>
            <Link href="/">
              <div className="relative h-12 w-12 lg:h-[60px] lg:w-[60px]">
                <Image src="/icons/logo.svg" fill alt="logo" />
              </div>
            </Link>
          </li>
          {headerLinks.map((l) => (
            <Link className="hidden lg:inline-block" key={l.name} href={l.href}>
              <li className="flex h-full items-center justify-center">
                <p className="font-sans text-body text-black-500">{l.name}</p>
              </li>
            </Link>
          ))}
        </ul>
        <Button className="hidden px-[20px] lg:flex 2xl:px-9">
          <div className="relative h-6 w-6">
            <Image src="/icons/person.svg" fill alt="user" />
          </div>
          <p className="font-sans text-btn text-blue-500">Miй Акаунт</p>
        </Button>
        <div className="relative block h-12 w-12 lg:hidden">
          <Image src="/icons/hamburger.svg" fill alt="hamburger" />
        </div>
      </div>
    </header>
  );
};
