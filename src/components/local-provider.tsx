"use client";

import { useEffect } from "react";

// import type { Locale } from "../types/!!!local";

type LocaleProviderProps = {
  children: React.ReactNode;
  // locale: Locale;
  locale: "en" | "ua";
};

export default function LocaleProvider({
  children,
  locale,
}: LocaleProviderProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <>{children}</>;
}
