import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const CoverLetter: FC = () => {
  return (
    <section className="flex items-center bg-white px-4 md:px-4 pt-20 lg:pt-[60px] pb-20 xl:pb-[90px] 2xl:py-[120px]">
      <div className="container mx-auto flex flex-wrap md:flex-nowrap items-center gap-9 lg:gap-[60px] xl:gap-[180px] lg:pl-dynamic">
        <div className="flex items-center md:items-start lg:max-w-[455px] flex-col 2xl:max-w-[584px]">
          <h2 className="mb-4 text-h2-sm md:text-h2-md lg:text-h2 2xl:text-h2-2xl text-blue-900 2xl:mb-6">
            Створіть свій супровідний лист
          </h2>
          <p className="mb-10 md:text-body text-black-500">
            83% фахівців з кадрів кажуть, що супровідні листи є важливими для їх
            вирішення про наймання співробітника. Генератор супровідних листів
            на основі штучного інтелекту створить для вас персоналізований
            супровідний лист лише одним клацанням миші.
          </p>
          <div>
            <Link
              className="inline-block px-[45px] md:px-[26px] lg:px-[46px] 2xl:px-[41px] rounded-[100px] bg-blue-500 py-[12px] text-center text-body-semibold text-white"
              href="#"
            >
              Cтворити супровідний лист
            </Link>
          </div>

        </div>
        <Image
          src="/images/cover_steps/cover_letter.png"
          alt="Cover letter"
          width={400}
          height={400}
          className="w-[350px] md:w-[352px] md:h-[320px] lg:w-[400px] lg:h-[400px] flex-shrink-0 object-contain"
        />
      </div>
    </section>
  );
};
