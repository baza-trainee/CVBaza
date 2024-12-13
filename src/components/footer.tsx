import Image from "next/image";
import Link from "next/link";
import React from "react";
import Facebook from "../../public/Facebook.svg";
import Linkedin from "../../public/Linkedin.svg";
import Telegram from "../../public/Telegram.svg";
import Logo_big from "../../public/logo_big.svg";

const Footer = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const socialIconsList = [
    { icon: Facebook, href: "https://www.facebook.com", alt: "fb_icon" },
    { icon: Telegram, href: "https://web.telegram.org", alt: "tg_icon" },
    { icon: Linkedin, href: "https://www.linkedin.com", alt: "ld_icon" },
  ];
  const siteList = [
    { label: "Baza Skill", href: "https://baza-skill.com.ua" },
    {
      label: "Job Tracker",
      href: "https://job-tracker-frontend-three.vercel.app/log-in",
    },
  ];
  const linkList = [
    { label: "Резюме", href: "/" },
    {
      label: "Супровідний лист",
      href: "/",
    },
  ];

  return (
    <footer className="bg-blue-900">
      <div className="flex flex-col gap-14 px-20 pb-10 pt-20">
        <div className="flex justify-between">
          <Image src={Logo_big} width={116} height={116} alt="logo_big" />
          <div className="flex flex-col gap-6 text-white">
            <h5 className="font-sans text-h5">СТВОРИ ІЗ ШІ</h5>
            <div className="flex flex-col gap-4">
              {linkList.map((l) => (
                <Link key={l.label} href={l.href}>
                  <p className="text-body">{l.label}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 text-white">
            <h5 className="font-sans text-h5">КОНТАКТИ</h5>
            <div className="flex flex-col gap-4">
              <a href="tel:+380 63 628 66 30">
                <p className="text-body"> +380 63 628 66 30</p>
              </a>
              <a href="tel:+380 95 662 10 73">
                <p className="text-body">+380 95 662 10 73</p>
              </a>

              <a href="mailto:info@baza-trainee.tech">
                <p className="underline text-body">info@baza-trainee.tech</p>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6 text-white">
            <h5 className="font-sans text-h5">ДОПОМОГА</h5>
            <div className="flex flex-col gap-4">
              {siteList.map((s) => (
                <a key={s.href} href={s.href}>
                  <p className="text-body">{s.label}</p>
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 text-white">
            <h5 className="font-sans text-h5">ШУКАЙ НАС</h5>
            <div className="flex justify-between">
              {socialIconsList.map((i) => (
                <Link key={i.href} href={i.href}>
                  <Image src={i.icon} width={25} height={25} alt={`${i.alt}`} />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center border-t border-t-white py-8">
          <p className="font-sans text-body text-white">
            Baza Trainee Ukraine 2024 © Усі права захищені
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
