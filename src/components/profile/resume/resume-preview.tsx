import { cn } from "@/lib/utils";
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
    <div className={cn("group relative w-full md:flex")}>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        {renderTemplate(template)({ data: data })}
      </div>
    </div>
  );
};
