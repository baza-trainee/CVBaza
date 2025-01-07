"use client";

import { signIn } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export const AuthCard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = (provider: string) => {
    setIsLoading(true);

    signIn(provider).then(() => {
      setIsLoading(false);
    });
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex w-full max-w-sm flex-col px-8 py-10">
      <CardTitle className="pb-1">Sign in</CardTitle>
      <CardDescription className="pb-8">Sign in to continue</CardDescription>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4 space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            Sign in
          </Button>
        </form>
      </Form>

      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <Button
          variant="outline"
          className="space-x-4 px-10"
          disabled={isLoading}
          onClick={() => handleSignIn("google")}
        >
          <span className="text-xs sm:text-sm">Continue with Google</span>
        </Button>
        <Button
          variant="outline"
          className="space-x-4 px-10"
          disabled={isLoading}
          onClick={() => handleSignIn("github")}
        >
          <span className="text-xs sm:text-sm">Continue with GitHub</span>
        </Button>
      </div>
    </Card>
  );
};
