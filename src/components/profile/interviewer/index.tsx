"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InterviewForm } from "./forms/interview-form";
import { InterviewFormValues } from "./forms/schema";

export const Interviewer = () => {
  // State for interview data and dialog open state
  const [interviewData, setInterviewData] = useState<InterviewFormValues[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (data: InterviewFormValues) => {
    setInterviewData([...interviewData, data]);
    console.log("Interview data submitted:", data);
    setIsDialogOpen(false); // Close dialog after submission
    // Here you would typically save the interview data
  };

  const handleCancel = () => {
    console.log("Interview setup cancelled");
    setIsDialogOpen(false); // Close dialog on cancel
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Interviews</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Interview</DialogTitle>
            </DialogHeader>
            <InterviewForm onSubmit={handleSubmit} onCancel={handleCancel} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Display saved interviews */}
      <div className="space-y-4">
        {interviewData.length === 0 ? (
          <p className="text-muted-foreground">No interviews created yet.</p>
        ) : (
          interviewData.map((interview, index) => (
            <div key={index} className="rounded-lg border p-4">
              <h3 className="font-medium">{interview.position}</h3>
              <p className="text-sm text-muted-foreground">
                {interview.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {interview.techStack?.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-primary/10 px-2 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-sm">
                Experience: {interview.yearsOfExperience} years
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
