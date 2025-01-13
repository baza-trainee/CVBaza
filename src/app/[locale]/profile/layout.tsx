"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Sidebar } from "@/components/sidebar/sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  useEffect(() => {
    if (status === "unauthenticated") {
      // Use current path as callback URL
      router.replace(
        `/${locale}/signin?callbackUrl=${encodeURIComponent(pathname)}`
      );
    }
  }, [status, router, pathname, locale]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex h-[100vh] pl-3.5 pt-10 lg:pl-10 xl:pl-[7.5rem]">
      <Sidebar lng={locale} />
      <main>{children}</main>
    </div>
  );
}
