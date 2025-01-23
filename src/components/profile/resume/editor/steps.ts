import { EditorFormProps } from "@/types/resume";
import { EducationForm } from "./forms/education-form";
import { GeneralInfoForm } from "./forms/general-info-form";
import { LanguagesForm } from "./forms/languages-form";
import { PersonalInfoForm } from "./forms/personal-info-form";
import { SkillsForm } from "./forms/skills-form";
import { SummaryForm } from "./forms/summary-form";
import { WorkExperienceForm } from "./forms/work-experience-form";

export type StepKey =
  | "generalInfo"
  | "personalInfo"
  | "workExperience"
  | "education"
  | "skills"
  | "languages"
  | "summary";

export const steps: {
  titleKey: StepKey;
  component: React.ComponentType<EditorFormProps>;
  key: string;
}[] = [
  {
    titleKey: "generalInfo",
    component: GeneralInfoForm,
    key: "general-info",
  },
  {
    titleKey: "personalInfo",
    component: PersonalInfoForm,
    key: "personal-info",
  },
  {
    titleKey: "workExperience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  {
    titleKey: "education",
    component: EducationForm,
    key: "education",
  },
  {
    titleKey: "skills",
    component: SkillsForm,
    key: "skills",
  },
  {
    titleKey: "languages",
    component: LanguagesForm,
    key: "languages",
  },
  {
    titleKey: "summary",
    component: SummaryForm,
    key: "summary",
  },
];
