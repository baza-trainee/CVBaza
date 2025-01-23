import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { initialData } from "@/components/profile/resume/editor/forms/initialdata";
import { ResumeData } from "@/types/resume";
import { useToast } from "./use-toast";

// Custom hook for managing resume data with localStorage
export const useResumeData = () => {
  const [isClient, setIsClient] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingToDb, setIsSavingToDb] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

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
        setIsSaving(true);
        localStorage.setItem("resumeData", JSON.stringify(newData));
        setTimeout(() => {
          setIsSaving(false);
        }, 500);
      }
    },
    [isClient]
  );

  const saveToDatabase = useCallback(async () => {
    try {
      setIsSavingToDb(true);

      // Validate required fields
      if (
        !resumeData.name ||
        !resumeData.profession ||
        !resumeData.summary ||
        !resumeData.title ||
        !resumeData.template
      ) {
        throw new Error(
          "Please fill in all required fields (Name, Profession, Summary, Title, and Template)"
        );
      }

      // Create FormData for file upload
      const formData = new FormData();
      const dataToSend = { ...resumeData };

      // If photo is a File, convert it to base64
      if (resumeData.photo instanceof File) {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(resumeData.photo as File);
        });
        dataToSend.photo = base64;
      }

      // Add resume data as JSON
      formData.append("data", JSON.stringify(dataToSend));

      const response = await fetch("/api/resumes", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save resume");
      }

      const savedResume = await response.json();

      // Update local resume data with the Cloudinary URL and publicId
      if (savedResume.photo && savedResume.publicId) {
        setResumeData((prev) => ({
          ...prev,
          photo: savedResume.photo,
          publicId: savedResume.publicId,
        }));
      }

      toast({
        title: "Success",
        description: "Resume saved successfully",
      });

      // Clear local storage
      localStorage.removeItem("resumeData");

      // Reset state to initial data
      setResumeData(initialData);

      // Redirect to resumes list
      router.push("/profile/resume");
    } catch (error) {
      console.error("Error saving resume:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save resume",
        variant: "destructive",
      });
    } finally {
      setIsSavingToDb(false);
    }
  }, [resumeData, toast, router]);

  return {
    resumeData,
    updateResumeData,
    saveToDatabase,
    isInitialized: isClient,
    isSaving,
    isSavingToDb,
  };
};
