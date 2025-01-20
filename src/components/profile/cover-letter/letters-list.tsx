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
    <div className="mt-9 flex">
      <CreateLetter />
      {lettersList.map((item) => (
        <div key={item.title}>
          <Letter title={item.title} />
        </div>
      ))}
    </div>
  );
};
