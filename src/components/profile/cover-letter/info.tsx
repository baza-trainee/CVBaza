import { FC } from "react";

export const Info: FC = () => {
  return (
    <div className="flex flex-col pl-[8px]">
      <h3>Супровідний</h3>
      <div className="mt-[4px]">
        <p>Останнє оновлення</p>
        <p>Дата</p>
      </div>
    </div>
  );
};
