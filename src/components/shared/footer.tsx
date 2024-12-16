import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
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
          <Image
            src="/icons/logo_big.svg"
            width={116}
            height={116}
            alt="logo_big"
          />
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
                <p className="text-body underline">info@baza-trainee.tech</p>
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
