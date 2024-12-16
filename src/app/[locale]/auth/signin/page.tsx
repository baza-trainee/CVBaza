import { AuthError } from "@/components/auth/auth-error";
import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage({ params }: { params: { locale: "en" | "ua" } }) {
  const {locale}=params
  return (
    <div className="flex min-h-screen items-center justify-center">
     <Card className="w-full max-w-[600px] p-[50px] " >
        <CardHeader className="p-0 mb-12">
          <CardTitle className="text-center text-2xl font-semibold">
            {locale === "en" ? "Sign in to your account" : "Увійдіть у свій обліковий запис"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <AuthError />
          <AuthForm lang={locale } type="signin" />
        </CardContent>
      </Card>
    </div>
  );
}
