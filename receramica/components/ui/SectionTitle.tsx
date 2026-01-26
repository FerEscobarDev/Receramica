import { cn } from "@/lib/utils";

interface SectionTitleProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg";
  className?: string;
  labelClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const alignStyles = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
};

const titleSizeStyles = {
  sm: "text-3xl md:text-4xl",
  md: "text-4xl md:text-5xl",
  lg: "text-5xl md:text-6xl lg:text-7xl",
};

export function SectionTitle({
  label,
  title,
  description,
  align = "center",
  size = "md",
  className,
  labelClassName,
  titleClassName,
  descriptionClassName,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:gap-5",
        alignStyles[align],
        className
      )}
    >
      {label && (
        <span
          className={cn(
            "text-terracotta font-body text-xs font-medium tracking-[0.25em] uppercase",
            labelClassName
          )}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          "font-display font-normal text-cream tracking-wide",
          titleSizeStyles[size],
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-text-secondary font-body text-base md:text-lg leading-relaxed max-w-2xl",
            align === "center" && "mx-auto",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
