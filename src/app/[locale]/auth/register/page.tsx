import { AuthForm } from "@/components/auth/auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AuthForm type="register" />
        </CardContent>
      </Card>
    </div>
  );
}
