import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";
import { DropdownMenu } from "./dropdown-menu";

export function Sidebar({ lng }: { lng: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggle = (value: boolean) => {
    setIsOpen(value);
  };

  const isDashboardPage = pathname.split("/").includes("dashboard");
  const isDocumentsPage =
    pathname.split("/").includes("resume") ||
    pathname.split("/").includes("cover-letter");

  const linkClassName = (isPath: boolean) => {
    return cn(
      isPath && "bg-blue-50 fill-blue-500 stroke-blue-50 text-blue-500",
      "flex gap-2.5 rounded-[8px] fill-none stroke-black-500 py-3 transition-all hover:bg-blue-50 hover:fill-blue-500 hover:stroke-blue-50 hover:text-blue-500 focus:bg-blue-50 focus:text-blue-500"
    );
  };

  return (
    <aside className="hidden border-r-2 px-4 font-semibold lg:block xl:max-w-[30vw]">
      <Avatar name={session?.user.name || "Baza Trainee"} />
      <nav className="mt-5">
        <ul>
          <li>
            <Link
              href="/profile/dashboard"
              className={linkClassName(isDashboardPage)}
            >
              <Icon name="icon-dashboard" size="w-6 h-6" />
              <span className="hidden whitespace-nowrap md:inline-block">
                {lng === "en" ? "Dashboard" : "Панель керування"}
              </span>
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
              <Link href="" className={linkClassName(isDocumentsPage)}>
                <Icon name="icon-list" size="w-6 h-6" />
                <span className="hidden md:inline-block">
                  {lng === "en" ? "My Documents" : "Мої документи"}
                </span>
              </Link>
              <DropdownMenu isOpen={isOpen} lng={lng} toggle={toggle} />
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
