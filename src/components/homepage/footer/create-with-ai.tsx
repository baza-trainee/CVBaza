import Link from "next/link";

export const CreateWithAi = ({ classNames }: { classNames: string }) => {
  const linkList = [
    { label: "Резюме", href: "/" },
    {
      label: "Супровідний лист",
      href: "/",
    },
  ];
  return (
    <div className={classNames}>
      <h5 className="font-sans text-h5 3xl:text-h2-sm">СТВОРИ ІЗ ШІ</h5>
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
