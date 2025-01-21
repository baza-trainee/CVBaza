import { useMemo, useRef } from "react";
import useDimensions from "@/hooks/use-dimensions";
import { cn } from "@/lib/utils";
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

const A4_WIDTH = 794;
const MIN_ZOOM = 0.4;
const PADDING = 24;

export const ResumePreviewSection = ({
  data,
  template,
}: ResumePreviewSectionProps) => {
  const TemplateComponent = getTemplate(template);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  const zoom = useMemo(() => {
    if (!width) return MIN_ZOOM;
    return Math.max(MIN_ZOOM, (width - PADDING) / A4_WIDTH);
  }, [width]);

  return (
    <div
      className={cn("group relative hidden h-full w-full border-2 md:flex")}
      ref={containerRef}
    >
      <div
        className="no-scrollbar flex w-full justify-center overflow-y-auto p-4"
        style={{
          zoom: zoom,
        }}
      >
        <TemplateComponent data={data} />
      </div>
    </div>
  );
};
