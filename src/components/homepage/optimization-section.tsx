"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const OptimizationSection = () => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowWidth === null) return null;

  let imageSrc = "/images/optimization-section/optimization_350.png";
  let imageWidth = 318;
  let imageHeight = 298;

  if (windowWidth >= 1280) {
    imageSrc = "/images/optimization-section/optimization.png";
    imageWidth = 550;
    imageHeight = 328;
  } else if (windowWidth >= 768) {
    imageSrc = "/images/optimization-section/optimization_768.png";
    imageWidth = 352;
    imageHeight = 286;
  }
  return (
    <section className="flex h-auto w-full items-center overflow-hidden bg-white sm:h-[716px] md:h-[446px] lg:h-[488px]">
      <div className="container flex sm:flex-col-reverse sm:px-4 md:flex-row md:gap-8 md:px-4 lg:gap-[117px] lg:px-0 lg:pl-20">
        <div className="h-auto w-full sm:w-[318px] md:w-[352px] lg:w-[550px]">
          <Image
            src={imageSrc}
            alt="Optimization"
            width={imageWidth}
            height={imageHeight}
            className="h-auto w-full"
          />
        </div>

        <div className="flex w-full flex-col md:w-[339px] lg:w-[378px]">
          <h2 className="sm: pb-4 pt-5 text-center text-h2 text-blue-900 sm:text-start sm:text-h2-sm lg:pt-[50px] lg:text-left">
            Оптимізація резюме
          </h2>
          <p className="text-center text-black-500 sm:pb-[36px] sm:text-start md:pb-0 lg:text-left">
            Дізнайтеся, яких навичок вам бракує. Система на базі штучного
            інтелекту покаже вам, як адаптувати своє резюме так, щоб підкреслити
            навички та досвід, які шукають рекрутери.
          </p>
        </div>
      </div>
    </section>
  );
};
