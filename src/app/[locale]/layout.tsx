import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { LocaleProvider } from "@/components/locale-provider";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { routing } from "@/i18n/routing";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Baza CV Builder",
  description: "Baza CV Builder",
};
type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: "ua" | "en" }>;
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const session = await auth();
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  const messages = await getMessages({ locale });
  return (
    <LocaleProvider locale={locale}>
      <SessionProvider session={session}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </SessionProvider>
    </LocaleProvider>
  );
}
