import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.svg";
import Person from "../../public/person.svg";
import { Button } from "./ui/button";

const Header = () => {
  const headerLinks = [
    { name: "Резюме", href: "/" },
    { name: "Супровідний лист", href: "/" },
  ];
  return (
    <header className="bg-white px-20 py-3">
      <div className="flex justify-between">
        <ul className="flex gap-9">
          <li>
            <Link href="/">
              <Image src={Logo} width={60} height={60} alt="logo" />
            </Link>
          </li>
          {headerLinks.map((l) => (
            <Link key={l.name} href={l.href}>
              <li className="flex h-full items-center justify-center">
                <p className="font-sans text-body text-black-500">{l.name}</p>
              </li>
            </Link>
          ))}
        </ul>
        <Button>
          <Image src={Person} width={24} height={24} alt="user" />
          <p className="font-sans text-btn text-blue-500">Miй Аккаунт</p>
        </Button>
      </div>
    </header>
  );
};

export default Header;
