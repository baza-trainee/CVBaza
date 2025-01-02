import Image from "next/image";
import { Contacts } from "../homepage/footer/contacts";
import { CreateWithAi } from "../homepage/footer/create-with-ai";
import { HelpLinks } from "../homepage/footer/help-links";
import { Socials } from "../homepage/footer/socials";

export const Footer = () => {
  return (
    <footer className="bg-blue-900">
      <div className="footer-container">
        <div className="flex flex-col items-center justify-between gap-[50px] md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-6 text-white ms:max-md:w-full ms:max-md:items-start ms:max-md:gap-11 md:items-start">
            <div className="relative h-[80px] w-[80px] lg:h-[116px] lg:w-[116px]">
              <Image src="/icons/logo_big.svg" fill alt="logo_big" />
            </div>
            <Socials classNames="flex ms:hidden md:flex flex-col gap-6 text-white lg:hidden" />
            <div className="hidden w-full gap-[60px] ms:max-md:flex ms:max-md:flex-col">
              <div className="flex flex-wrap gap-[60]">
                <HelpLinks classNames="flex min-w-[180px] flex-col gap-6 text-white" />
                <CreateWithAi classNames="flex min-w-[180px] flex-col gap-6 text-white" />
                <Contacts classNames="flex min-w-[180px] flex-col gap-6 text-white" />
                <Socials classNames="flex min-w-[180px] flex-col gap-6 text-white lg:flex" />
              </div>
            </div>
          </div>
          <CreateWithAi classNames="sm:flex ms:hidden flex-col items-center sm:gap-6 text-white md:items-start lg:flex" />
          <HelpLinks classNames="flex flex-col gap-6 text-white ms:hidden" />
          <Contacts classNames="flex ms:max-md:hidden flex-col gap-6 text-white" />
          <HelpLinks classNames="hidden flex-col gap-6 text-white md:flex" />
          <CreateWithAi classNames="hidden md:flex flex-col items-center gap-6 text-white md:items-start lg:hidden" />
          <Socials classNames="hidden flex-col gap-6 text-white lg:flex" />
        </div>

        <div className="flex items-center border-t border-t-white py-8">
          <p className="w-full text-pretty px-14 text-center font-sans text-body text-white ms:px-0 ms:text-start">
            Baza Trainee Ukraine 2024 © Усі права захищені
          </p>
        </div>
      </div>
    </footer>
  );
};
