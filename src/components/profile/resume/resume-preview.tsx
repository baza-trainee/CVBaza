import { ResumeData } from "@/types/resume";
import { ClassicTemplate } from "./templates/classic-template";
import { ModernDarkTemplate } from "./templates/modern-dark-template";

interface ResumePreviewSectionProps {
  data: ResumeData;
  template: string;
}

const getTemplate = (template: string) => {
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
  const TemplateComponent = getTemplate(template);

  return (
    <div className="group w-full xl:flex">
      <div className="no-scrollbar mx-auto flex h-[94vh] justify-center overflow-y-auto bg-gray-100 p-3">
        <TemplateComponent data={data} />
      </div>
    </div>
  );
};
