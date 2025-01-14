"use client";
import { signOut } from "next-auth/react";

import { useState } from "react";

import Image from "next/image";

import { SettingIcon } from "@/components/IconsComponents/setting-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/routing";

export const ProfileInfo = ({ name }: { name: string }) => {
  const [open, setOpen] = useState(false);
  const createAvatar = (name: string) => {
    const names = name.split(" ");
    console.log(names);
    if (names.length > 1) {
      return `${names[0][0].toLocaleUpperCase()}${names[1][0].toLocaleUpperCase()}`;
    } else if (names.length === 0) return `${name[0][0].toLocaleUpperCase()}`;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    else "AA";
  };
  return (
    <>
      <DropdownMenu onOpenChange={(state) => setOpen(state)} modal={false}>
        <div className="flex gap-3 justify-center items-center">
          <div className="flex px-5 py-4 rounded-full bg-blue-50">
            <p className="text-body">{createAvatar(name)}</p>
          </div>
          <p className="text-btn">{name}</p>
          <DropdownMenuTrigger>
            <SettingIcon open={open} />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent sideOffset={20} align="end" alignOffset={-10}>
          <div className="flex w-full flex-col gap-5 px-6 py-[1.625rem] ">
            <Link href="/profile/dashboard">
              <div className="flex gap-2">
                <div className="relative w-6 h-6">
                  <Image src="/icons/account.svg" fill alt="account" />
                </div>

                <p className="text-body">Аккаунт</p>
              </div>
            </Link>

            <span className="w-full h-[1px] bg-black-100"></span>
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              <div className="flex gap-2">
                <div className="relative w-6 h-6">
                  <Image src="/icons/exit.svg" fill alt="exit" />
                </div>
                <p className="text-body">Вийти</p>
              </div>
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
