import { ResumeData } from "@/types/resume";
import { DetailedTemplate } from "./templates/detailed-template";
import { ShortTemplate } from "./templates/short-template";

interface LetterPreviewSectionProps {
  data: ResumeData;
  template: string;
}

const renderTemplate = (template: string) => {
  switch (template) {
    case "short":
      return ShortTemplate;
    case "detailed":
      return DetailedTemplate;
    default:
      return ShortTemplate;
  }
};

export const MobilePreview = ({
  data,
  template,
}: LetterPreviewSectionProps) => {
  return (
    <div className="absolute left-0 top-0 z-50 h-full w-full bg-white/70 backdrop-blur-sm">
      <div className="no-scrollbar mx-auto flex h-[94vh] justify-center overflow-y-auto p-3">
        {renderTemplate(template)({ data: data })}
      </div>
    </div>
  );
};
