"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/profile/resume/editor/breadcrumbs";
import { PreviewSection } from "@/components/profile/resume/preview";
import { lettersTemplates } from "@/constants";
import { useResumeData } from "@/hooks/use-resume-data";
import { MobilePreview } from "../mobile-preview";
import { EditorFooter } from "./editor-footer";
import { steps } from "./steps";

export const LetterEditor = () => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;
  const [showMobileResumePreview, setShowMobileResumePreview] = useState(false);
  const {
    resumeData,
    updateResumeData,
    saveToDatabase,
    isInitialized,
    isSaving,
    isSavingToDb,
  } = useResumeData();

  const setStep = useCallback(
    (key: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("step", key);
      window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    },
    [searchParams]
  );

  const FormComponent = useMemo(
    () => steps.find((step) => step.key === currentStep)?.component,
    [currentStep]
  );

  if (!isInitialized) {
    return null;
  }

  return (
    <div className="flex w-full flex-col pt-[4rem] lg:pt-0 xl:flex-row">
      <div className="mx-auto flex h-[94vh] w-full flex-col justify-between xl:w-1/2">
        <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
        {FormComponent && (
          <div className="no-scrollbar overflow-y-auto">
            <FormComponent
              letterData={resumeData}
              setLetterData={updateResumeData}
            />
          </div>
        )}
        <EditorFooter
          currentStep={currentStep}
          setCurrentStep={setStep}
          isSaving={isSaving}
          isSavingToDb={isSavingToDb}
          onSave={saveToDatabase}
          showMobileResumePreview={showMobileResumePreview}
          setShowMobileResumePreview={setShowMobileResumePreview}
        />
      </div>
      <div className="hidden w-full xl:block xl:w-1/2">
        <PreviewSection
          data={resumeData}
          document={"letter"}
          template={resumeData.template || lettersTemplates.SHORT}
        />
      </div>
      {showMobileResumePreview && (
        <MobilePreview
          data={resumeData}
          template={resumeData.template || lettersTemplates.SHORT}
        />
      )}
    </div>
  );
};
