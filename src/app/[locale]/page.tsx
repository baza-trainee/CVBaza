import { CoverLetter } from '@/components/cover-letter';
import { Steps } from "@/components/steps/steps";
import { UserProfile } from "@/components/user-profile";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div className="grid min-h-screen items-center gap-16 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 gap-8 sm:items-start">
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
        <Steps />
        <CoverLetter />
      </main>
    </div>
  );
}
