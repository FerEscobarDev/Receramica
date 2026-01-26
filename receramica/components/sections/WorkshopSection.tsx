import { useTranslations } from "next-intl";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function WorkshopSection() {
  const t = useTranslations("workshop");

  return (
    <section
      id="workshop"
      className="bg-bg-earth py-20 md:py-24 lg:py-28 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 space-y-6 md:space-y-8">
            {/* Label */}
            <span className="text-terracotta font-body text-xs font-medium tracking-[0.25em] uppercase">
              {t("label")}
            </span>

            {/* Title */}
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-cream tracking-wide">
              {t("title")}
            </h2>

            {/* Descriptions */}
            <div className="space-y-6">
              <p className="text-text-secondary font-body text-base md:text-lg leading-relaxed">
                {t("description1")}
              </p>
              <p className="text-text-secondary font-body text-base md:text-lg leading-relaxed">
                {t("description2")}
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/3] max-w-lg mx-auto lg:max-w-none rounded-lg overflow-hidden border border-border-subtle">
              <Image
                src="/Images/taller.jpg"
                alt="El Taller de Ricardo Escobar"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 w-32 h-32 border-2 border-terracotta/30 rounded-lg -z-10 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
