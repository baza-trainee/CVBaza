"use client";

// import { useSession } from "next-auth/react";

// import { useEffect } from "react";

// import { usePathname, useRouter } from "next/navigation";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  // const { data: session, status } = useSession();
  // const router = useRouter();
  // const pathname = usePathname();

  // useEffect(() => {
  //   // Temporarily disabled authentication check
  //   // if (status === "unauthenticated") {
  //   //   const locale = pathname.split("/")[1];
  //   //   // Use current path as callback URL
  //   //   router.replace(`/${locale}/signin?callbackUrl=${encodeURIComponent(pathname)}`);
  //   // }
  // }, [status, router, pathname]);

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (!session) {
  //   return null;
  // }

  return <>{children}</>;
}
