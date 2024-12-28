import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <div className="flex w-full overflow-hidden bg-[rgb(247,249,252)] sm:pt-[60px] sm:pb-[76px] sm:flex-col sm:gap-0  md:flex-row md:gap-[25px] md:px-4 lg:h-[calc(100vh-84px)] lg:flex-row lg:gap-10 lg:px-10 md:py-20 xl:px-20 xl:py-[34px] md:justify-between 2xl:py-0 2xl:px-[120px] 2xl:flex-wrap 2xl:content-center">
      <div className="flex w-full flex-col lg:gap-[60px] md:w-[352px] sm:px-4 md:px-0 md:gap-10 sm:gap-[60px] lg:w-[450px] 2xl:flex-wrap 2xl:content-center">
        <div className="w-full md:flex md:flex-col lg:w-[450px]">
          <h1 className="text-start text-3xl text-black-900 sm:text-h1-sm  md:text-h2 lg:text-left lg:text-h1 xl:pt-20 2xl:text-h1-large">
            Професійний конструктор резюме
          </h1>
          <p className="mx-auto w-full pt-4 text-center sm:text-body text-black-500 sm:text-base md:pt-4 md:text-start lg:mx-0 lg:w-[354px] lg:text-left 2xl:pt-6">
            Створіть вражаюче резюме за лічені хвилини. Використовуйте
            можливості штучного інтелекту та аналізу даних.
          </p>

          <Link
            href="/create-resume"
            className="mx-auto mt-10 flex h-10 w-full items-center justify-center rounded-[100px] bg-blue-500 sm:text-btn text-white sm:h-12 sm:w-[318px] md:ml-0 md:w-[224px] lg:mx-0 lg:w-[220px] xl:w-[200px] 2xl:w-[309px]"
          >
            Cтворити резюме
          </Link>
        </div>
        <div className="mx-auto flex w-full flex-col text-center text-violet-800 sm:gap-4 sm:text-start md:gap-2 md:text-start lg:mx-0 lg:flex-row lg:gap-6 lg:text-left sm:text-body ">
          <p className="w-full  border-l border-l-black-100 sm:pl-2 md:pl-4">
            Оптимізація для алгоритмів фільтрації
          </p>
          <p className="w-full  border-l border-l-black-100 sm:pl-2 md:pl-4">
            Найкращій шлях до нової роботи
          </p>
        </div>
      </div>

      <div className="flex h-auto w-full items-start lg:mt-[34px] xl:mt-0 lg:h-[calc(100vh-84px)] lg:w-[568px] md:justify-end 2xl:flex-wrap 2xl:content-center">
        <div className="relative max-h-[568px] w-full max-w-[568px] sm:mt-[52px] sm:h-[414px] sm:w-[414px] md:mt-8 md:h-[360px] md:w-[360px] lg:mt-[34px] 2xl:mt-0 lg:h-[460px] lg:w-[460px] xl:w-[568px] xl:h-[568px]">
          <Image
            src="/images/hero/ellipse.png"
            alt="Ellipse"
            width={568}
            height={568}
            className="absolute inset-0 h-full w-[250vw] object-cover sm:w-full"
          />
          <Image
            src="/images/hero/ellipse_inlying.png"
            className="absolute inset-0 m-auto sm:w-[334px] sm:h-[334px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] xl:w-[480px] xl:h-[480px]"
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
            className="absolute sm:top-[367px] sm:right-[16px] md:right-[20px] md:top-[340px] lg:right-[-3px] lg:top-[-12px] xl:top-[43px] xl:right-[60px]"
            alt="Typography"
            width={320}
            height={48}
          />
          <Image
            src="/images/hero/ATS.png"
            className="absolute sm:right-[253px] sm:top-[281px] md:right-64 md:top-[250px] lg:right-[37px] lg:top-[166px] xl:right-[107px] xl:top-[216px]"
            alt="ATS"
            width={77}
            height={28}
          />
          <Image
            src="/images/hero/AI.png"
            className="invisible absolute lg:visible lg:bottom-[104px] lg:right-[20px] xl:bottom-[160px] xl:right-[10px]"
            alt="AI"
            width={181}
            height={88}
          />
          <Image
            src="/images/hero/logo_AI.png"
            className="absolute sm:bottom-[95px] sm:left-[256px] md:bottom-[75px] md:left-[260px] lg:bottom-[32px] lg:left-20 xl:left-40 xl:bottom-[75px]"
            alt="Logo_AI"
            width={80}
            height={80}
          />
          <Image
            src="/images/hero/colors.png"
            className="absolute sm:bottom-[376px] sm:left-[83.2px] md:bottom-[355.2px] md:left-[90px] lg:bottom-[204px] lg:left-[14px] xl:bottom-[175px] xl:left-[22px]"
            alt="Colors"
            width={250}
            height={33}
          />
        </div>
      </div>
    </div>
  );
};
