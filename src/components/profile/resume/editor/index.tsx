"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useResumeData } from "@/components/profile/resume/hooks/use-resume-data";
import { templates } from "@/constants";
import { MobilePreview } from "../mobile-preview";
import { PreviewSection } from "../preview";
import { Breadcrumbs } from "./breadcrumbs";
import { EditorFooter } from "./editor-footer";
import { steps } from "./steps";

export const ResumeEditor = () => {
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
              resumeData={resumeData}
              setResumeData={updateResumeData}
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
          document={"resume"}
          data={resumeData}
          template={resumeData.template || templates.CLASSIC}
        />
      </div>
      {showMobileResumePreview && (
        <MobilePreview
          data={resumeData}
          template={resumeData.template || templates.CLASSIC}
          onClose={() => setShowMobileResumePreview(false)}
        />
      )}
    </div>
  );
};
