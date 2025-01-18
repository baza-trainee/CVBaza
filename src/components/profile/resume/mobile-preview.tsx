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

export const MobilePreview = ({
  data,
  template,
}: ResumePreviewSectionProps) => {
  return (
    <div className="absolute left-0 top-0 z-50 h-full w-full bg-white/70 backdrop-blur-sm">
      <div className="no-scrollbar mx-auto flex h-[94vh] justify-center overflow-y-auto p-3">
        {renderTemplate(template)({ data: data })}
      </div>
    </div>
  );
};
