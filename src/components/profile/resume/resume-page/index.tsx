"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { ResumePreviewSection } from "@/components/profile/resume/resume-preview";
import { Icon } from "@/components/shared/icon";
import { useAlert } from "@/contexts/alert-context";
import { useCachedResumes } from "@/hooks/use-cached-resumes";
import { Link } from "@/i18n/routing";
import { IResume } from "@/types/resume";
import { formatDate } from "@/utils/date-utils";
import { DocumentInfo } from "../../../shared/document-info";

type ResumeWithDuplicate =
  | IResume
  | { id: string; title: string; data: IResume; isDuplicate: boolean };

export const ResumePage = () => {
  const locale = useLocale();
  const t = useTranslations("resume");
  const { showAlert } = useAlert();
  const {
    resumes,
    duplicatedResumes,
    isLoading,
    isDeleting,
    handleDuplicate,
    handleDeleteDuplicate,
    handleDeleteResume,
    handleTitleChange,
    refreshResumes,
  } = useCachedResumes(t);

  useEffect(() => {
    refreshResumes();
  }, [refreshResumes]);

  const handleDelete = (id: string, isDuplicate = false) => {
    if (isDuplicate) {
      handleDeleteDuplicate(id);
      toast.success(t("messages.duplicateDeleted"), {
        duration: 3000,
      });
    } else {
      handleDeleteResume(id);
      toast.success(t("messages.resumeDeleted"), {
        duration: 3000,
      });
    }
  };

  const handleDuplicateResume = (resume: IResume) => {
    handleDuplicate(resume);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">{t("loading")}</div>
      </div>
    );
  }

  const allResumes = [
    ...resumes,
    ...duplicatedResumes.map((dr) => ({
      id: dr.id,
      title: dr.title,
      data: dr.data,
      isDuplicate: true,
    })),
  ];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid auto-rows-[320px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Link
            href="/profile/resume/editor"
            className="box-border flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-4 transition-colors hover:border-gray-400"
          >
            <div className="flex items-center gap-2">
              <Icon name="resume-page" size="w-4 h-5" />
              <span>{t("actions.create")}</span>
            </div>
          </Link>

          {allResumes.map((resume: ResumeWithDuplicate, i) => (
            <div
              key={resume.id || i}
              className="group flex flex-col rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
            >
              <div className="relative flex-1 overflow-hidden rounded-md border border-gray-100">
                <ResumePreviewSection
                  data={"data" in resume ? resume.data : resume}
                  template={
                    ("data" in resume
                      ? resume.data.template
                      : resume.template) || "classic"
                  }
                />
              </div>
              <DocumentInfo
                title={resume.title || ""}
                lastUpdated={formatDate(
                  "data" in resume ? resume.data.updatedAt : resume.updatedAt,
                  locale
                )}
                onDuplicate={() =>
                  handleDuplicateResume("data" in resume ? resume.data : resume)
                }
                onDeleteClick={() =>
                  handleDeleteClick(
                    resume.id,
                    "isDuplicate" in resume && resume.isDuplicate
                  )
                }
                onTitleChange={(newTitle) =>
                  handleTitleChange(resume.id, newTitle)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
