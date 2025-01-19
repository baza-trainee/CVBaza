"use client";

import { useEffect, useState } from "react";
import { ResumePreviewSection } from "@/components/profile/resume/resume-preview";
import { Icon } from "@/components/shared/icon";
import { Link } from "@/i18n/routing";
import { ResumeData } from "@/types/resume";
import { DocumentInfo } from "../document-info";

export const ResumePage = () => {
  const [resume, setResume] = useState<ResumeData | null>(null);
  const template = "classic";

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch("/src/app/api/resumes/schema.ts");
        const data: ResumeData[] = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setResume(data[0]);
        }
      } catch (error) {
        console.error("Помилка завантаження резюме:", error);
      }
    };

    fetchResume();
  }, []);

  return (
    <div className="flex w-[835px] justify-between bg-white">
      <div className="mb-[74px] box-border flex h-[320px] w-[232px] items-center justify-center rounded-[4px] border-[1px] border-dashed border-[rgb(208,207,207)] px-5">
        <div className="flex items-center gap-2 pl-[4px]">
          <Icon name="resume-page" size="w-4 h-5" />
          <Link href="/profile/resume/editor">Створити резюме</Link>
        </div>
      </div>

      <div className="flex justify-center">
        {resume ? (
          <div className="flex h-auto w-[232px] flex-col gap-4">
            <div className="h-[320px] overflow-y-hidden">
              <ResumePreviewSection data={resume} template={template} />
            </div>
            <DocumentInfo lastUpdated="25 грудня 2024 09:05" />
          </div>
        ) : (
          <div className="h-[320px] w-[232px] bg-slate-600"></div>
        )}
      </div>
      <div className="h-[320px] w-[232px] bg-gray-400"></div>
    </div>
  );
};
