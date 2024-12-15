import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const CoverLetter: FC = () => {
    return (
        <section className="pt-[60px] bg-white flex items-center">
            <div className='container pl-dynamic mx-auto flex items-center gap-[180px]'>
                <div className="flex flex-col max-w-[455px]">
                    <h2 className="text-h2 text-blue-900 mb-4">Створіть свій супровідний лист</h2>
                    <p className="text-body text-black-500 mb-10">83% фахівців з кадрів кажуть, що супровідні листи
                        є важливими для їх вирішення про наймання співробітника. Генератор супровідних листів на основі штучного інтелекту створить для вас персоналізований супровідний лист лише одним клацанням миші.</p>
                    <Link className="py-[12px] bg-blue-500 text-center text-body-semibold text-white rounded-[100px] w-[320px]" href='#'>Cтворити супровідний лист</Link>
                </div>
                <Image
                    src="/images/cover_steps/cover_letter.png"
                    alt='Cover letter'
                    width={400}
                    height={400}
                    className="flex-shrink-0"
                />
            </div>
        </section>

    );
};

