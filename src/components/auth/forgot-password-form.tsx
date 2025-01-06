"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Locale, useRouter } from "@/i18n/routing";

import { ForgotPasswordFormValues, forgotPasswordSchema } from "./schema";

interface ForgotPasswordFormProps {
  lang: Locale;
}

export function ForgotPasswordForm({ lang }: ForgotPasswordFormProps) {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema(lang)),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || lang === "en" ? "Failed to process request" : "Помилка при обробці запиту"
        );
      }

      setSuccess(true);
      // Redirect to login page after successful submission
      setTimeout(() => {
        router.push("/signin");
      }, 3000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : lang === "en"
            ? "Failed to process request"
            : "Помилка при обробці запиту"
      );
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-[600px] p-[50px]">
          <CardHeader className="mb-8 p-0">
            <CardTitle className="text-center text-2xl font-semibold">
              {lang === "en" ? "Check Your Email" : "Перевірте свою електронну пошту"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 px-[70px] text-center">
            <p>
              {lang === "en"
                ? "If an account exists for this email, you will receive password reset instructions."
                : "Якщо обліковий запис існує для цієї електронної адреси, ви отримаєте інструкції щодо скидання пароля."}
            </p>
            <p className="mt-4">
              {lang === "en"
                ? "Redirecting to login page..."
                : "Перенаправлення на сторінку входу..."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-[600px] p-[50px]">
        <CardHeader className="mb-8 p-0">
          <CardTitle className="text-center text-2xl font-semibold">
            {lang === "en" ? "Forgot Password?" : "Забули пароль?"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 px-[70px]">
          {error && <div className="mb-4 rounded-md bg-red-50 p-4 text-red-600">{error}</div>}

          <p className="mb-6 text-center">
            {lang === "en"
              ? "Enter your email address and we'll send you instructions to reset your password."
              : "Введіть свою електронну адресу, і ми надішлемо вам інструкції щодо скидання пароля."}
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="my-6 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-normal">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Email"
                        {...field}
                        className={`hover:border-blue-500 focus:border-blue-500 focus:outline-blue-500 ${
                          form.formState.errors.email
                            ? "border-red-300 bg-red-50 text-red-500 hover:border-red-500 focus:border-red-500 focus:outline-red-500"
                            : "border-black-200 bg-inherit"
                        }`}
                      />
                    </FormControl>
                    <FormMessage className="mt-1 pl-1 text-[12px] text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-2 w-full rounded-[40px] bg-blue-500 text-white hover:border-blue-600 hover:bg-blue-600 focus:border-blue-600 focus:bg-blue-600"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? lang === "en"
                    ? "Processing..."
                    : "Обробка..."
                  : lang === "en"
                    ? "Send Instructions"
                    : "Надіслати інструкції"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
