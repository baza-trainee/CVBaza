import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { IResume } from "@/types/resume";
import { useStorage } from "./use-storage";

interface DuplicatedResume {
  id: string;
  data: IResume;
  title: string;
}

const STORAGE_KEYS = {
  DUPLICATED: "resumes",
} as const;

export const useCachedResumes = (t: (key: string) => string) => {
  const { getStorageData, setStorageData } = useStorage();

  // State
  const [resumes, setResumes] = useState<IResume[]>([]);
  const [duplicatedResumes, setDuplicatedResumes] = useState<
    DuplicatedResume[]
  >(getStorageData(STORAGE_KEYS.DUPLICATED, []));
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // Data fetching
  const fetchResumes = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/resumes");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setResumes(data);
      }
    } catch (error) {
      console.error("Error loading resumes:", error);
      toast.error(t("errors.loadFailed"), {
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  // Resume operations
  const handleDuplicate = useCallback(
    (resume: IResume) => {
      const duplicatedResume: DuplicatedResume = {
        id: crypto.randomUUID(),
        data: { ...resume },
        title: `${resume.title} (${t("copy")})`,
      };

      setDuplicatedResumes((prev) => {
        const newResumes = [...prev, duplicatedResume];
        setStorageData(STORAGE_KEYS.DUPLICATED, newResumes);
        return newResumes;
      });
    },
    [t, setStorageData]
  );

  const handleDeleteDuplicate = useCallback(
    (id: string) => {
      setDuplicatedResumes((prev) => {
        const newResumes = prev.filter((resume) => resume.id !== id);
        setStorageData(STORAGE_KEYS.DUPLICATED, newResumes);
        return newResumes;
      });
    },
    [setStorageData]
  );

  const handleDeleteResume = useCallback(
    async (id: string) => {
      try {
        setIsDeleting(true);
        setIsDeletingId(id);

        const response = await fetch(`/api/resumes/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setResumes((prev) => prev.filter((resume) => resume.id !== id));

        // Show success message after state update
        toast.success(t("messages.deleteSuccess"), {
          duration: 3000,
        });
      } catch (error) {
        console.error("Error deleting resume:", error);
        toast.error(t("errors.deleteFailed"), {
          duration: 3000,
        });
      } finally {
        setIsDeleting(false);
        setIsDeletingId(null);
      }
    },
    [t]
  );

  const handleTitleChange = useCallback(
    async (id: string, newTitle: string) => {
      try {
        const response = await fetch(`/api/resumes/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: newTitle }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setResumes((prev) =>
          prev.map((resume) =>
            resume.id === id ? { ...resume, title: newTitle } : resume
          )
        );

        toast.success(t("messages.saveTitleSuccess"), {
          duration: 3000,
        });
      } catch (error) {
        console.error("Error updating resume title:", error);
        toast.error(t("errors.saveTitleFailed"), {
          duration: 3000,
        });
      }
    },
    [t]
  );

  // Initial data fetch
  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  return {
    resumes,
    duplicatedResumes,
    isLoading,
    isDeleting,
    isDeletingId,
    refreshResumes: fetchResumes,
    handleDuplicate,
    handleDeleteDuplicate,
    handleDeleteResume,
    handleTitleChange,
  };
};
