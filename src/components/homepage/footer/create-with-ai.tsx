import Link from "next/link";
import { useTranslations } from "next-intl";

export const CreateWithAi = ({ classNames }: { classNames: string }) => {
  const t = useTranslations("Footer.createWithAi");

  const linkList = [
    { label: t("links.resume"), href: "/" },
    {
      label: t("links.coverLetter"),
      href: "/",
    },
  ];
  return (
    <div className={classNames}>
      <h5 className="font-sans text-h5 3xl:text-h2-sm">{t("title")}</h5>
      <div className="flex flex-col items-center gap-4 ms:items-start">
        {linkList.map((l) => (
          <Link key={l.label} href={l.href}>
            <p className="text-body 3xl:text-body-sm">{l.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
