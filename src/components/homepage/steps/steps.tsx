'use client'

import { Container } from "@/components/shared/container";
import { useMedia } from "@/hooks/use-media";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { dataSteps } from "./data";

export const Steps: FC = () => {
  const screenSize = useMedia();
  return (
    <section className="mx-auto bg-background py-20 2xl:py-[120px]">
      <Container>
        <div className="flex flex-col items-center">
          <h2 className="mb-[74px] text-center text-h2-sm xl:text-h2 2xl:text-h2-2xl text-blue-900 md:text-h2-md xl:max-w-full md:max-w-[479px] md:mb-[60px] max-w-[257px] 2xl:max-w-[778px]">
            Створіть своє резюме за 4 легкі кроки
          </h2>
          <ul className="mb-10 gap-[48px] xl:gap-[51px] grid xl:grid-cols-4 md:grid-cols-2 place-items-center">
            {dataSteps.map(({ img, step, title, description, width }) => (
              <li
                className="flex flex-col items-center justify-center md:grow-1 lg:basis-auto"
                style={{ width: `${width[screenSize]}px` }}
                key={title}
              >
                <Image
                  className="mb-6 w-full"
                  height={100}
                  src={img}
                  width={width[screenSize]}
                  alt="Step 1 image"
                />
                <div className="mb-3 rounded bg-violet-600">
                  <p className="px-[14px] py-[2px] text-body-semibold text-white md:px-[11px]">
                    {step}
                  </p>
                </div>
                <h3 className="mb-2 text-h3 leading-normal text-blue-900">
                  {title}
                </h3>
                <p className="text-center text-body">{description}</p>
              </li>
            ))}
          </ul>
          <div>
            <Link
              className="inline-block rounded-[100px] bg-blue-500 px-[85px] xl:px-[61px] py-[12px] 2xl:px-[46px] text-center text-btn text-white"
              href="#"
            >
              Створити резюме
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
