import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Socials = ({ classNames }: { classNames: string }) => {
  const socialIconsList = [
    {
      icon: "/icons/socials/facebook.svg",
      href: "https://www.facebook.com",
      alt: "fb_icon",
    },
    {
      icon: "/icons/socials/telegram.svg",
      href: "https://web.telegram.org",
      alt: "tg_icon",
    },
    {
      icon: "/icons/socials/linkedin.svg",
      href: "https://www.linkedin.com",
      alt: "ld_icon",
    },
  ];
  return (
    <div className={classNames}>
      <h5 className="font-sans text-h5">ШУКАЙ НАС</h5>
      <div className="flex justify-between">
        {socialIconsList.map((i) => (
          <Link key={i.href} href={i.href}>
            <div className="relative h-8 w-8">
              <Image src={i.icon} fill alt={`${i.alt}`} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
