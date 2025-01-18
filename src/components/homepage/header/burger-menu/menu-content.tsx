import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import React from "react";

import { Link, usePathname } from "@/i18n/routing";

export const MenuContent = ({ closeMenu }: { closeMenu: () => void }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const headerLinks = [
    { name: "Резюме", href: "/profile/resume" },
    { name: "Супровідний лист", href: "/profile/cover-letter" },
    { name: "Мій профіль", href: "/profile/dashboard" },
  ];
  const createAvatar = (name: string) => {
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0].toLocaleUpperCase()}${names[1][0].toLocaleUpperCase()}`;
    } else if (names.length === 0) return `${name[0][0].toLocaleUpperCase()}`;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    else "AA";
  };
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
    closeMenu();
  };

  return (
    <>
      {pathname.split("/")[1] === "profile" && status === "authenticated" ? (
        <div className="flex size-full mt-3 flex-col gap-7 px-7 pt-20 pb-16">
          <div className="flex items-center justify-center ms:justify-start gap-4 ">
            <div className="flex px-5 py-4 rounded-full bg-white">
              <p className="text-3xl">{createAvatar(session!.user!.name!)}</p>
            </div>
            <p className="text-3xl font-semibold truncate text-wrap text-white">
              {session.user.name}
            </p>
          </div>
          <div className="flex grow flex-col justify-between">
            <Link href="/profile/dashboard">
              <p
                onClick={closeMenu}
                className="text-3xl text-center ms:text-start font-semibold text-white"
              >
                Аккаунт
              </p>
            </Link>
            <p
              onClick={handleSignOut}
              className="text-3xl text-center ms:text-start font-semibold text-white"
            >
              Вийти
            </p>
          </div>
        </div>
      ) : (
        <div className="flex mt-3 flex-col gap-7 px-7 pt-20 pb-2">
          {headerLinks.map((l) => (
            <Link key={l.name} href={l.href}>
              <p
                onClick={closeMenu}
                className="text-3xl text-center ms:text-start font-semibold text-white"
              >
                {l.name}
              </p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
