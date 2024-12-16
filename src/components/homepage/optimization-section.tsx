import Image from "next/image";
import React from "react";

export const OptimizationSection = () => {
  return (
    <section className="h-auto w-full overflow-hidden bg-white lg:h-[488px]">
      <div className="container mt-10 flex flex-col justify-center gap-10 px-5 lg:mt-20 lg:flex-row lg:gap-[117px] lg:px-0">
        <div className="h-auto w-full max-w-[550px]">
          <Image
            src="/images/optimization-section/optimization.png"
            alt="Optimization"
            width={550}
            height={328}
            className="h-auto w-full"
          />
        </div>

        <div className="flex w-full max-w-[378px] flex-col">
          <h2 className="pb-4 pt-5 text-center text-h2 text-blue-900 lg:pt-[50px] lg:text-left">
            Оптимізація резюме
          </h2>
          <p className="text-center text-black-500 lg:text-left">
            Дізнайтеся, яких навичок вам бракує. Система на базі штучного
            інтелекту покаже вам, як адаптувати своє резюме так, щоб підкреслити
            навички та досвід, які шукають рекрутери.
          </p>
        </div>
      </div>
    </section>
  );
};
