import { useState } from "react";
import { Icon } from "@/components/shared/icon";
import { Link } from "@/i18n/routing";

interface DocumentInfoProps {
  title: string;
  lastUpdated: string;
  onDuplicate: () => void;
  onDelete: () => void;
  onTitleChange: (newTitle: string) => void;
}

export const DocumentInfo = ({
  title,
  lastUpdated,
  onDuplicate,
  onDelete,
  onTitleChange,
}: DocumentInfoProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-between">
      <div className="pl-2">
        <div className="flex w-[132px] flex-col gap-[4px]">
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-h5-semibold text-blue-700"
          />
          <p className="text-small text-blue-700">
            Останнє оновлення{" "}
            <span className="text-small text-blue-700">{lastUpdated}</span>
          </p>
        </div>
      </div>

      <div className="relative flex w-1/2 justify-end pr-[10px] pt-[10px]">
        <div
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
          onClick={togglePopup}
        >
          <Icon name="ellipsis" size="w-[15px] h-[4px]" />
        </div>

        {isPopupOpen && (
          <div
            className="absolute bottom-[4px] left-[90px] z-10 flex h-auto w-[222px] flex-col gap-4 rounded-bl-[4px] rounded-br-[4px] rounded-tl-[0px] rounded-tr-[4px] bg-white p-6"
            style={{
              boxShadow: "rgba(40, 17, 47, 0.2) -2px 2px 4px 0px",
            }}
            onClick={togglePopup}
          >
            <Link href="#" className="flex w-full gap-[4px]">
              <Icon name="icon-pdf" size="w-6 h-6" />
              <p className="text-body">Завантажити PDF</p>
            </Link>
            <Link
              href="#"
              className="flex w-full gap-[4px]"
              onClick={(e) => {
                e.preventDefault();
                onDuplicate();
              }}
            >
              <Icon name="icon-pencil" size="w-6 h-6" />
              <p className="text-body">Дублювати</p>
            </Link>
            <div
              className="mt-auto w-full pt-4"
              style={{ borderTop: "1px solid #D0CFCF" }}
            >
              <Link
                href="#"
                className="flex w-full gap-[4px]"
                onClick={(e) => {
                  e.preventDefault();
                  onDelete();
                }}
              >
                <Icon name="icon-delete" size="w-6 h-6" />
                <p className="text-body">Видалити</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
