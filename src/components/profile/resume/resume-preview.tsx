import { ResumeData } from "@/types/resume";
import { ClassicTemplate } from "./templates/classic-template";
import { ModernDarkTemplate } from "./templates/modern-dark-template";

interface ResumePreviewSectionProps {
  data: ResumeData;
  template: string;
}

const renderTemplate = (template: string) => {
  switch (template) {
    case "classic":
      return ClassicTemplate;
    case "modern-dark":
      return ModernDarkTemplate;
    default:
      return ClassicTemplate;
  }
};

export const ResumePreviewSection = ({
  data,
  template,
}: ResumePreviewSectionProps) => {
  return (
    <div className="group w-full xl:flex">
      <div className="no-scrollbar mx-auto flex h-[94vh] justify-center overflow-y-auto p-3">
        {renderTemplate(template)({ data: data })}
      </div>
    </div>
  );
};
