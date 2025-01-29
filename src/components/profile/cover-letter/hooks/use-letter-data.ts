import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { initialData } from "@/components/profile/cover-letter/editor/forms/initialdata";
// import { ResumeData } from "@/types/resume";
import { LetterData } from "@/types/letter";

const STORAGE_LETTER_KEY = "letterData";
const REQUIRED_FIELDS = [
  "name",
  "profession",
  "position",
  "company",
  "text",
  "title",
  "template",
] as const;

interface SavedLetter {
  publicId?: string;
}

const validateRequiredFields = (data: LetterData): void => {
  const missingFields = REQUIRED_FIELDS.filter((field) => !data[field]);
  if (missingFields.length > 0) {
    throw new Error(
      `Please fill in all required fields (${missingFields.join(", ")})`
    );
  }
};

// Custom hook for managing letter data with localStorage
export const useLetterData = () => {
  const [isClient, setIsClient] = useState(false);
  const [letterData, setLetterData] = useState<LetterData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingToDb, setIsSavingToDb] = useState(false);
  const router = useRouter();

  // Initialize client-side data
  useEffect(() => {
    setIsClient(true);
    const savedData = localStorage.getItem(STORAGE_LETTER_KEY);
    if (savedData) {
      setLetterData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage with debounce
  const updateLetterData = useCallback(
    (newData: LetterData) => {
      setLetterData(newData);
      if (isClient) {
        setIsSaving(true);
        localStorage.setItem(STORAGE_LETTER_KEY, JSON.stringify(newData));
        setTimeout(() => setIsSaving(false), 500);
      }
    },
    [isClient]
  );

  // Update letter data with Cloudinary info
  const updateCloudinaryData = useCallback((SavedLetter: SavedLetter) => {
    if (SavedLetter.publicId) {
      setLetterData((prev) => ({
        ...prev,
        publicId: SavedLetter.publicId,
      }));
    }
  }, []);

  // Save letter to database
  const saveToDatabase = useCallback(async () => {
    try {
      setIsSavingToDb(true);
      validateRequiredFields(letterData);

      const dataToSend = { ...letterData };

      const response = await fetch("/api/letters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: dataToSend }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save the letter");
      }

      const savedLetter = await response.json();
      updateCloudinaryData(savedLetter);

      toast.success("Resume saved successfully");

      localStorage.removeItem(STORAGE_LETTER_KEY);
      router.push("/profile/cover-letter");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save the letter"
      );
    } finally {
      setIsSavingToDb(false);
    }
  }, [letterData, router, updateCloudinaryData]);

  return {
    letterData,
    updateLetterData,
    saveToDatabase,
    isInitialized: isClient,
    isSaving,
    isSavingToDb,
  };
};
