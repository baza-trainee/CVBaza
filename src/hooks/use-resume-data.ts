import { useCallback, useEffect, useState } from "react";
import { initialData } from "@/components/profile/resume/editor/forms/initialdata";
import { ResumeData } from "@/types/resume";

// Custom hook for managing resume data with localStorage
export const useResumeData = () => {
  const [isClient, setIsClient] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);

  useEffect(() => {
    setIsClient(true);
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
  }, []);

  const updateResumeData = useCallback(
    (newData: ResumeData) => {
      setResumeData(newData);
      if (isClient) {
        localStorage.setItem("resumeData", JSON.stringify(newData));
      }
    },
    [isClient]
  );

  return { resumeData, updateResumeData, isInitialized: isClient };
};
