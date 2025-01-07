import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Link from "next/link";

import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 page",
  description: "404 page",
};

export default async function NotFoundPage() {
  const messages = await getTranslations("404Page");
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center font-[family-name:var(--font-geist-sans)]">
        <div className="row-start-2 flex flex-col items-center gap-10">
          <h1 className="text-[128px] font-semibold leading-[0.8] text-blue-900 sm:text-[240px]">
            {messages("text")}
          </h1>
          <p className="text-center text-black-500 sm:w-[421px]">{messages("desc")}</p>
          <Button className="h-[48px] w-[318px] rounded-3xl bg-blue-500 text-white hover:bg-blue-700 sm:w-[289px] sm:text-base xl:w-[210px]">
            <Link href={messages("homePage") === "/en" ? "/en" : "/ua"}>
              {messages("buttonText")}
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
