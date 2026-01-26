"use client";

import { cn } from "@/lib/utils";

interface CarouselDotsProps {
  total: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
  className?: string;
}

export function CarouselDots({
  total,
  currentIndex,
  onDotClick,
  className,
}: CarouselDotsProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3", className)}
      role="tablist"
      aria-label="Carousel navigation"
    >
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={cn(
            "rounded-full transition-all duration-300",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-bg-clay",
            index === currentIndex
              ? "w-3 h-3 bg-terracotta scale-100"
              : "w-2 h-2 bg-text-muted hover:bg-text-secondary hover:scale-110"
          )}
          role="tab"
          aria-selected={index === currentIndex}
          aria-label={`Go to slide ${index + 1} of ${total}`}
          tabIndex={index === currentIndex ? 0 : -1}
        />
      ))}
    </div>
  );
}
