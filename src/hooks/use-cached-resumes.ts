import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { IResume } from "@/types/resume";

interface CachedResume extends IResume {
  cachedAt: number;
}

interface DuplicatedResume {
  id: string;
  data: IResume;
  title: string;
}

// Constants
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes
const STORAGE_KEYS = {
  CACHED: "cached_resumes",
  DUPLICATED: "resumes",
} as const;

// Storage utilities
const getStorageData = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

const setStorageData = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Cache management
const isCacheValid = (cached: CachedResume[]): boolean => {
  if (cached.length === 0) return false;
  const now = Date.now();
  return cached[0].cachedAt > now - CACHE_EXPIRY;
};

export const useCachedResumes = (t: (key: string) => string) => {
  // State
  const [resumes, setResumes] = useState<IResume[]>([]);
  const [duplicatedResumes, setDuplicatedResumes] = useState<
    DuplicatedResume[]
  >(getStorageData(STORAGE_KEYS.DUPLICATED, []));
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // Cache operations
  const updateCache = useCallback((data: IResume[]) => {
    const cachedData: CachedResume[] = data.map((resume) => ({
      ...resume,
      cachedAt: Date.now(),
    }));
    setStorageData(STORAGE_KEYS.CACHED, cachedData);
    setResumes(data);
  }, []);

  // Data fetching
  const fetchResumes = useCallback(
    async (force = false) => {
      try {
        const cached = getStorageData<CachedResume[]>(STORAGE_KEYS.CACHED, []);

        // Use cache if valid and not forced refresh
        if (!force && isCacheValid(cached)) {
          setResumes(cached);
          setIsLoading(false);
          return;
        }

        const response = await fetch("/api/resumes");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          updateCache(data);
        }
      } catch (error) {
        console.error("Error loading resumes:", error);
        toast.error(t("errors.loadFailed"), {
          duration: 3000,
        });

        // Fallback to cached data
        const cached = getStorageData<CachedResume[]>(STORAGE_KEYS.CACHED, []);
        if (cached.length > 0) {
          setResumes(cached);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [t, updateCache]
  );

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
    [t]
  );

  const handleDeleteDuplicate = useCallback((id: string) => {
    setDuplicatedResumes((prev) => {
      const newResumes = prev.filter((resume) => resume.id !== id);
      setStorageData(STORAGE_KEYS.DUPLICATED, newResumes);
      return newResumes;
    });
  }, []);

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

        if (response.ok) {
          toast.success(t("messages.deleteSuccess"), {
            duration: 3000,
          });
        }
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
