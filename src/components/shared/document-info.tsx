import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/shared/icon";
import { Link } from "@/i18n/routing";

interface DocumentInfoProps {
  title: string;
  lastUpdated: string;
  onDuplicate: () => void;
  onTitleChange: (newTitle: string) => void;
  onDeleteClick: () => void;
}

export const DocumentInfo = ({
  title,
  lastUpdated,
  onDuplicate,
  onTitleChange,
  onDeleteClick,
}: DocumentInfoProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("resume");

  // Update local title when prop changes
  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  const handleTitleUpdate = (newTitle: string) => {
    if (newTitle.trim() !== title) {
      onTitleChange(newTitle.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current?.blur();
    }
  };

  const handleBlur = () => {
    handleTitleUpdate(localTitle);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDuplicateClick = () => {
    onDuplicate();
    setIsPopupOpen(false);
  };

  const handleDeleteTrigger = () => {
    onDeleteClick();
    setIsPopupOpen(false);
  };

  return (
    <div className="flex justify-between">
      <div className="pl-2">
        <div className="flex w-[152px] flex-col gap-[4px]">
          <input
            ref={inputRef}
            type="text"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="rounded px-1 text-h5-semibold text-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-200"
          />
          <p className="text-small text-blue-700">
            {t("lastUpdated")}{" "}
            <span className="text-small text-blue-700">{lastUpdated}</span>
          </p>
        </div>
      </div>

      <div className="relative flex w-1/2 justify-end pr-[10px] pt-[10px]">
        <button
          type="button"
          ref={buttonRef}
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none"
          onClick={() => setIsPopupOpen(!isPopupOpen)}
        >
          <Icon name="ellipsis" size="w-[15px] h-[4px]" />
        </button>

        {isPopupOpen && (
          <div
            ref={popupRef}
            className="fixed bottom-4 left-1/2 z-50 w-[calc(100vw-2rem)] -translate-x-1/2 flex-col gap-3 rounded-lg bg-white p-4 shadow-lg sm:absolute sm:bottom-[120%] sm:left-auto sm:right-0 sm:w-[222px] sm:translate-x-0 sm:p-4 lg:bottom-auto lg:right-[100%] lg:top-0"
          >
            <Link
              href="#"
              className="flex w-full items-center gap-3 rounded-md p-2 transition-colors hover:bg-gray-50 focus:outline-none"
            >
              <Icon name="icon-pdf" size="w-5 h-5" />
              <p className="text-sm">{t("actions.downloadPdf")}</p>
            </Link>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-md p-2 transition-colors hover:bg-gray-50 focus:outline-none"
              onClick={handleDuplicateClick}
            >
              <Icon name="icon-pencil" size="w-5 h-5" />
              <p className="text-sm">{t("actions.duplicate")}</p>
            </button>
            <div className="mt-2 w-full border-t border-gray-200 pt-2">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-md p-2 text-red-500 transition-colors hover:bg-red-50 focus:outline-none"
                onClick={handleDeleteTrigger}
              >
                <Icon name="icon-delete" size="w-5 h-5" />
                <p className="text-sm">{t("actions.delete")}</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
