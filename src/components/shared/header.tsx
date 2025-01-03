import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const headerLinks = [
    { name: "Резюме", href: "/" },
    { name: "Супровідний лист", href: "/" },
  ];
  return (
    <header className="bg-white px-3.5 py-2 lg:px-10 lg:py-3 xl:px-[7.5rem] 3xl:py-5">
      <div className="flex justify-between">
        <ul className="flex gap-9">
          <li className="flex items-center justify-center">
            <Link href="/">
              <div className="relative h-12 w-12 lg:size-[3.75rem]">
                <Image src="/icons/logo.svg" fill alt="logo" />
              </div>
            </Link>
          </li>
          {headerLinks.map((l) => (
            <Link className="hidden lg:inline-block" key={l.name} href={l.href}>
              <li className="flex h-full items-center justify-center">
                <p className="font-sans text-body text-black-500 3xl:text-body-sm">
                  {l.name}
                </p>
              </li>
            </Link>
          ))}
        </ul>
        <Button className="hidden lg:flex 2xl:px-9 3xl:px-[3.125rem] 3xl:py-4">
          <div className="relative h-6 w-6">
            <Image src="/icons/person.svg" fill alt="user" />
          </div>
          <p className="font-sans text-btn text-blue-500 3xl:text-btn-semibold">
            Miй Акаунт
          </p>
        </Button>
        <div className="relative block size-12 lg:hidden">
          <Image src="/icons/hamburger.svg" fill alt="hamburger" />
        </div>
      </div>
    </header>
  );
};
