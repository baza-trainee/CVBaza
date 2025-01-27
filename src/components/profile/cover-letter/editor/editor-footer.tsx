import { FileUserIcon, PenLineIcon, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { steps } from "./steps";

interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showMobileResumePreview: boolean;
  setShowMobileResumePreview: (show: boolean) => void;
  isSaving?: boolean;
  isSavingToDb?: boolean;
  onSave?: () => void;
}

export const EditorFooter = ({
  currentStep,
  setCurrentStep,
  showMobileResumePreview,
  setShowMobileResumePreview,
  isSaving,
  isSavingToDb,
  onSave,
}: FooterProps) => {
  const t = useTranslations("Form.navigation");

  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep
  )?.key;

  return (
    <footer className="w-full border-t p-3">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3 text-blue-600">
          <Button
            variant="secondary"
            className="transition-colors hover:bg-blue-100/50"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            {t("previousStep")}
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
            className="transition-colors hover:bg-blue-100/50"
          >
            {t("nextStep")}
          </Button>
          {isSaving && <span className="ml-4 text-gray-500">Saving...</span>}
        </div>

        <div className="flex items-center gap-3">
          {onSave && currentStep === "summary" && (
            <Button
              onClick={onSave}
              disabled={isSavingToDb}
              className="flex items-center gap-2 transition-colors hover:bg-blue-100/50"
            >
              <Save className="h-4 w-4" />
              {isSavingToDb ? "Saving..." : "Save Resume"}
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowMobileResumePreview(!showMobileResumePreview)}
            className="xl:hidden"
            title={t("togglePreview")}
          >
            {showMobileResumePreview ? (
              <PenLineIcon className="h-4 w-4" />
            ) : (
              <FileUserIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </footer>
  );
};
