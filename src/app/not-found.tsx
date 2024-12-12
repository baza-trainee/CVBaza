import { getTranslations } from "next-intl/server";

export default async function NotFoundPage() {
  const messages = await getTranslations("404Page");
  return (
    <main>
      <h1>{messages("text")}</h1>
      <p>{messages("desc")}</p>
    </main>
  );
}
