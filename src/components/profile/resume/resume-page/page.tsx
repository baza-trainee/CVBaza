"use client";

import { useEffect, useState } from "react";
import { ResumePreviewSection } from "@/components/profile/resume/resume-preview";
import { Icon } from "@/components/shared/icon";
import { Link } from "@/i18n/routing";
import { ResumeData } from "@/types/resume";
import { formatCurrentDate } from "@/utils/date-utils";
import { DocumentInfo } from "../document-info";

export const ResumePage = () => {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [duplicatedResumes, setDuplicatedResumes] = useState<
    { id: number; data: ResumeData; title: string }[]
  >(() => {
    const savedResumes = localStorage.getItem("resumes");
    return savedResumes ? JSON.parse(savedResumes) : [];
  });
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [resumeTitle, setResumeTitle] = useState<string>("");
  const template = "classic";

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch("/api/resumes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ResumeData[] = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setResume(data[0]);
          setResumeTitle(data[0].title);
          setLastUpdated(formatCurrentDate());
        }
      } catch (error) {
        console.error("Error loading resume:", error);
      }
    };

    fetchResume();
  }, []);

  useEffect(() => {
    localStorage.setItem("resumes", JSON.stringify(duplicatedResumes));
  }, [duplicatedResumes]);

  const handleDuplicate = () => {
    if (resume) {
      const newResume = {
        id: Date.now(),
        data: {
          ...resume,
          lastUpdated: formatCurrentDate(),
        },
        title: `${resume.title} ${duplicatedResumes.length + 1}`,
      };
      setDuplicatedResumes((prev) => [...prev, newResume]);
    }
  };

  const handleTitleChange = (id: number, newTitle: string) => {
    if (id === resume?.id) {
      setResumeTitle(newTitle);
    } else {
      setDuplicatedResumes((prev) =>
        prev.map((r) => (r.id === id ? { ...r, title: newTitle } : r))
      );
    }
  };

  const handleDelete = (id?: number) => {
    if (id) {
      setDuplicatedResumes((prev) => prev.filter((resume) => resume.id !== id));
    } else {
      setResume(null);
      setLastUpdated(null);
    }
  };

  return (
    <div className="flex items-start gap-[68px] bg-white">
      <div className="mb-[74px] box-border flex h-[320px] w-[232px] items-center justify-center rounded-[4px] border-[1px] border-dashed border-[rgb(208,207,207)] px-5">
        <div className="flex items-center gap-2 pl-[4px]">
          <Icon name="resume-page" size="w-4 h-5" />
          <Link href="/profile/resume/editor">Створити резюме</Link>
        </div>
      </div>

      <div className="flex justify-center gap-[68px]">
        {resume && (
          <div className="flex h-auto w-[232px] flex-col gap-4">
            <div className="h-[320px] overflow-y-hidden">
              <ResumePreviewSection data={resume} template={template} />
            </div>
            {lastUpdated && (
              <DocumentInfo
                title={resumeTitle}
                lastUpdated={lastUpdated}
                onTitleChange={(newTitle) =>
                  handleTitleChange(resume.id, newTitle)
                }
                onDuplicate={handleDuplicate}
                onDelete={() => handleDelete()}
              />
            )}
          </div>
        )}

        {duplicatedResumes.map((duplicatedResume) => (
          <div
            key={duplicatedResume.id}
            className="flex h-auto w-[232px] flex-col gap-4"
          >
            <div className="h-[320px] overflow-y-hidden">
              <ResumePreviewSection
                data={duplicatedResume.data}
                template={template}
              />
            </div>
            <DocumentInfo
              title={duplicatedResume.title}
              lastUpdated={duplicatedResume.data.lastUpdated}
              onTitleChange={(newTitle) =>
                handleTitleChange(duplicatedResume.id, newTitle)
              }
              onDuplicate={handleDuplicate}
              onDelete={() => handleDelete(duplicatedResume.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
