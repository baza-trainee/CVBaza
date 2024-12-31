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
      <div className="flex flex-col gap-14 px-4 pb-[66px] pt-20 lg:px-10 lg:pt-20 xl:px-20 xl:pt-20 2xl:px-[120px] 2xl:pb-[86px] 2xl:pt-[120px]">
        <div className="flex flex-col items-center justify-between gap-[47px] md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-6 text-white md:items-start">
            <div className="relative h-[78px] w-[78px] lg:h-[116px] lg:w-[116px]">
              <Image src="/icons/logo_big.svg" fill alt="logo_big" />
            </div>
            <div className="flex flex-col gap-6 text-white lg:hidden">
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
          </div>

          <div className="hidden flex-col items-center gap-6 text-white md:items-start lg:flex">
            <h5 className="font-sans text-h5">СТВОРИ ІЗ ШІ</h5>
            <div className="flex flex-col items-center gap-4 md:items-start">
              {linkList.map((l) => (
                <Link key={l.label} href={l.href}>
                  <p className="text-body">{l.label}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 text-white md:hidden">
            <h5 className="font-sans text-h5">ДОПОМОГА</h5>
            <div className="flex flex-col items-center gap-4">
              {siteList.map((s) => (
                <a key={s.href} href={s.href}>
                  <p className="text-body">{s.label}</p>
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 text-white">
            <h5 className="text-center font-sans text-h5 md:text-start">
              КОНТАКТИ
            </h5>
            <div className="flex flex-col items-center gap-4 md:items-start">
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
          <div className="hidden flex-col gap-6 text-white md:flex">
            <h5 className="font-sans text-h5">ДОПОМОГА</h5>
            <div className="flex flex-col gap-4">
              {siteList.map((s) => (
                <a key={s.href} href={s.href}>
                  <p className="text-body">{s.label}</p>
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 text-white md:items-start lg:hidden">
            <h5 className="font-sans text-h5">СТВОРИ ІЗ ШІ</h5>
            <div className="flex flex-col items-center gap-4 md:items-start">
              {linkList.map((l) => (
                <Link key={l.label} href={l.href}>
                  <p className="text-body">{l.label}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden flex-col gap-6 text-white lg:flex">
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
        </div>
        <div className="flex items-center border-t border-t-white py-8">
          <p className="w-full text-pretty px-14 text-center font-sans text-body text-white md:px-0 md:text-start">
            Baza Trainee Ukraine 2024 © Усі права захищені
          </p>
        </div>
      </div>
    </footer>
  );
};
