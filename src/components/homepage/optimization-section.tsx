"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

export const OptimizationSection = () => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (windowWidth === null) return null;

  let imageSrc = "/images/optimization-section/optimization_350.png"; 
  let imageWidth = 318; 
  let imageHeight = 298;

  if (windowWidth >= 1280) {
    imageSrc = "/images/optimization-section/optimization.png";
    imageWidth = 550;
    imageHeight = 328;
  }
 
  else if (windowWidth >= 768) {
    imageSrc = "/images/optimization-section/optimization_768.png";
    imageWidth = 352;
    imageHeight = 286;
  }
  return (
    <section className="flex items-center h-auto w-full overflow-hidden bg-white lg:h-[488px] md:h-[446px] sm:h-[716px]">
      <div className="container flex  lg:pl-20 md:px-4 md:flex-row lg:gap-[117px] lg:px-0 md:gap-8 sm:flex-col-reverse sm:px-4 ">
        
        <div className="h-auto w-full lg:w-[550px] md:w-[352px] sm:w-[318px]">
          <Image src={imageSrc} alt="Optimization" width={imageWidth} height={imageHeight} className="h-auto w-full" />
        </div>

        <div className="flex w-full lg:w-[378px] flex-col md:w-[339px]">
          <h2 className="pb-4 pt-5 text-center text-h2 text-blue-900 lg:pt-[50px] lg:text-left sm:text-start sm:text-h2-sm sm:">
            Оптимізація резюме
          </h2>
          <p className="text-center text-black-500 lg:text-left  sm:text-start sm:pb-[36px] md:pb-0">
            Дізнайтеся, яких навичок вам бракує. Система на базі штучного
            інтелекту покаже вам, як адаптувати своє резюме так, щоб підкреслити
            навички та досвід, які шукають рекрутери.
          </p>
        </div>
      </div>
    </section>
  );
};
