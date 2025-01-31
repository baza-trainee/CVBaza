import { LetterData } from "@/types/letter";

export const ShortTemplate = ({ data }: { data: LetterData }) => {
  const formattedText = data.text
    ? data.text.split("\n").map((line, index) => <p key={index}>{line}</p>)
    : null;

  return (
    <div className="aspect-[210/297] h-fit w-full bg-white text-black-400">
      <div className="flex h-[25%] flex-col gap-8 bg-[#e6f1f3]">
        <div className="flex flex-1 flex-col items-center justify-center p-6 text-left">
          <h1 className="mb-1 whitespace-normal text-center font-semibold uppercase tracking-widest sm:text-[28px] md:text-[50px]">
            {data.name}
          </h1>
          {data.profession && (
            <p className="mb-1 whitespace-normal text-center font-semibold uppercase tracking-[8px] text-[#8b8f92] sm:text-[18px] md:text-[26px]">
              {data.profession}
            </p>
          )}
        </div>
      </div>

      <div className="relative">
        <div className="absolute bottom-[-20px] left-0 flex w-full justify-around px-8">
          <p className="flex w-[200px] items-center justify-center break-all rounded-3xl bg-[#8dcedc] px-3 py-2 text-[14px] font-semibold text-white sm:text-[18px]">
            {data.phone}
          </p>
          <p className="flex min-w-[200px] max-w-[300px] items-center justify-center break-all rounded-3xl bg-[#8dcedc] px-3 py-2 text-center text-[14px] font-semibold text-white sm:text-[18px]">
            {data.location}
          </p>
          <p className="flex min-w-[150px] items-center justify-center break-all rounded-3xl bg-[#8dcedc] px-3 py-2 text-center text-[14px] font-semibold text-white sm:text-[18px]">
            {data.email}
          </p>
        </div>
      </div>

      <div className="flex h-[75%] min-h-0 flex-col gap-y-8 px-12 pt-24 text-lg">
        <p className="text-xl">{data.nameRecipient},</p>
        {formattedText}
        <p className="text-xl">{data.name}</p>
      </div>
    </div>
  );
};
