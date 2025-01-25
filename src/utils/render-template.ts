import { ClassicTemplate } from "@/components/profile/resume/templates/classic-template";
import { ModernDarkTemplate } from "@/components/profile/resume/templates/modern-dark-template";

export const renderTemplate = (template: string) => {
  switch (template) {
    case "classic":
      return ClassicTemplate;
    case "modern-dark":
      return ModernDarkTemplate;
    default:
      return ClassicTemplate;
  }
};
