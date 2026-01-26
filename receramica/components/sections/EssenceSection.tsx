import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface MaterialCardProps {
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  index: number;
}

function MaterialCard({
  title,
  description,
  gradientFrom,
  gradientTo,
  borderColor,
  index,
}: MaterialCardProps) {
  return (
    <div
      className="flex flex-col items-center text-center space-y-4"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Circle */}
      <div
        className={cn(
          "w-24 h-24 md:w-28 md:h-28 rounded-full",
          "border-2 transition-transform duration-300 hover:scale-110"
        )}
        style={{
          background: `radial-gradient(circle, ${gradientFrom} 0%, ${gradientTo} 100%)`,
          borderColor: borderColor,
        }}
      />

      {/* Title */}
      <h3 className="font-display text-xl md:text-2xl text-cream">
        {title}
      </h3>

      {/* Description */}
      <p className="text-text-secondary font-body text-sm leading-relaxed max-w-[280px]">
        {description}
      </p>
    </div>
  );
}

export function EssenceSection() {
  const t = useTranslations("essence");

  const materials = [
    {
      key: "clay",
      title: t("materials.clay.title"),
      description: t("materials.clay.description"),
      gradientFrom: "#8B7A6D",
      gradientTo: "#5A4F45",
      borderColor: "#C9725A", // terracotta
    },
    {
      key: "glazes",
      title: t("materials.glazes.title"),
      description: t("materials.glazes.description"),
      gradientFrom: "#C9725A",
      gradientTo: "#8B4D3A",
      borderColor: "#B8956D", // gold-earth
    },
    {
      key: "alchemy",
      title: t("materials.alchemy.title"),
      description: t("materials.alchemy.description"),
      gradientFrom: "#B8956D",
      gradientTo: "#7A6A5D",
      borderColor: "#E8DFD5", // cream
    },
  ];

  return (
    <section
      id="essence"
      className="gradient-linear-essence py-20 md:py-24 lg:py-28 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <SectionTitle
          label={t("label")}
          title={t("title")}
          description={t("description")}
          align="center"
          className="mb-12 md:mb-16 max-w-3xl mx-auto"
        />

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          {materials.map((material, index) => (
            <MaterialCard
              key={material.key}
              title={material.title}
              description={material.description}
              gradientFrom={material.gradientFrom}
              gradientTo={material.gradientTo}
              borderColor={material.borderColor}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
