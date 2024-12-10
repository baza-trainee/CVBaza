"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const t = useTranslations("Auth");

  if (!error) return null;

  const errorMessages: Record<string, string> = {
    OAuthAccountNotLinked: t("errors.oauthAccountNotLinked"),
    EmailExists: t("errors.emailExists"),
    default: t("errors.default"),
  };

  const errorMessage = errorMessages[error] || errorMessages.default;

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
}
