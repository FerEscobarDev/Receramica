import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface FeatureCardProps {
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ title, description, index }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "p-6 md:p-8 rounded-lg",
        "bg-bg-warm border border-border-subtle",
        "transition-all duration-300",
        "hover:border-terracotta/50 hover:shadow-lg"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <h3 className="font-display text-xl md:text-2xl text-cream mb-4">
        {title}
      </h3>
      <p className="text-text-secondary font-body text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function InnovationSection() {
  const t = useTranslations("innovation");

  const features = [
    {
      key: "resilience",
      title: t("features.resilience.title"),
      description: t("features.resilience.description"),
    },
    {
      key: "emotion",
      title: t("features.emotion.title"),
      description: t("features.emotion.description"),
    },
    {
      key: "originality",
      title: t("features.originality.title"),
      description: t("features.originality.description"),
    },
  ];

  return (
    <section
      id="innovation"
      className="bg-bg-clay py-20 md:py-24 lg:py-28 px-6 md:px-12 lg:px-20"
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.key}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
