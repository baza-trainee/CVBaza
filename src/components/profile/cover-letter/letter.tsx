import { FC } from "react";

interface LetterType {
  title: string;
}

export const Letter: FC<LetterType> = ({ title }) => {
  return <div className="mt-9">{title}</div>;
};
