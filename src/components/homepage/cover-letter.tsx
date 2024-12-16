import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const CoverLetter: FC = () => {
  return (
    <section className="flex items-center bg-white pt-[60px]">
      <div className="container mx-auto flex items-center gap-[180px] pl-dynamic">
        <div className="flex max-w-[455px] flex-col">
          <h2 className="mb-4 text-h2 text-blue-900">
            Створіть свій супровідний лист
          </h2>
          <p className="mb-10 text-body text-black-500">
            83% фахівців з кадрів кажуть, що супровідні листи є важливими для їх
            вирішення про наймання співробітника. Генератор супровідних листів
            на основі штучного інтелекту створить для вас персоналізований
            супровідний лист лише одним клацанням миші.
          </p>
          <Link
            className="w-[320px] rounded-[100px] bg-blue-500 py-[12px] text-center text-body-semibold text-white"
            href="#"
          >
            Cтворити супровідний лист
          </Link>
        </div>
        <Image
          src="/images/cover_steps/cover_letter.png"
          alt="Cover letter"
          width={400}
          height={400}
          className="flex-shrink-0"
        />
      </div>
    </section>
  );
};
