import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.svg";
import User from "../../public/user.svg";

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
          <Image src={User} width={24} height={24} alt="user" />
          <p className="text-btn text-blue-500">Miй Аккаунт</p>
        </button>
        {/*    <button className="flex gap-[18px] items-center justify-center rounded-[100px] border-2 border-blue-500 px-5 py-3">
          <Image src={User} width={24} height={24} alt="user" />
          <p className="text-blue-500 text-btn">Вхід</p>
        </button>  */}
        {/*     <button className="flex gap-[18px] items-center justify-center rounded-[100px] border-2 border-red px-5 py-3">
          <Image src={User} width={24} height={24} alt="user" />
          <p className=" text-red">Вихід</p>
        </button> */}{" "}
        {/* Поки в дизайні немає,кнопка Вихід */}
      </div>
    </header>
  );
};

export default Header;
