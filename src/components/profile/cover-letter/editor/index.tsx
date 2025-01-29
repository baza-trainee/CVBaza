"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useLetterData } from "@/components/profile/cover-letter/hooks/use-letter-data";
import { Breadcrumbs } from "@/components/profile/resume/editor/breadcrumbs";
import { EditorFooter } from "@/components/profile/resume/editor/editor-footer";
import { MobilePreview } from "@/components/profile/resume/mobile-preview";
import { PreviewSection } from "@/components/profile/resume/preview";
import { lettersTemplates } from "@/constants";
import { steps } from "./steps";

export const LetterEditor = () => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;
  const [showMobileLetterPreview, setShowMobileLetterPreview] = useState(false);
  const {
    letterData,
    updateLetterData,
    saveToDatabase,
    isInitialized,
    isSaving,
    isSavingToDb,
  } = useLetterData();

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
              letterData={letterData}
              setLetterData={updateLetterData}
            />
          </div>
        )}
        <EditorFooter
          currentStep={currentStep}
          setCurrentStep={setStep}
          isSaving={isSaving}
          isSavingToDb={isSavingToDb}
          onSave={saveToDatabase}
          showMobileResumePreview={showMobileLetterPreview}
          setShowMobileResumePreview={setShowMobileLetterPreview}
        />
      </div>
      <div className="hidden w-full xl:block xl:w-1/2">
        <PreviewSection
          componentType={"letter"}
          // @ts-expect-error type error
          data={letterData}
          template={letterData.template || lettersTemplates.SHORT}
        />
      </div>
      {showMobileLetterPreview && (
        <MobilePreview
          componentType={"letter"}
          // @ts-expect-error type error
          data={letterData}
          template={letterData.template || lettersTemplates.SHORT}
          onClose={() => setShowMobileLetterPreview(false)}
        />
      )}
    </div>
  );
};
