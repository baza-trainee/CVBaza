"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { ResumePreviewSection } from "@/components/profile/resume/resume-preview";
import { Icon } from "@/components/shared/icon";
import { Link } from "@/i18n/routing";
import { IResume } from "@/types/resume";
import { formatDate } from "@/utils/date-utils";
import { DocumentInfo } from "../document-info";

interface DuplicatedResume {
  id: string;
  data: IResume;
  title: string;
}

const getSavedResumes = () => {
  if (typeof window === "undefined") return [];
  const savedResumes = localStorage.getItem("resumes");
  return savedResumes ? JSON.parse(savedResumes) : [];
};

export const ResumePage = () => {
  const locale = useLocale();
  const t = useTranslations("resume");
  const [resumes, setResumes] = useState<IResume[]>([]);
  const [duplicatedResumes, setDuplicatedResumes] =
    useState<DuplicatedResume[]>(getSavedResumes);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        const response = await fetch("/api/resumes");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: IResume[] = await response.json();
        if (Array.isArray(data)) {
          setResumes(data);
        }
      } catch (error) {
        console.error("Error loading resumes:", error);
        toast.error(t("errors.loadFailed"));
      }
    };
    loadResumes();
  }, [t]);

  const handleDuplicate = (resume: IResume) => {
    const newId = crypto.randomUUID();
    const duplicatedResume: DuplicatedResume = {
      id: newId,
      data: { ...resume },
      title: `${resume.title} (${t("copy")})`,
    };

    setDuplicatedResumes((prev) => {
      const newResumes = [...prev, duplicatedResume];
      if (typeof window !== "undefined") {
        localStorage.setItem("resumes", JSON.stringify(newResumes));
      }
      return newResumes;
    });
  };

  const handleDeleteDuplicate = (id: string) => {
    setDuplicatedResumes((prev) => {
      const newResumes = prev.filter((resume) => resume.id !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem("resumes", JSON.stringify(newResumes));
      }
      return newResumes;
    });
  };

  const handleDeleteResume = async (id: string) => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      setIsDeletingId(id);
      const response = await fetch(`/api/resumes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Remove from local state
      setResumes((prev) => prev.filter((resume) => resume.id !== id));
      toast.success(t("messages.deleteSuccess"));
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error(t("errors.deleteFailed"));
    } finally {
      setIsDeleting(false);
      setIsDeletingId(null);
    }
  };

  const handleDelete = (id: string, isDuplicate = false) => {
    if (isDuplicate) {
      handleDeleteDuplicate(id);
    } else {
      handleDeleteResume(id);
    }
  };

  const handleTitleChange = (id: string, newTitle: string) => {
    setDuplicatedResumes((prev) => {
      const newResumes = prev.map((resume) =>
        resume.id === id ? { ...resume, title: newTitle } : resume
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("resumes", JSON.stringify(newResumes));
      }
      return newResumes;
    });
  };

  return (
    <div className="flex items-start gap-[68px] bg-white p-[24px]">
      <div className="mb-[74px] box-border flex h-[320px] w-[232px] items-center justify-center rounded-[4px] border-[1px] border-dashed border-[rgb(208,207,207)] px-5">
        <div className="flex items-center gap-2 pl-[4px]">
          <Icon name="resume-page" size="w-4 h-5" />
          <Link href="/profile/resume/editor">{t("actions.create")}</Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-[68px]">
        {resumes.map((resume) => (
          <div key={resume.id} className="flex h-auto w-[232px] flex-col gap-4">
            <div className="h-[320px] overflow-y-hidden">
              <ResumePreviewSection
                data={resume}
                template={resume.template || "classic"}
              />
            </div>
            <DocumentInfo
              title={resume.title || ""}
              lastUpdated={formatDate(resume.updatedAt, locale)}
              onDuplicate={() => handleDuplicate(resume)}
              onDelete={() => handleDelete(resume.id)}
              onTitleChange={(newTitle) =>
                handleTitleChange(resume.id, newTitle)
              }
              isDeleting={isDeleting && isDeletingId === resume.id}
            />
          </div>
        ))}

        {duplicatedResumes.map((duplicatedResume) => (
          <div
            key={duplicatedResume.id}
            className="flex h-auto w-[232px] flex-col gap-4"
          >
            <div className="h-[320px] overflow-y-hidden">
              <ResumePreviewSection
                data={duplicatedResume.data}
                template={duplicatedResume.data.template || "classic"}
              />
            </div>
            <DocumentInfo
              title={duplicatedResume.title}
              lastUpdated={formatDate(duplicatedResume.data.updatedAt, locale)}
              onTitleChange={(newTitle) =>
                handleTitleChange(duplicatedResume.id, newTitle)
              }
              onDuplicate={() => handleDuplicate(duplicatedResume.data)}
              onDelete={() => handleDelete(duplicatedResume.id, true)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
