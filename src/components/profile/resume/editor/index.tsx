"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { templates } from "@/constants";
import { ResumePreviewSection } from "../resume-preview";
import { Breadcrumbs } from "./breadcrumbs";
import { steps } from "./steps";

export const ResumeEditor = () => {
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;

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
    <div className="flex flex-col lg:flex-row">
      <div className="w-1/2">
        <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
        {FormComponent && (
          <FormComponent
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        )}
      </div>

      <div className="grow md:border-r" />
      <div className="w-1/2">
        <ResumePreviewSection
          data={resumeData}
          template={resumeData.template || templates.CLASSIC}
        />
      </div>
    </div>
  );
};
