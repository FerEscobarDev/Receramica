"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className={cn(
        "relative min-h-screen flex items-center justify-center",
        "gradient-radial-dark",
        "px-6 md:px-12 lg:px-20 py-32"
      )}
    >
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Subtitle */}
        <p className="text-terracotta font-body text-xs md:text-sm font-medium tracking-[0.4em] uppercase mb-6 md:mb-8 animate-fade-in">
          {t("subtitle")}
        </p>

        {/* Main Title */}
        <h1
          className={cn(
            "font-display text-6xl sm:text-7xl md:text-8xl lg:text-[120px]",
            "font-light text-cream tracking-wide",
            "mb-8 md:mb-10",
            "animate-fade-in-up"
          )}
          style={{ animationDelay: "100ms" }}
        >
          {t("title")}
        </h1>

        {/* Decorative Line */}
        <div
          className="w-24 md:w-32 h-px bg-terracotta mx-auto mb-8 md:mb-10 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        />

        {/* Description */}
        <p
          className={cn(
            "font-display text-lg md:text-xl lg:text-2xl",
            "text-text-secondary",
            "max-w-xl mx-auto leading-relaxed",
            "animate-fade-in-up"
          )}
          style={{ animationDelay: "300ms" }}
        >
          {t("description")}
        </p>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-text-muted rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
