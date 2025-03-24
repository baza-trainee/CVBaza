"use client";

import { useState } from "react";
import { InterviewForm } from "./forms/interview-form";
import { InterviewFormValues } from "./forms/schema";

export const Interviewer = () => {
  // State will be used when implementing the actual interview functionality
  const [interviewData, setInterviewData] =
    useState<InterviewFormValues | null>(null);

  const handleSubmit = (data: InterviewFormValues) => {
    setInterviewData(data);
    console.log("Interview data submitted:", interviewData);
    // Here you would typically start the interview process
  };

  const handleCancel = () => {
    console.log("Interview setup cancelled");
    // Handle cancellation logic here
  };

  return (
    <div className="container mx-auto py-8">
      <InterviewForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};
