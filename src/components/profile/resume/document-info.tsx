import { useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@/components/shared/alert";
import { Icon } from "@/components/shared/icon";
import { Link } from "@/i18n/routing";

interface DocumentInfoProps {
  title: string;
  lastUpdated: string;
  onDuplicate: () => void;
  onDelete: () => void;
  onTitleChange: (newTitle: string) => void;
  isDeleting?: boolean;
}

export const DocumentInfo = ({
  title,
  lastUpdated,
  onDuplicate,
  onDelete,
  onTitleChange,
  isDeleting = false,
}: DocumentInfoProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const t = useTranslations("resume");

  const handleDuplicate = () => {
    onDuplicate();
    setIsPopupOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setIsPopupOpen(false);
  };

  return (
    <div className="flex justify-between">
      <div className="pl-2">
        <div className="flex w-[152px] flex-col gap-[4px]">
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-h5-semibold text-blue-700"
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
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
          onClick={() => setIsPopupOpen(!isPopupOpen)}
        >
          <Icon name="ellipsis" size="w-[15px] h-[4px]" />
        </button>

        {isPopupOpen && (
          <div className="absolute bottom-[4px] left-[90px] z-10 flex h-auto w-[222px] flex-col gap-4 rounded-bl-[4px] rounded-br-[4px] rounded-tl-[0px] rounded-tr-[4px] bg-white p-6 shadow-lg">
            <Link
              href="#"
              className="flex w-full gap-[4px] transition-colors hover:text-blue-700"
            >
              <Icon name="icon-pdf" size="w-6 h-6" />
              <p className="text-body">{t("actions.downloadPdf")}</p>
            </Link>
            <button
              type="button"
              className="flex w-full gap-[4px] transition-colors hover:text-blue-700"
              onClick={handleDuplicate}
            >
              <Icon name="icon-pencil" size="w-6 h-6" />
              <p className="text-body">{t("actions.duplicate")}</p>
            </button>
            <div className="mt-auto w-full border-t border-gray-200 pt-4">
              <Alert
                trigger={
                  <button
                    type="button"
                    className="flex w-full gap-[4px] text-red-500 transition-colors hover:text-red-600"
                  >
                    <Icon name="icon-delete" size="w-6 h-6" />
                    <p className="text-body">{t("actions.delete")}</p>
                  </button>
                }
                title={t("delete.title")}
                description={t("delete.description")}
                cancelText={t("actions.cancel")}
                confirmText={t("delete.confirm")}
                loadingText={t("delete.deleting")}
                isLoading={isDeleting}
                variant="destructive"
                onConfirm={handleDelete}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
