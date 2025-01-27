import { usePathname } from "next/navigation";
import { useMemo, useRef } from "react";
import { A4_WIDTH, MIN_ZOOM, PADDING } from "@/constants";
import useDimensions from "@/hooks/use-dimensions";
import { cn } from "@/lib/utils";
import { ResumeData } from "@/types/resume";
import {
  renderLetterTemplate,
  renderResumeTemplate,
} from "@/utils/render-template";

interface PreviewSectionProps {
  data: ResumeData;
  template: string;
  document: string;
}

export const PreviewSection = ({
  data,
  template,
  document,
}: PreviewSectionProps) => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);
  const isEditor = pathname?.includes("/editor");
  const TemplateResumeComponent = renderResumeTemplate(template);
  const TemplateLetterComponent = renderLetterTemplate(template);

  const zoom = useMemo(() => {
    if (!width) return MIN_ZOOM;
    return Math.max(MIN_ZOOM, (width - PADDING) / A4_WIDTH);
  }, [width]);

  return (
    <div
      className={cn(
        "group relative w-full border-2",
        isEditor ? "hidden md:flex" : "flex"
      )}
      ref={containerRef}
    >
      <div
        className="no-scrollbar flex w-full justify-center overflow-y-auto p-4"
        style={{
          zoom: zoom,
        }}
      >
        {document === "resume" ? (
          <TemplateResumeComponent data={data} />
        ) : (
          <TemplateLetterComponent data={data} />
        )}
      </div>
    </div>
  );
};
