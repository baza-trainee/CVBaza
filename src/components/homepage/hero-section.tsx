import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <div className="container flex h-screen w-full overflow-hidden bg-[rgb(247,249,252)] sm:h-[1122px] sm:flex-col sm:gap-0 md:mx-0 md:h-screen md:flex-row md:gap-[27px] md:px-4 lg:mx-auto lg:h-[calc(100vh-84px)] lg:flex-row lg:gap-[102px] lg:px-20">
      <div className="flex w-full flex-col gap-[60px] px-5 md:w-[352px] md:gap-[40px] md:px-0 lg:w-[450px]">
        <div className="w-full md:flex md:flex-col lg:w-[450px]">
          <h1 className="text-start text-3xl text-black-900 sm:pt-[60px] sm:text-h1-sm md:text-h2 lg:pt-20 lg:text-left lg:text-[64px]">
            Професійний конструктор резюме
          </h1>
          <p className="mx-auto w-full pt-4 text-center text-sm text-black-500 sm:text-base md:pt-4 md:text-start md:text-lg lg:mx-0 lg:w-[354px] lg:text-left">
            Створіть вражаюче резюме за лічені хвилини. Використовуйте
            можливості штучного інтелекту та аналізу даних.
          </p>

          <Link
            href="/create-resume"
            className="mx-auto mt-10 flex h-10 w-full items-center justify-center rounded-[100px] bg-blue-500 text-sm text-white sm:h-12 sm:w-[314px] sm:text-base md:ml-0 md:w-[224px] lg:mx-0 lg:w-[200px]"
          >
            Cтворити резюме
          </Link>
        </div>
        <div className="mx-auto flex w-full flex-col text-center text-violet-800 sm:gap-4 sm:pl-2 sm:text-start md:gap-2 md:pt-10 md:text-start lg:mx-0 lg:w-[389px] lg:flex-row lg:gap-6 lg:pt-[60px] lg:text-left">
          <p className="w-full sm:text-sm md:text-base lg:w-[170px]">
            Оптимізація для алгоритмів фільтрації
          </p>
          <p className="w-full sm:text-sm md:text-base lg:w-[170px]">
            Найкращій шлях до нової роботи
          </p>
        </div>
      </div>

      <div className="flex h-auto w-full items-start justify-center md:mt-0 lg:mt-[34px] lg:h-[calc(100vh-84px)] lg:w-[568px]">
        <div className="relative max-h-[568px] w-full max-w-[568px] sm:mt-[52px] sm:h-[414px] sm:w-[414px] md:mt-[111px] md:h-[360px] md:w-[360px] lg:mt-[34px] lg:h-[568px] lg:w-[568px]">
          <Image
            src="/images/hero/ellipse.png"
            alt="Ellipse"
            width={568}
            height={568}
            className="absolute inset-0 h-full w-[250vw] object-cover sm:w-full"
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
            className="absolute sm:top-[348px] md:right-[20px] md:top-[340px] lg:right-14 lg:top-[55px]"
            alt="Typography"
            width={320}
            height={48}
          />
          <Image
            src="/images/hero/ATS.png"
            className="absolute sm:right-[234px] sm:top-[255px] md:right-64 md:top-[250px] lg:right-28 lg:top-[220px]"
            alt="ATS"
            width={77}
            height={28}
          />
          <Image
            src="/images/hero/AI.png"
            className="invisible absolute bottom-[15%] right-[2%] lg:visible lg:bottom-[154px] lg:right-[8px]"
            alt="AI"
            width={181}
            height={88}
          />
          <Image
            src="/images/hero/logo_AI.png"
            className="absolute sm:bottom-[68px] sm:left-[236px] md:bottom-[75px] md:left-[260px] lg:bottom-[70px] lg:left-40"
            alt="Logo_AI"
            width={80}
            height={80}
          />
          <Image
            src="/images/hero/colors.png"
            className="absolute sm:bottom-[352px] sm:left-16 md:bottom-[355.2px] md:left-[90px] lg:bottom-[171.2px] lg:left-6"
            alt="Colors"
            width={250}
            height={33}
          />
        </div>
      </div>
    </div>
  );
};
