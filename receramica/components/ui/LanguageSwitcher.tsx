"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "dropdown" | "toggle" | "minimal";
  className?: string;
}

export function LanguageSwitcher({
  variant = "toggle",
  className,
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;

    startTransition(() => {
      // Remove current locale prefix and add new one
      const segments = pathname.split("/");
      if (locales.includes(segments[1] as Locale)) {
        segments[1] = newLocale;
      } else {
        segments.splice(1, 0, newLocale);
      }
      router.replace(segments.join("/") || "/");
    });
  };

  if (variant === "minimal") {
    return (
      <button
        onClick={() => handleLocaleChange(locale === "en" ? "es" : "en")}
        disabled={isPending}
        className={cn(
          "text-text-secondary hover:text-cream transition-colors text-sm font-body uppercase tracking-wider",
          isPending && "opacity-50 cursor-wait",
          className
        )}
        aria-label={`Switch to ${locale === "en" ? "Spanish" : "English"}`}
      >
        {locale === "en" ? "ES" : "EN"}
      </button>
    );
  }

  if (variant === "toggle") {
    return (
      <div
        className={cn(
          "flex items-center gap-1 p-1 rounded-full bg-bg-warm/50 border border-border-subtle",
          className
        )}
      >
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            disabled={isPending}
            className={cn(
              "px-3 py-1.5 text-xs font-body uppercase tracking-wider rounded-full transition-all duration-200",
              locale === loc
                ? "bg-terracotta text-cream"
                : "text-text-secondary hover:text-cream",
              isPending && "opacity-50 cursor-wait"
            )}
            aria-label={`Switch to ${localeNames[loc]}`}
            aria-pressed={locale === loc}
          >
            {loc.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  // Dropdown variant
  return (
    <div className={cn("relative", className)}>
      <select
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value as Locale)}
        disabled={isPending}
        className={cn(
          "appearance-none bg-transparent text-text-secondary hover:text-cream",
          "border border-border-subtle rounded-md px-3 py-2 pr-8",
          "font-body text-sm cursor-pointer transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-terracotta/50",
          isPending && "opacity-50 cursor-wait"
        )}
        aria-label="Select language"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc} className="bg-bg-clay text-cream">
            {localeNames[loc]}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg
          className="h-4 w-4 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
