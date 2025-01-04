"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icon } from "./icon";
import { SocialAuth } from "./social-auth";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  name: z.string().optional(),
});

interface AuthFormProps {
  type: "signin" | "register";
  lang: "en" | "ua";
}

export function AuthForm({ lang, type }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "register") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          const error = await res.json();
          form.setError("root", {
            message: error.error || "Registration failed",
          });
          return;
        }
      }

      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        const errorMessage =
          result.error === "Configuration"
            ? "Account not found. Please sign up or try a different email."
            : result.error;

        form.setError("root", {
          message: errorMessage,
        });
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      console.error(error);
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Authentication failed",
      });
    }
  }

  return (
    <div className="space-y-6 px-[70px]">
      <SocialAuth />

      <div className="relative">
        <p className="relative flex justify-center text-base font-semibold">
          {type === "register"
            ? lang === "en"
              ? "or register using email"
              : "або зареєструйтесь за допомогою email"
            : lang === "en"
              ? "or use email"
              : "або скористайтеся email"}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 rounded-md p-3 text-small">
          {error === "CredentialsSignin" && "Invalid email or password"}
          {error === "AccessDenied" &&
            (lang === "en"
              ? "This email is registered with email/password. Please sign in with your password."
              : "Помилка авторизації. Будь ласка, увійдіть, використовуючи свій Email та пароль.")}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl
                  className={`rounded-[8px] px-4 py-3 ${form.formState.errors.email ? "text-red-300" : "text-gray-300"}`}
                >
                  <Input
                    placeholder="Email"
                    {...field}
                    className={`hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${form.formState.errors.email ? "border-red-300 bg-red-50 text-red-500 hover:border-red-500 focus:border-red-500" : "border-gray-300 bg-inherit"}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{lang === "en" ? "Password" : "Пароль"}</FormLabel>
                <FormControl>
                  <div className="relative flex items-center rounded-[40px]">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Пароль"
                      {...field}
                      className={`w-full rounded-[8px] border px-4 py-2 hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${form.formState.errors.password ? "border-red-300 bg-red-50 text-red-500 hover:border-red-500 focus:border-red-500" : "border-gray-300 bg-inherit"}`}
                    />
                    <Button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className={`absolute right-4 border-none bg-inherit p-0 hover:bg-inherit ${form.formState.errors.password ? "stroke-red-500 text-red-500" : "stroke-gray-500 text-gray-400"}`}
                    >
                      {showPassword ? (
                        <Icon name="icon-closed" size="24px" />
                      ) : (
                        <Icon name="icon-open" size="24px" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-small text-gray-400">
                  {type === "register" &&
                    (lang === "en"
                      ? "The password must consist of 8 characters and contain numbers and Latin letters"
                      : "Пароль має складатись з 8 символів і містити цифри та латинські літери")}
                </FormMessage>
                {type === "signin" && (
                  <FormControl>
                    <label className="flex items-center gap-2">
                      <Input
                        type="checkbox"
                        className="h-[18px] w-[18px] rounded border-blue-500"
                      />
                      <p className="text-black text-small">
                        {lang === "en"
                          ? "Remember the password"
                          : "Запам'ятати пароль"}
                      </p>
                    </label>
                  </FormControl>
                )}
              </FormItem>
            )}
          />
          {type === "register" && (
            <div>
              {/* <FormField
                control={form.control}
                name="find"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <label className="flex items-center gap-2">
                        <Input
                          type="checkbox"
                          className="h-[18px] w-[18px] rounded border-blue-500 text-blue-600"
                        />
                        <p className="text-black text-small">
                          {lang === "en"
                            ? "I want to receive updates, special offers and promotional emails"
                            : "Я хочу отримувати оновлення, спеціальні пропозиції та рекламні електронні листи"}
                        </p>
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormItem className="mt-5">
                <FormControl>
                  <label className="flex items-center gap-2">
                    <Input
                      type="checkbox"
                      className="h-[18px] w-[18px] rounded border-blue-500 text-blue-600"
                    />
                    <p className="text-black text-small">
                      {lang === "en" ? "I agree with " : "Я погоджуюся з "}

                      <Link
                        href=""
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {lang === "en"
                          ? "Terms of service "
                          : "Умовами надання послуг "}
                      </Link>
                      {lang === "en" ? "and agree with " : "і погоджуюся з "}
                      <Link
                        href=""
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {lang === "en"
                          ? "Privacy policy"
                          : "Політикою конфіденційності"}
                      </Link>
                    </p>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}

          {form.formState.errors.root && (
            <div className="text-red-500 text-sm">
              {form.formState.errors.root.message}
            </div>
          )}
          <Button
            type="submit"
            className="mt-8 w-full rounded-[40px] bg-blue-500 text-white last:mt-8 hover:border-blue-500 hover:bg-blue-700"
          >
            {type === "signin"
              ? lang === "en"
                ? "Sign In"
                : "Увійти"
              : lang === "en"
                ? "Register"
                : "Зареєструватися"}
          </Button>
        </form>
      </Form>
      {type === "signin" ? (
        <div className="mt-8 flex flex-col items-center text-xl">
          <Link href="" className="text-blue-500 hover:text-blue-700">
            {lang === "en" ? "Forgot password" : "Забули пароль"}
          </Link>
          <h4 className="mt-6">
            {lang === "en"
              ? "Don't have an account?"
              : "Не маєте облікового запису?"}
          </h4>
          <Link
            href="register"
            className="mt-3 text-blue-500 hover:border-blue-500 hover:text-blue-700"
          >
            {lang === "en" ? "Register" : "Зареєструватися"}
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center text-xl">
          <h4>
            {lang === "en"
              ? "Already have an account?"
              : "Вже маєте обліковий запис?"}
          </h4>
          <Link
            href="signin"
            className="mt-4 text-blue-500 hover:text-blue-700"
          >
            {lang === "en" ? "Sign in" : "Логін"}
          </Link>
        </div>
      )}
    </div>
  );
}
