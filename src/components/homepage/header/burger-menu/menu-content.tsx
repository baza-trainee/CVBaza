import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
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
    if (!name) return "AA";
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0].toLocaleUpperCase()}${names[1][0].toLocaleUpperCase()}`;
    }
    return names[0][0].toLocaleUpperCase();
  };
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
    closeMenu();
  };

  return (
    <>
      {pathname.split("/")[1] === "profile" && status === "authenticated" ? (
        <div className="mt-3 flex size-full flex-col gap-7 px-7 pb-16 pt-20">
          <div className="flex items-center justify-center gap-4 ms:justify-start">
            <div className="flex rounded-full bg-white px-5 py-4">
              <p className="text-3xl">{createAvatar(session!.user!.name!)}</p>
            </div>
            <p className="truncate text-wrap text-3xl font-semibold text-white">
              {session.user.name}
            </p>
          </div>
          <div className="flex grow flex-col justify-between">
            <Link href="/profile/dashboard">
              <p
                onClick={closeMenu}
                className="text-center text-3xl font-semibold text-white ms:text-start"
              >
                Аккаунт
              </p>
            </Link>
            <p
              onClick={handleSignOut}
              className="text-center text-3xl font-semibold text-white ms:text-start"
            >
              Вийти
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex flex-col gap-7 px-7 pb-2 pt-20">
          {headerLinks.map((l) => (
            <Link key={l.name} href={l.href}>
              <p
                onClick={closeMenu}
                className="text-center text-3xl font-semibold text-white ms:text-start"
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
