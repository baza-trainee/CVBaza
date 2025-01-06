import { z } from "zod";

import { Locale } from "@/i18n/routing";

export const authFormSchema = (lang: Locale) =>
  z.object({
    email: z
      .string()
      .email(
        lang === "en"
          ? "Please enter a valid email address"
          : "Будь ласка, введіть дійсну електронну адресу"
      ),
    password: z.string().min(8, {
      message:
        lang === "en"
          ? "Password must be at least 8 characters"
          : "Пароль повинен містити щонайменше 8 символів",
    }),
    name: z.string().optional(),
  });

export const forgotPasswordSchema = (lang: Locale) =>
  z.object({
    email: z
      .string()
      .email(
        lang === "en"
          ? "Please enter a valid email address"
          : "Будь ласка, введіть дійсну електронну адресу"
      ),
  });

export const resetPasswordSchema = (lang: Locale) =>
  z
    .object({
      password: z
        .string()
        .min(
          8,
          lang === "en"
            ? "Password must be at least 8 characters"
            : "Пароль повинен містити щонайменше 8 символів"
        ),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: lang === "en" ? "Passwords don't match" : "Паролі не співпадають",
      path: ["confirmPassword"],
    });

export type AuthFormValues = z.infer<ReturnType<typeof authFormSchema>>;

export type ResetPasswordFormValues = z.infer<ReturnType<typeof resetPasswordSchema>>;

export type ForgotPasswordFormValues = z.infer<ReturnType<typeof forgotPasswordSchema>>;
