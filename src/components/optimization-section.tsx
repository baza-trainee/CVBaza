import Image from 'next/image'
import React from 'react'

const OptimizationSection = () => {
  return (
    <section className="h-auto lg:h-[488px] w-full overflow-hidden bg-white">
      <div className="flex flex-col lg:flex-row container gap-10 lg:gap-[117px] justify-center mt-10 lg:mt-20 px-5 lg:px-0">
        <div className="w-full h-auto max-w-[550px]">
          <Image 
            src="/images/optimization-section/optimization.png" 
            alt="Optimization" 
            width={550} 
            height={328} 
            className="w-full h-auto" 
          />
        </div>

        <div className="flex flex-col w-full max-w-[378px]">
          <h2 className="text-h2 pt-5 lg:pt-[50px] pb-4 text-blue-900 text-center lg:text-left">
            Оптимізація резюме
          </h2>
          <p className="text-center lg:text-left text-black-500">
            Дізнайтеся, яких навичок вам бракує. Система на базі штучного інтелекту покаже вам, як адаптувати своє резюме так, щоб підкреслити навички та досвід, які шукають рекрутери.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OptimizationSection;
