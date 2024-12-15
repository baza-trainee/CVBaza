import { Container } from '@/components/container';
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { dataSteps } from './data';


export const Steps: FC = () => {
    return (
        <section className="mx-auto bg-background py-20">
            <Container>
                <div className='flex flex-col items-center'>
                    <h2 className="text-h2 text-blue-900 text-center mb-[74px]">Створіть своє резюме за 4 легкі кроки</h2>
                    <ul className="flex justify-center gap-[51px] mb-10">
                        {dataSteps.map(({ img, step, title, description, width }) =>
                            <li className="flex flex-col justify-center items-center" style={{ width: `${width}px` }} key={title} >
                                <Image className="w-full mb-6" height={100} src={img} width={width} alt="Step 1 image" />
                                <div className="bg-violet-600 rounded mb-3">
                                    <p className="text-body-semibold text-white py-[2px] px-[14px]">{step}</p>
                                </div>
                                <h3 className="text-h3 text-blue-900 mb-2 leading-normal">{title}</h3>
                                <p className="text-center text-body">{description}</p>
                            </li>)}
                    </ul>
                    <div className='inline-flex'>
                        <Link className="py-[12px] px-[61px] bg-blue-500 text-center text-btn text-white rounded-[100px]" href='#'>Створити резюме</Link>
                    </div>
                </div>
            </Container>
        </section >
    );
};
