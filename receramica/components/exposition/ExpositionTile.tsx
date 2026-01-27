"use client";

import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

export type TileHeight = "small" | "medium" | "large";

interface ExpositionTileProps {
  id: number;
  name: string;
  image: string;
  height: TileHeight;
  onClick: () => void;
  index: number;
  isVisible: boolean;
}

const HEIGHT_CLASSES: Record<TileHeight, string> = {
  small: "h-[200px]",
  medium: "h-[260px]",
  large: "h-[340px]",
};

export function ExpositionTile({
  id,
  name,
  image,
  height,
  onClick,
  index,
  isVisible,
}: ExpositionTileProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full overflow-hidden rounded",
        "group cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
        HEIGHT_CLASSES[height],
        "shadow-[0_4px_16px_rgba(0,0,0,0.25)]",
        "transition-all duration-700 ease-out",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      )}
      style={{
        transitionDelay: `${index * 80}ms`,
      }}
      aria-label={`View ${name}`}
    >
      {/* Image */}
      <OptimizedImage
        src={image}
        alt={name}
        fill
        className={cn(
          "object-cover",
          "transition-transform duration-500 ease-out",
          "group-hover:scale-105"
        )}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Hover Overlay */}
      <div className={cn(
        "absolute inset-0",
        "bg-gradient-to-t from-black/60 via-transparent to-transparent",
        "opacity-0 group-hover:opacity-100",
        "transition-opacity duration-300"
      )}>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className={cn(
            "text-cream font-display text-lg",
            "transform translate-y-4 group-hover:translate-y-0",
            "transition-transform duration-300"
          )}>
            {name}
          </h3>
        </div>
      </div>

      {/* Subtle border glow on hover */}
      <div className={cn(
        "absolute inset-0 rounded",
        "ring-2 ring-terracotta/0 group-hover:ring-terracotta/50",
        "transition-all duration-300"
      )} />
    </button>
  );
}
