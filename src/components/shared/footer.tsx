import Image from "next/image";
import { Contacts } from "../homepage/footer/contacts";
import { CreateWithAi } from "../homepage/footer/create-with-ai";
import { HelpLinks } from "../homepage/footer/help-links";
import { Socials } from "../homepage/footer/socials";

export const Footer = () => {
  return (
    <footer className="bg-blue-900">
      <div className="footer-container">
        <div className="flex flex-col items-center justify-between gap-[47px] md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-6 text-white md:items-start">
            <div className="relative h-[78px] w-[78px] lg:h-[116px] lg:w-[116px]">
              <Image src="/icons/logo_big.svg" fill alt="logo_big" />
            </div>
            <Socials classNames="flex flex-col gap-6 text-white lg:hidden" />
          </div>
          <CreateWithAi classNames="sm:flex md:hidden flex-col items-center gap-6 text-white md:items-start lg:flex" />
          <HelpLinks classNames="flex flex-col gap-6 text-white md:hidden" />
          <Contacts />
          <HelpLinks classNames="hidden flex-col gap-6 text-white md:flex" />
          <CreateWithAi classNames=" hidden md:flex flex-col items-center gap-6 text-white md:items-start lg:hidden" />
          <Socials classNames="hidden flex-col gap-6 text-white lg:flex" />
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
