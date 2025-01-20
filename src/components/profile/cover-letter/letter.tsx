import { FC } from "react";
// import { Info } from "./info";
import { DocumentInfo } from "./document-info";

interface LetterType {
  title: string;
  key: string;
}

export const Letter: FC<LetterType> = ({ title }) => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="border-black flex h-80 w-[232px] items-center justify-center border-b-4 border-l-4 border-solid shadow-lg">
        <h2>{title}</h2>
      </div>
      {/* <Info /> */}
      <DocumentInfo />
    </div>
  );
};
