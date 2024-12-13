import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "404 page",
  description: "404 page",
};

export default async function NotFoundPage() {
  const messages = await getTranslations("404Page");
  return (
    <>
      {/* <header></header> */}
      <main className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
        <div className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
          <h1>{messages("text")}</h1>
          <p>{messages("desc")}</p>
        </div>
      </main>
      {/* <footer></footer> */}
    </>
  );
}
