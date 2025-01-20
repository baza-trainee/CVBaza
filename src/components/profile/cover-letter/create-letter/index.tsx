import { FC } from "react";
import { Icon } from "./icon";

// interface LetterType {
//   title: string;
// }

export const CreateLetter: FC = () => {
  return (
    <div className="border-black mt-9 flex h-80 w-[232px] items-center justify-center border-2 border-dashed">
      <div className="flex w-[141px] items-center justify-between">
        <Icon />
        <p>Створити лист</p>
      </div>
    </div>
  );
};
