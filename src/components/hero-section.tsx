'use client';

import React from 'react'
import Image from 'next/image';


const HeroSection = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault(); 
    console.log('click')
  }
  return (
    <div className="flex flex-col lg:flex-row h-screen lg:h-[calc(100vh-84px)] w-full container mx-auto px-5 lg:px-20 gap-10 lg:gap-[102px] overflow-hidden">

      <div className="flex flex-col gap-8 w-full lg:w-[450px]">
        <div className="w-full lg:w-[450px]">
          <h1 className="text-h1 mt-10 lg:mt-20 text-black-900 text-center lg:text-left text-4xl sm:text-5xl md:text-6xl">
            Професійний конструктор резюме
          </h1>
          <p className="pt-4 text-base w-full lg:w-[354px] text-black-500 text-center lg:text-left mx-auto lg:mx-0">
            Створіть вражаюче резюме за лічені хвилини. Використовуйте можливості штучного інтелекту та аналізу даних.
          </p>
          <button
            className="mt-6 lg:mt-10 w-full lg:w-[200px] h-12 bg-blue-500 rounded-[100px] text-white text-base mx-auto lg:mx-0"
            onClick={handleClick}
          >
            Cтворити резюме
          </button>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:w-[389px] gap-6 text-violet-800 mx-auto lg:mx-0 text-center lg:text-left">
          <p className="w-full lg:w-[170px]">Оптимізація для алгоритмів фільтрації</p>
          <p className="w-full lg:w-[170px]">Найкращій шлях до нової роботи</p>
        </div>
      </div>

      <div className="flex justify-center items-center w-full lg:w-[568px] h-auto lg:h-[calc(100vh-84px)] mt-10 lg:mt-[34px]">
        <div className="relative w-full h-full max-w-[568px] max-h-[568px]">
          <Image src="/images/hero/ellipse.png" alt="Ellipse" width={568} height={568} className="w-full h-full" />
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
            className="absolute top-[10%] lg:top-[55px] right-5 lg:right-14"
            alt="Typography"
            width={320}
            height={48}
          />
          <Image
            src="/images/hero/ATS.png"
            className="absolute top-[30%] lg:top-[225px] right-10 lg:right-28"
            alt="ATS"
            width={77}
            height={28}
          />
          <Image
            src="/images/hero/AI.png"
            className="absolute bottom-[20%] lg:bottom-[154px] right-[5%] lg:right-[8px]"
            alt="AI"
            width={181}
            height={88}
          />
          <Image
            src="/images/hero/logo_AI.png"
            className="absolute bottom-[10%] lg:bottom-[70px] left-1/3 lg:left-40"
            alt="Logo_AI"
            width={80}
            height={80}
          />
          <Image
            src="/images/hero/colors.png"
            className="absolute bottom-[25%] lg:bottom-[170px] left-5"
            alt="Colors"
            width={250}
            height={33}
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection