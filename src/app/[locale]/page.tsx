import Link from "next/link";
import { useTranslations } from "next-intl";
import { UserProfile } from "@/components/user-profile";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <div className="mb-20 flex flex-col items-start gap-5">
          <div className="flex gap-5">
            <Link href="/en">EN</Link>
            <Link href="/ua">UA</Link>
          </div>

          <h1 className="list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-lg text-red-600 sm:text-left">
            {t("title")}
          </h1>

          <UserProfile />
        </div>
      </main>
    </div>
  );
}
