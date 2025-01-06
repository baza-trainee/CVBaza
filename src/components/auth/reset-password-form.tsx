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

import { ResetPasswordFormValues, resetPasswordSchema } from "./schema";

interface ResetPasswordFormProps {
  token: string;
  lang: Locale;
}

export function ResetPasswordForm({ token, lang }: ResetPasswordFormProps) {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema(lang)),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || (lang === "en" ? "Failed to reset password" : "Помилка при зміні паролю")
        );
      }

      setSuccess(true);
      // Redirect to login page after successful password reset
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : lang === "en"
            ? "Failed to reset password"
            : "Помилка при зміні паролю"
      );
    }
  };

  if (success) {
    return (
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">
          {lang === "en" ? "Password Reset Successful" : "Пароль успішно змінено"}
        </h1>
        <p>
          {lang === "en" ? "Redirecting to login page..." : "Перенаправлено на сторінку входу..."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-[600px] p-[50px]">
        <CardHeader className="mb-8 p-0">
          <CardTitle className="text-center text-2xl font-semibold">
            {lang === "en" ? "Reset Your Password" : "Скинути пароль"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="px-[70px]">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-small text-red-500">{error}</div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="my-6 flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-normal">
                        {lang === "en" ? "New Password" : "Новий пароль"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={
                            lang === "en" ? "Enter your new password" : "Введіть новий пароль"
                          }
                          {...field}
                          className={`rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${
                            form.formState.errors.password
                              ? "border-red-300 bg-red-50 text-red-500"
                              : ""
                          }`}
                        />
                      </FormControl>
                      <FormMessage className="mt-1 pl-1 text-[12px] text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-normal">
                        {lang === "en" ? "Confirm Password" : "Підтвердіть пароль"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={
                            lang === "en" ? "Confirm your new password" : "Підтвердіть новий пароль"
                          }
                          {...field}
                          className={`rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${
                            form.formState.errors.confirmPassword
                              ? "border-red-300 bg-red-50 text-red-500"
                              : ""
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
                      ? "Reset Password"
                      : "Змінити пароль"}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
