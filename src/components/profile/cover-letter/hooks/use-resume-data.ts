import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { initialData } from "@/components/profile/resume/editor/forms/initialdata";
import { useToast } from "@/hooks/use-toast";
import { ResumeData } from "@/types/resume";

const STORAGE_KEY = "resumeData";
const REQUIRED_FIELDS = [
  "name",
  "profession",
  "summary",
  "title",
  "template",
] as const;

interface SavedResume {
  photo?: string;
  publicId?: string;
}

const convertPhotoToBase64 = async (photo: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(photo);
  });
};

const validateRequiredFields = (data: ResumeData): void => {
  const missingFields = REQUIRED_FIELDS.filter((field) => !data[field]);
  if (missingFields.length > 0) {
    throw new Error(
      `Please fill in all required fields (${missingFields.join(", ")})`
    );
  }
};

// Custom hook for managing resume data with localStorage
export const useResumeData = () => {
  const [isClient, setIsClient] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingToDb, setIsSavingToDb] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Initialize client-side data
  useEffect(() => {
    setIsClient(true);
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage with debounce
  const updateResumeData = useCallback(
    (newData: ResumeData) => {
      setResumeData(newData);
      if (isClient) {
        setIsSaving(true);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        setTimeout(() => setIsSaving(false), 500);
      }
    },
    [isClient]
  );

  // Update resume data with Cloudinary info
  const updateCloudinaryData = useCallback((savedResume: SavedResume) => {
    if (savedResume.photo && savedResume.publicId) {
      setResumeData((prev) => ({
        ...prev,
        photo: savedResume.photo,
        publicId: savedResume.publicId,
      }));
    }
  }, []);

  // Save resume to database
  const saveToDatabase = useCallback(async () => {
    try {
      setIsSavingToDb(true);
      validateRequiredFields(resumeData);

      const dataToSend = { ...resumeData };

      // Handle photo upload if it's a File
      if (resumeData.photo instanceof File) {
        dataToSend.photo = await convertPhotoToBase64(resumeData.photo);
      }

      const formData = new FormData();
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
      updateCloudinaryData(savedResume);

      toast({
        title: "Success",
        description: "Resume saved successfully",
      });

      localStorage.removeItem(STORAGE_KEY);
      router.push("/profile/resume");
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save resume",
        variant: "destructive",
      });
    } finally {
      setIsSavingToDb(false);
    }
  }, [resumeData, toast, router, updateCloudinaryData]);

  return {
    resumeData,
    updateResumeData,
    saveToDatabase,
    isInitialized: isClient,
    isSaving,
    isSavingToDb,
  };
};
