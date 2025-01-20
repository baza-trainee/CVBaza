import { FC } from "react";
import { useTranslations } from "next-intl";
import { LettersList } from "@/components/profile/cover-letter/letters-list";

export const CoverLetter: FC = () => {
  const t = useTranslations("CoverLetter");

  return (
    <div className="px-4">
      <h1 className="text-2xl font-semibold leading-[0.8]">{t("title")}</h1>
      <LettersList />
    </div>
  );
};
