import { FC } from "react";
import { CreateLetter } from "./create-letter";
import { Letter } from "./letter";

const lettersList = [
  { title: "Letter 1" },
  { title: "Letter 2" },
  { title: "Letter 3" },
];

export const LettersList: FC = () => {
  return (
    <div className="mt-[36px] flex flex-wrap justify-between gap-[68px]">
      <CreateLetter />
      {lettersList.map((item) => (
        <Letter title={item.title} key={item.title} />
      ))}
    </div>
  );
};
