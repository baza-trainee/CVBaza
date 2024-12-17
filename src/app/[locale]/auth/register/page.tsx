import { AuthForm } from "@/components/auth/auth-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Locale = "en" | "ua"

type PageProps = {
  params: { locale: Locale }
}

export default function RegisterPage({ params }: PageProps) {
  const { locale } = params

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-[600px] p-[50px]">
        <CardHeader className="p-0 mb-12">
          <CardTitle className="text-center text-2xl font-semibold">
            {locale === "en" ? "Create an account" : "Створіть обліковий запис"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <AuthForm lang={locale} type="register" />
        </CardContent>
      </Card>
    </div>
  )
}


}
