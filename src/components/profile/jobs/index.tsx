"use client";

import { Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { JobCard } from "./components/job-card";
import { useJobs } from "./hooks/use-jobs";

export const Jobs = () => {
  const locale = useLocale();
  const {
    jobs,
    isLoading,
    isLoadingLinkedIn,
    error,
    source,
    handleSearch,
    firstResume,
  } = useJobs();

  if (isLoading || isLoadingLinkedIn) {
    return (
      <div className="flex items-center justify-center p-4 text-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {locale === "en" ? "Loading..." : "Завантаження..."}
      </div>
    );
  }

  if (!firstResume) {
    return (
      <div className="p-4 text-center">
        {locale === "en"
          ? "Please create a resume first"
          : "Спочатку створіть резюме"}
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 p-[24px]">
      <div className="mb-2 text-sm text-gray-500">Found {jobs.length} jobs</div>
      <div className="flex gap-2">
        <Button
          variant={source === "dou" ? "default" : "outline"}
          onClick={() => handleSearch("dou")}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          DOU.ua
        </Button>
        <Button
          variant={source === "linkedin" ? "default" : "outline"}
          onClick={() => handleSearch("linkedin")}
          disabled={isLoadingLinkedIn}
        >
          {isLoadingLinkedIn && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          LinkedIn
        </Button>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="max-h-[600px] space-y-4 overflow-y-auto">
        {jobs.map((job) => (
          <JobCard key={job.uniqueKey} job={job} />
        ))}
      </div>
    </div>
  );
};
