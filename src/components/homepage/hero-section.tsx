import Link from 'next/link'
import Image from "next/image";

export const HeroSection = () => {
  return (
    <div className="container lg:mx-auto md:mx-0 flex h-screen w-full md:gap-[27px] overflow-hidden px-5 md:px-4 lg:h-[calc(100vh-84px)] md:flex-row sm:flex-col lg:flex-row lg:gap-[102px] lg:px-20 bg-[rgb(247,249,252)] sm:gap-0 sm:h-[1122px] md:h-screen">
      <div className="flex w-full flex-col gap-[60px] md:gap-[40px] lg:w-[450px] md:w-[352px]">
        <div className="w-full lg:w-[450px] md:flex md:flex-col">
          <h1 className=" text-start text-3xl text-black-900 sm:text-h1-sm md:text-h2 lg:pt-20 lg:text-[64px] lg:text-left sm:pt-[60px]">
            Професійний конструктор резюме
          </h1>
          <p className="mx-auto w-full pt-4 md:pt-4 text-center text-sm text-black-500 sm:text-base md:text-lg lg:mx-0 lg:w-[354px] lg:text-left md:text-start">
            Створіть вражаюче резюме за лічені хвилини. Використовуйте
            можливості штучного інтелекту та аналізу даних.
          </p>

          <Link
            href="/create-resume"
            className="mx-auto flex h-10 w-full items-center justify-center rounded-[100px] bg-blue-500 text-sm text-white sm:h-12 sm:text-base lg:mx-0 mt-10 lg:w-[200px] md:w-[224px] md:ml-0 sm:w-[314px]"
          >
            Cтворити резюме
          </Link>
        </div>
        <div className="mx-auto flex w-full flex-col lg:gap-6 text-center sm:text-start text-violet-800 sm:gap-4 md:gap-2 lg:mx-0 lg:w-[389px] lg:flex-row lg:text-left md:text-start lg:pt-[60px] md:pt-10 sm:pl-2">
          <p className="w-full sm:text-sm md:text-base lg:w-[170px]">
            Оптимізація для алгоритмів фільтрації
          </p>
          <p className="w-full sm:text-sm md:text-base lg:w-[170px]">
            Найкращій шлях до нової роботи
          </p>
        </div>
      </div>

      <div className=" md:mt-0 flex h-auto w-full items-start justify-center lg:mt-[34px] lg:h-[calc(100vh-84px)] lg:w-[568px]">
        <div className="relative w-full max-h-[568px] max-w-[568px] md:h-[360px] md:w-[360px] lg:h-[568px] lg:w-[568px] md:mt-[111px] lg:mt-[34px] sm:mt-[52px] sm:h-[414px] sm:w-[414px]">
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
            className="absolute inset-0 m-auto md:top-[-14px]"
            alt="CV"
            width={271}
            height={383}
          />
          <Image
            src="/images/hero/typography.png"
            className="absolute md:top-[340px] md:right-[20px] lg:right-14 lg:top-[55px] sm:top-[348px]"
            alt="Typography"
            width={320}
            height={48}
          />
          <Image
            src="/images/hero/ATS.png"
            className="absolute lg:right-28 lg:top-[220px] md:top-[250px] md:right-64 sm:top-[255px] sm:right-[234px]"
            alt="ATS"
            width={77}
            height={28}
          />
          <Image
            src="/images/hero/AI.png"
            className="absolute bottom-[15%] right-[2%]  lg:bottom-[154px] lg:right-[8px] lg:visible invisible"
            alt="AI"
            width={181}
            height={88}
          />
          <Image
            src="/images/hero/logo_AI.png"
            className="absolute lg:bottom-[70px] lg:left-40 md:left-[260px] md:bottom-[75px] sm:left-[236px] sm:bottom-[68px]"
            alt="Logo_AI"
            width={80}
            height={80}
          />
          <Image
            src="/images/hero/colors.png"
            className="absolute lg:bottom-[171.2px] lg:left-6 md:left-[90px] md:bottom-[355.2px] sm:bottom-[352px] sm:left-16"
            alt="Colors"
            width={250}
            height={33}
          />
        </div>
      </div>
    </div>
  );
};

