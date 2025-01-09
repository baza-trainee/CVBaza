"use client";
import { useSession } from "next-auth/react";

import { usePathname } from "next/navigation";

import { AccountButton } from "./account-button";
import { ProfileInfo } from "./profile-info";

export const AuthSwitchWidget = () => {
  const pathname = usePathname();
  const { status } = useSession();
  return (
    <>
      {pathname.split("/")[2] === "profile" && status === "authenticated" ? (
        <ProfileInfo />
      ) : (
        <AccountButton />
      )}
    </>
  );
};
