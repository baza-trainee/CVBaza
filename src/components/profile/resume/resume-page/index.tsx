"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCachedResumes } from "@/components/profile/resume/hooks/use-resumes";
import { ResumePreviewSection } from "@/components/profile/resume/resume-preview";
import { DocumentInfo } from "@/components/shared/document-info";
import { Icon } from "@/components/shared/icon";
import { Loader } from "@/components/shared/loader";
import { useAlert } from "@/contexts/alert-context";
import { Link } from "@/i18n/routing";
import { IResume } from "@/types/resume";
import { formatDate } from "@/utils/date-utils";

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

  console.log(resumes);
  console.log(duplicatedResumes);

  const handleDelete = (id: string, isDuplicate = false) => {
    if (isDuplicate) {
      handleDeleteDuplicate(id);
    } else {
      handleDeleteResume(id);
    }
  };

  const handleDuplicateResume = (resume: IResume) => {
    const processedResume: IResume = {
      ...resume,
      workExperiences: resume.workExperiences || [],
      educations: resume.educations || [],
      languages: resume.languages || [],
      skills: resume.skills || [],
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

  const getResumeData = (resume: ResumeWithDuplicate) => {
    if ("data" in resume) {
      return {
        ...resume.data,
        workExperiences: resume.data.workExperiences || [],
        educations: resume.data.educations || [],
        languages: resume.data.languages || [],
        skills: resume.data.skills || [],
      };
    }
    return {
      ...resume,
      workExperiences: resume.workExperiences || [],
      educations: resume.educations || [],
      languages: resume.languages || [],
      skills: resume.skills || [],
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="text-gray-400" />
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Link
            href="/profile/resume/editor"
            className="flex h-[520px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-4 transition-colors hover:border-gray-400 lg:h-[320px]"
          >
            <div className="flex items-center gap-2">
              <Icon name="resume-page" size="w-4 h-5" />
              <span>{t("actions.create")}</span>
            </div>
          </Link>

          {allResumes.map((resume: ResumeWithDuplicate, i) => (
            <div
              key={resume.id || i}
              className="group relative flex h-[520px] flex-col rounded-lg border border-gray-200 transition-shadow hover:shadow-md lg:h-[320px]"
            >
              <div className="relative flex-1 overflow-y-auto rounded-lg lg:overflow-hidden">
                <ResumePreviewSection
                  data={getResumeData(resume)}
                  template={
                    ("data" in resume
                      ? resume.data.template
                      : resume.template) || "classic"
                  }
                />
                <button
                  type="button"
                  onClick={() => toggleInfo(resume.id)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition-colors hover:bg-white hover:text-gray-900"
                >
                  <Icon name="info" size="w-5 h-5" />
                </button>
                {activeInfoId === resume.id && (
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
                          handleDuplicateResume(
                            "data" in resume ? resume.data : resume
                          );
                          toggleInfo(resume.id);
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
                              resume.id,
                              "isDuplicate" in resume && resume.isDuplicate
                            );
                            toggleInfo(resume.id);
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
                  title={resume.title || ""}
                  lastUpdated={formatDate(
                    "data" in resume ? resume.data.updatedAt : resume.updatedAt,
                    locale
                  )}
                  onDuplicate={() =>
                    handleDuplicateResume(
                      "data" in resume ? resume.data : resume
                    )
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
