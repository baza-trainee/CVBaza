import { FC } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Icon } from "./icon";

// interface LetterType {
//   title: string;
// }

export const CreateLetter: FC = () => {
  const t = useTranslations("letter");

  return (
    <div className="border-black flex h-80 w-[232px] items-center justify-center border-2 border-dashed">
      <div className="flex w-[141px] items-center justify-between">
        <Icon />
        <Link href="#">{t("actions.create")}</Link>
      </div>
    </div>
  );
};
