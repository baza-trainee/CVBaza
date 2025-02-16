import { EditorFormProps } from "@/types/letter";
import { GeneralInfoForm } from "./forms/general-info-form";
import { PersonalInfoForm } from "./forms/personal-info-form";
import { TextForm } from "./forms/text-form";

export type StepKey = "generalInfo" | "personalInfo" | "text";

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
    titleKey: "text",
    component: TextForm,
    key: "text",
  },
];
