"use client";

import Image from "next/image";

export const HeroSection = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("click");
  };
  return (
    <div className="container mx-auto flex h-screen w-full flex-col gap-10 overflow-hidden px-5 lg:h-[calc(100vh-84px)] lg:flex-row lg:gap-[102px] lg:px-20">
      <div className="flex w-full flex-col gap-8 lg:w-[450px]">
        <div className="w-full lg:w-[450px]">
          <h1 className="mt-10 text-center text-4xl text-h1 text-black-900 sm:text-5xl md:text-6xl lg:mt-20 lg:text-left">
            Професійний конструктор резюме
          </h1>
          <p className="mx-auto w-full pt-4 text-center text-base text-black-500 lg:mx-0 lg:w-[354px] lg:text-left">
            Створіть вражаюче резюме за лічені хвилини. Використовуйте
            можливості штучного інтелекту та аналізу даних.
          </p>
          <button
            className="mx-auto mt-6 h-12 w-full rounded-[100px] bg-blue-500 text-base text-white lg:mx-0 lg:mt-10 lg:w-[200px]"
            onClick={handleClick}
          >
            Cтворити резюме
          </button>
        </div>
        <div className="mx-auto flex w-full flex-col gap-6 text-center text-violet-800 lg:mx-0 lg:w-[389px] lg:flex-row lg:text-left">
          <p className="w-full lg:w-[170px]">
            Оптимізація для алгоритмів фільтрації
          </p>
          <p className="w-full lg:w-[170px]">Найкращій шлях до нової роботи</p>
        </div>
      </div>

      <div className="mt-10 flex h-auto w-full items-center justify-center lg:mt-[34px] lg:h-[calc(100vh-84px)] lg:w-[568px]">
        <div className="relative h-full max-h-[568px] w-full max-w-[568px]">
          <Image
            src="/images/hero/ellipse.png"
            alt="Ellipse"
            width={568}
            height={568}
            className="h-full w-full"
          />
          <Image
            src="/images/hero/ellipse_inlying.png"
            className="absolute inset-0 m-auto"
            alt="Ellipse_inlying"
            width={460}
            height={460}
          />
          <Image
            src="/images/hero/CV.png"
            className="absolute inset-0 m-auto"
            alt="CV"
            width={271}
            height={383}
          />
          <Image
            src="/images/hero/typography.png"
            className="absolute right-5 top-[10%] lg:right-14 lg:top-[55px]"
            alt="Typography"
            width={320}
            height={48}
          />
          <Image
            src="/images/hero/ATS.png"
            className="absolute right-10 top-[30%] lg:right-28 lg:top-[225px]"
            alt="ATS"
            width={77}
            height={28}
          />
          <Image
            src="/images/hero/AI.png"
            className="absolute bottom-[20%] right-[5%] lg:bottom-[154px] lg:right-[8px]"
            alt="AI"
            width={181}
            height={88}
          />
          <Image
            src="/images/hero/logo_AI.png"
            className="absolute bottom-[10%] left-1/3 lg:bottom-[70px] lg:left-40"
            alt="Logo_AI"
            width={80}
            height={80}
          />
          <Image
            src="/images/hero/colors.png"
            className="absolute bottom-[25%] left-5 lg:bottom-[170px]"
            alt="Colors"
            width={250}
            height={33}
          />
        </div>
      </div>
    </div>
  );
};
