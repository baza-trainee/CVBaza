// import { getTranslations } from "next-intl/server";
// export default async function LocaleNotFoundPage() {
//   const t = await getTranslations("404Page");
//   console.log(t("text"));
//   return (
//     <main>
//       <h1>{t("text")}</h1>
//       <p>{t("desc")}</p>
//     </main>
//   );
// }
import { useTranslations } from "next-intl";

export default function LocaleNotFoundPage() {
  const t = useTranslations("404Page");
  return (
    <main>
      <h1>{t("text")}</h1>
      <p>{t("desc")}</p>
    </main>
  );
}
