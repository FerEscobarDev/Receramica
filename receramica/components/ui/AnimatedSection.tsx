"use client";

import { type ElementType, type ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

type AnimationType = "fade-up" | "fade-left" | "fade-right" | "scale";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  className?: string;
  delay?: number;
  threshold?: number;
  as?: ElementType;
}

const animationClasses: Record<AnimationType, string> = {
  "fade-up": "scroll-animate",
  "fade-left": "scroll-animate-left",
  "fade-right": "scroll-animate-right",
  scale: "scroll-animate-scale",
};

export function AnimatedSection({
  children,
  animation = "fade-up",
  className,
  delay = 0,
  threshold = 0.1,
  as = "div",
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold });
  const Component = as;

  return (
    <Component
      ref={ref}
      className={cn(
        animationClasses[animation],
        isVisible && "visible",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}
