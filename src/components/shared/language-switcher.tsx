"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: "en", label: "EN" },
  { code: "ua", label: "UA" },
];

export const LanguageSwitcher = ({
  variant = "default",
}: {
  variant?: "default" | "mobile";
}) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = pathname;
    const newPath = currentPath.replace(`/${locale}/`, `/${newLocale}/`);
    router.push(newPath);
  };

  if (variant === "mobile") {
    return (
      <div className="flex gap-4">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`text-xl font-semibold ${
              locale === lang.code
                ? "text-white"
                : "text-white/60 hover:text-white/80"
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[70px] border-none bg-transparent hover:bg-blue-100/50">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
