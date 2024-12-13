import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.svg";
import Person from "../../public/person.svg";

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
            <Image src={Logo} width={60} height={60} alt="logo" />
          </li>
          {headerLinks.map((l) => (
            <Link key={l.name} href={l.href}>
              <li className="flex h-full items-center justify-center">
                <p>{l.name}</p>
              </li>
            </Link>
          ))}
        </ul>
        <button className="flex items-center justify-center gap-[18px] rounded-[100px] border-2 border-blue-500 px-5 py-3">
          <Image src={Person} width={24} height={24} alt="user" />
          <p className=" text-blue-500">Miй Аккаунт</p>
        </button>
      </div>
    </header>
  );
};

export default Header;
