"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { templates } from "@/constants";
import { MobilePreview } from "../mobile-preview";
import { ResumePreviewSection } from "../resume-preview";
import { Breadcrumbs } from "./breadcrumbs";
import { EditorFooter } from "./editor-footer";
import { steps } from "./steps";

export const ResumeEditor = () => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;

  const [showMobileResumePreview, setShowMobileResumePreview] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [resumeData, setResumeData] = useState<any>({});

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <div className="flex w-full flex-col pt-[4rem] lg:pt-0 xl:flex-row">
      <div className="mx-auto flex h-[94vh] w-full flex-col justify-between xl:w-1/2">
        <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
        {FormComponent && (
          <div className="no-scrollbar overflow-y-auto">
            <FormComponent
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
          </div>
        )}
        <EditorFooter
          currentStep={currentStep}
          setCurrentStep={setStep}
          showMobileResumePreview={showMobileResumePreview}
          setShowMobileResumePreview={setShowMobileResumePreview}
        />
      </div>
      <div className="hidden w-full xl:block xl:w-1/2">
        <ResumePreviewSection
          data={resumeData}
          template={resumeData.template || templates.CLASSIC}
        />
      </div>
      {showMobileResumePreview && (
        <MobilePreview
          data={resumeData}
          template={resumeData.template || templates.CLASSIC}
        />
      )}
    </div>
  );
};
