import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Icon } from "../auth/icon";
import { Avatar } from "./avatar";
import { DropdownMenu } from "./dropdown-menu";

export function Sidebar({ lng }: { lng: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggle = (value: boolean) => {
    setIsOpen(value);
  };

  return (
    <aside className="block w-1/4 font-semibold">
      <Avatar name={session?.user.name || "Baza Trainee"} />
      <nav className="mt-5">
        <ul>
          <li>
            <Link
              href="dashboard"
              className="flex gap-2.5 rounded-[8px] fill-none stroke-black-500 py-3 pl-7 transition-all hover:bg-blue-50 hover:fill-blue-500 hover:stroke-blue-50 hover:text-blue-500 focus:bg-blue-50 focus:text-blue-500"
            >
              <Icon name="icon-dashboard" size="w-6 h-6" />
              {lng === "en" ? "Dashboard" : "Панель керування"}
            </Link>
          </li>
          <li className="relative w-full">
            <div
              className="rounded-[8px] transition-all hover:bg-blue-50 hover:fill-blue-500 hover:stroke-blue-50 hover:text-blue-500 focus:bg-blue-50 focus:text-blue-500"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              onFocus={() => setIsOpen(true)}
              // onClick={() => setIsOpen(true)}
              onBlur={() => setIsOpen(false)}
            >
              <Link
                href=""
                className="flex gap-2.5 fill-none stroke-black-500 py-3 pl-7"
              >
                <Icon name="icon-list" size="w-6 h-6" />
                {lng === "en" ? "My Documents" : "Мої документи"}
              </Link>
              <DropdownMenu isOpen={isOpen} lng={lng} toggle={toggle} />
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
