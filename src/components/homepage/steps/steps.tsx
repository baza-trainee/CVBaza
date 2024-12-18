import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Container } from "@/components/shared/container";
import { dataSteps } from "./data";

export const Steps: FC = () => {
  return (
    <section className="mx-auto bg-background py-20">
      <Container>
        <div className="flex flex-col items-center">
          <h2 className="mb-[74px] text-center text-h2 text-blue-900">
            Створіть своє резюме за 4 легкі кроки
          </h2>
          <ul className="mb-10 flex justify-center gap-[51px]">
            {dataSteps.map(({ img, step, title, description, width }) => (
              <li
                className="flex flex-col items-center justify-center"
                style={{ width: `${width}px` }}
                key={title}
              >
                <Image
                  className="mb-6 w-full"
                  height={100}
                  src={img}
                  width={width}
                  alt="Step 1 image"
                />
                <div className="mb-3 rounded bg-violet-600">
                  <p className="px-[14px] py-[2px] text-body-semibold text-white">
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
          <div className="inline-flex">
            <Link
              className="rounded-[100px] bg-blue-500 px-[61px] py-[12px] text-center text-btn text-white"
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
