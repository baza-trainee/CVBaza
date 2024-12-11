"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const email = searchParams.get("email");
  const t = useTranslations("Auth");

  if (!error) return null;

  const errorMessages: Record<string, string> = {
    OAuthAccountNotLinked:
      "This email is already associated with a different provider.",
    UseCredentials: `This email (${email}) is registered with email/password. Please sign in with your password.`,
    CredentialsSignin: "Invalid email or password.",
    UserNotFound:
      "No account found with this email. Please check your email or register.",
    InvalidCredentials: "Invalid password. Please try again.",
    EmailExists: t("errors.emailExists"),
    default: t("errors.default"),
  };

  const errorMessage = errorMessages[error] || errorMessages.default;

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="ml-2">{errorMessage}</AlertDescription>
    </Alert>
  );
}
