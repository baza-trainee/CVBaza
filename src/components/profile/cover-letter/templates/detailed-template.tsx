import { useEffect, useState } from "react";
import { LetterData } from "@/types/letter";

// const formatDate = (date: Date) => {
//   return new Intl.DateTimeFormat("uk-UA", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   }).format(date);
// };

export const DetailedTemplate = ({ data }: { data: LetterData }) => {
  const [currentDate, setCurrentDate] = useState("");

  const formattedText = data.text
    ? data.text.split("\n").map((line, index) => (
        <p key={index} className="text-lg">
          {line}
        </p>
      ))
    : null;

  useEffect(() => {
    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("uk-UA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    };

    setCurrentDate(formatDate(new Date()));
  }, []);

  return (
    <div className="aspect-[210/297] h-fit w-full bg-white text-black-400">
      <div className="flex h-[20%] flex-col">
        <div className="relative flex flex-1 flex-col px-12 pt-12 text-left">
          <h1 className="mb-1 whitespace-normal text-[26px] font-medium uppercase tracking-widest sm:text-[50px]">
            {data.name}
          </h1>
          {data.profession && (
            <p className="w-[70%] text-[16px] font-medium capitalize leading-[1.2] sm:text-[30px]">
              {data.profession}
            </p>
          )}
          <div className="absolute bottom-[25px] left-0 flex w-full flex-col items-end px-12">
            <p className="w-[200px] break-all rounded-3xl text-end text-[14px] italic leading-[1.2] sm:text-[20px]">
              {data.phone}
            </p>
            <p className="min-w-[150px] break-all rounded-3xl text-end text-[14px] italic leading-[1.2] sm:text-[20px]">
              {data.email}
            </p>
            <p className="min-w-[200px] max-w-[300px] break-all rounded-3xl text-end text-[14px] italic leading-[1.2] sm:text-[20px]">
              {data.location}
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-5 flex w-[88%] self-center border-t border-[#000] pt-5">
        <p className="w-[100%] pt-[20px] text-end">{currentDate}</p>
      </div>

      <div className="px-12 pt-5">
        <p className="text-xl">{data.nameRecipient}</p>
        <p className="text-xl">{data.positionRecipient},</p>
        <p className="text-xl">{data.company}</p>
      </div>

      <div className="flex h-[80] min-h-0 flex-col gap-y-5 px-12 pt-12">
        <div className="pb-5">JOB REFERENCE: {data.position}</div>
        <p className="text-lg">{data.nameRecipient},</p>
        {formattedText}
        <p className="text-lg">{data.name}</p>
      </div>
    </div>
  );
};
