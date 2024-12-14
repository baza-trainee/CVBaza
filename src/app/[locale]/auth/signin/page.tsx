import { AuthError } from "@/components/auth/auth-error";
import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AuthError />
          <AuthForm type="signin" />
        </CardContent>
      </Card>
    </div>
  );
}
