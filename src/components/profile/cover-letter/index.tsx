import { FC } from "react";
import { useTranslations } from "next-intl";

export const CoverLetter: FC = () => {
  const t = useTranslations("CoverLetter");

  return (
    <div className="px-4">
      <h1 className="font-semibold leading-[0.8] sm:text-[240px]">
        {t("title")}
      </h1>
    </div>
  );
};
