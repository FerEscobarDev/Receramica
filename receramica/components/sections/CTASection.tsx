"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useUI } from "@/context/UIContext";

export function CTASection() {
  const t = useTranslations("cta");
  const { openExposition } = useUI();

  const handleContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="contact"
      className="bg-bg-clay py-20 md:py-24 lg:py-28 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-[1440px] mx-auto text-center">
        {/* Title */}
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-cream tracking-wide mb-6 md:mb-8 max-w-2xl mx-auto">
          {t("title")}
        </h2>

        {/* Description */}
        <p className="text-text-secondary font-body text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10 md:mb-12">
          {t("description")}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <Button
            variant="primary"
            size="lg"
            onClick={openExposition}
          >
            {t("viewGallery")}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleContact}
          >
            {t("contactArtist")}
          </Button>
        </div>
      </div>
    </section>
  );
}
