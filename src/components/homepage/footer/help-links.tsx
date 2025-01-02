import React from "react";

export const HelpLinks = ({ classNames }: { classNames: string }) => {
  const siteList = [
    { label: "Baza Skill", href: "https://baza-skill.com.ua" },
    {
      label: "Job Tracker",
      href: "https://job-tracker-frontend-three.vercel.app/log-in",
    },
  ];
  return (
    <div className={classNames}>
      <h5 className="font-sans text-h5">ДОПОМОГА</h5>
      <div className="flex flex-col items-center gap-4 md:items-start">
        {siteList.map((s) => (
          <a key={s.href} href={s.href}>
            <p className="text-body">{s.label}</p>
          </a>
        ))}
      </div>
    </div>
  );
};
