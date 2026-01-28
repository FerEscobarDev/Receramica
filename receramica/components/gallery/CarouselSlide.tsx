"use client";

import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

export type SlidePosition = "far-left" | "left" | "center" | "right" | "far-right" | "hidden";

interface CarouselSlideProps {
  id: number;
  name: string;
  image: string;
  position: SlidePosition;
  isDragging: boolean;
  dragOffset: number;
  onClick: () => void;
  onPieceClick?: () => void;
}

// Responsive dimensions: [mobile, tablet, desktop]
interface ResponsiveDimensions {
  transform: string;
  transformMobile: string;
  opacity: number;
  zIndex: number;
  width: { mobile: string; tablet: string; desktop: string };
  height: { mobile: string; tablet: string; desktop: string };
}

const POSITION_STYLES: Record<Exclude<SlidePosition, "hidden">, ResponsiveDimensions> = {
  "far-left": {
    transform: "translateX(-180%) scale(0.5)",
    transformMobile: "translateX(-140%) scale(0.5)",
    opacity: 0.4,
    zIndex: 10,
    width: { mobile: "100px", tablet: "160px", desktop: "200px" },
    height: { mobile: "140px", tablet: "220px", desktop: "280px" },
  },
  "left": {
    transform: "translateX(-100%) scale(0.7)",
    transformMobile: "translateX(-75%) scale(0.7)",
    opacity: 0.7,
    zIndex: 20,
    width: { mobile: "140px", tablet: "220px", desktop: "280px" },
    height: { mobile: "190px", tablet: "300px", desktop: "380px" },
  },
  "center": {
    transform: "translateX(0) scale(1)",
    transformMobile: "translateX(0) scale(1)",
    opacity: 1,
    zIndex: 30,
    width: { mobile: "220px", tablet: "320px", desktop: "400px" },
    height: { mobile: "300px", tablet: "420px", desktop: "500px" },
  },
  "right": {
    transform: "translateX(100%) scale(0.7)",
    transformMobile: "translateX(75%) scale(0.7)",
    opacity: 0.7,
    zIndex: 20,
    width: { mobile: "140px", tablet: "220px", desktop: "280px" },
    height: { mobile: "190px", tablet: "300px", desktop: "380px" },
  },
  "far-right": {
    transform: "translateX(180%) scale(0.5)",
    transformMobile: "translateX(140%) scale(0.5)",
    opacity: 0.4,
    zIndex: 10,
    width: { mobile: "100px", tablet: "160px", desktop: "200px" },
    height: { mobile: "140px", tablet: "220px", desktop: "280px" },
  },
};

export function CarouselSlide({
  id,
  name,
  image,
  position,
  isDragging,
  dragOffset,
  onClick,
  onPieceClick,
}: CarouselSlideProps) {
  if (position === "hidden") return null;

  const style = POSITION_STYLES[position];
  const isCenter = position === "center";

  // Calculate drag-adjusted transform for center slide
  const dragTransform = isCenter && isDragging
    ? `translateX(${dragOffset * 0.3}px) scale(1)`
    : undefined;

  // Generate unique ID for CSS custom properties
  const slideId = `slide-${id}-${position}`;

  return (
    <>
      {/* Responsive styles using CSS custom properties */}
      <style jsx>{`
        .${slideId} {
          --slide-width: ${style.width.mobile};
          --slide-height: ${style.height.mobile};
          --slide-transform: ${style.transformMobile};
        }
        @media (min-width: 640px) {
          .${slideId} {
            --slide-width: ${style.width.tablet};
            --slide-height: ${style.height.tablet};
            --slide-transform: ${style.transform};
          }
        }
        @media (min-width: 1024px) {
          .${slideId} {
            --slide-width: ${style.width.desktop};
            --slide-height: ${style.height.desktop};
            --slide-transform: ${style.transform};
          }
        }
      `}</style>
      <div
        className={cn(
          slideId,
          "absolute rounded-xl overflow-hidden",
          "transition-all ease-out",
          isDragging ? "duration-0" : "duration-500",
          "shadow-xl hover:shadow-2xl",
          isCenter && "ring-2 ring-terracotta cursor-pointer",
          !isCenter && "cursor-pointer"
        )}
        style={{
          transform: dragTransform || "var(--slide-transform)",
          opacity: style.opacity,
          zIndex: style.zIndex,
          width: "var(--slide-width)",
          height: "var(--slide-height)",
          boxShadow: isCenter
            ? "0 35px 70px rgba(0,0,0,0.5)"
            : "0 20px 40px rgba(0,0,0,0.4)",
        }}
        onClick={isCenter ? onPieceClick : onClick}
        role="button"
        aria-label={isCenter ? `View ${name}` : `Go to ${name}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            isCenter ? onPieceClick?.() : onClick();
          }
        }}
      >
      {/* Image */}
      <OptimizedImage
        src={image}
        alt={name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 320px, 400px"
        priority={isCenter}
      />

      {/* Hover overlay for center slide */}
      {isCenter && (
        <div className={cn(
          "absolute inset-0 bg-black/0 hover:bg-black/20",
          "transition-colors duration-300",
          "flex items-center justify-center"
        )}>
          <div className={cn(
            "opacity-0 hover:opacity-100",
            "transition-opacity duration-300",
            "bg-bg-earth/80 backdrop-blur-sm",
            "px-4 py-2 rounded-full",
            "text-cream text-sm font-body"
          )}>
            Ver detalle
          </div>
        </div>
      )}
      </div>
    </>
  );
}
