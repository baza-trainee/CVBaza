"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCachedLetters } from "@/components/profile/cover-letter/hooks/use-letters";
import { PreviewSection } from "@/components/profile/resume/preview";
import { DocumentInfo } from "@/components/shared/document-info";
import { Icon } from "@/components/shared/icon";
import { Loader } from "@/components/shared/loader";
import { useAlert } from "@/contexts/alert-context";
import { Link } from "@/i18n/routing";
import { ILetter } from "@/types/letter";
import { formatDate } from "@/utils/date-utils";

type LetterWithDuplicate =
  | ILetter
  | { id: string; title: string; data: ILetter; isDuplicate: boolean };

export const CoverLetterPage = () => {
  const locale = useLocale();
  const t = useTranslations("letter");
  const { showAlert } = useAlert();
  const {
    // letters,
    duplicatedLetters,
    isLoading,
    isDeleting,
    handleDuplicate,
    handleDeleteDuplicate,
    handleDeleteLetter,
    handleTitleChange,
    refreshLetters,
  } = useCachedLetters(t);

  const letters = [
    {
      id: "1",
      title: "My Cover Letter",
      name: "Джон Доу",
      profession: "Інженер програмного забезпечення",
      position: "Старший інженер програмного забезпечення",
      company: "Google",
      location: "Київ, Україна",
      phone: "+380 XX XXX XXXX",
      email: "john@example.com",
      nameRecipient: "Бос Бос",
      positionRecipient: "Інженер",
      text: "summary summary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summary summary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary",
      template: "short",
    },
  ] as LetterWithDuplicate[];

  useEffect(() => {
    refreshLetters();
  }, [refreshLetters]);

  const handleDelete = (id: string, isDuplicate = false) => {
    if (isDuplicate) {
      handleDeleteDuplicate(id);
    } else {
      handleDeleteLetter(id);
    }
  };

  const handleDuplicateLetter = (letter: ILetter) => {
    const processedResume: ILetter = {
      ...letter,
    };

    handleDuplicate(processedResume);
    toast.success(t("messages.duplicateCreated"), {
      duration: 3000,
    });
  };

  const handleDeleteClick = (id: string, isDuplicate = false) => {
    showAlert({
      title: t("delete.title"),
      description: t("delete.description"),
      cancelText: t("actions.cancel"),
      confirmText: t("delete.confirm"),
      loadingText: t("delete.deleting"),
      isLoading: isDeleting,
      variant: "destructive",
      onConfirm: () => handleDelete(id, isDuplicate),
    });
  };

  const [activeInfoId, setActiveInfoId] = useState<string | null>(null);

  const toggleInfo = (id: string) => {
    setActiveInfoId(activeInfoId === id ? null : id);
  };

  const getLetterData = (letter: LetterWithDuplicate) => {
    if ("data" in letter) {
      return {
        ...letter.data,
      };
    }
    return {
      ...letter,
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="text-gray-400" />
      </div>
    );
  }

  const allLetters = [
    ...letters,
    ...duplicatedLetters.map((dr) => ({
      id: dr.id,
      title: dr.title,
      data: dr.data,
      isDuplicate: true,
    })),
  ];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Link
            href="/profile/cover-letter/editor"
            className="flex h-[520px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-4 transition-colors hover:border-gray-400 lg:h-[320px]"
          >
            <div className="flex items-center gap-2">
              <Icon name="resume-page" size="w-4 h-5" />
              <span>{t("actions.create")}</span>
            </div>
          </Link>

          {allLetters.map((letter: LetterWithDuplicate, i) => (
            <div
              key={letter.id || i}
              className="group relative flex h-[520px] flex-col rounded-lg border border-gray-200 transition-shadow hover:shadow-md lg:h-[320px]"
            >
              <div className="relative flex-1 overflow-y-auto rounded-lg lg:overflow-hidden">
                <PreviewSection
                  // @ts-expect-error type error
                  data={getLetterData(letter)}
                  componentType="letter"
                  template={
                    ("data" in letter
                      ? letter.data.template
                      : letter.template) || "short"
                  }
                />
                <button
                  type="button"
                  onClick={() => toggleInfo(letter.id)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition-colors hover:bg-white hover:text-gray-900"
                >
                  <Icon name="info" size="w-5 h-5" />
                </button>
                {activeInfoId === letter.id && (
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="w-[222px] flex-col gap-4 rounded-lg bg-white p-6 shadow-lg">
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
                        onClick={() => {
                          handleDuplicateLetter(
                            "data" in letter ? letter.data : letter
                          );
                          toggleInfo(letter.id);
                        }}
                      >
                        <Icon name="icon-pencil" size="w-6 h-6" />
                        <p className="text-body">{t("actions.duplicate")}</p>
                      </button>
                      <div className="mt-auto w-full border-t border-gray-200 pt-4">
                        <button
                          type="button"
                          className="flex w-full gap-[4px] text-red-500 transition-colors hover:text-red-600"
                          onClick={() => {
                            handleDeleteClick(
                              letter.id,
                              "isDuplicate" in letter && letter.isDuplicate
                            );
                            toggleInfo(letter.id);
                          }}
                        >
                          <Icon name="icon-delete" size="w-6 h-6" />
                          <p className="text-body">{t("actions.delete")}</p>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-shrink-0 p-3">
                <DocumentInfo
                  title={letter.title || ""}
                  lastUpdated={formatDate(
                    "data" in letter ? letter.data.updatedAt : letter.updatedAt,
                    locale
                  )}
                  onDuplicate={() =>
                    handleDuplicateLetter(
                      "data" in letter ? letter.data : letter
                    )
                  }
                  onDeleteClick={() =>
                    handleDeleteClick(
                      letter.id,
                      "isDuplicate" in letter && letter.isDuplicate
                    )
                  }
                  onTitleChange={(newTitle) =>
                    handleTitleChange(letter.id, newTitle)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
