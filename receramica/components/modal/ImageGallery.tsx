"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { PieceImage } from "@/types";

interface ImageGalleryProps {
  images: PieceImage[];
  pieceName: string;
  variant?: "mobile" | "tablet" | "desktop";
}

// Chevron icons matching design: 16x16
function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// Swipe arrows icon for mobile hint
function SwipeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 8 4 4-4 4" />
      <path d="m6 8-4 4 4 4" />
      <path d="M2 12h20" />
    </svg>
  );
}

export function ImageGallery({ images, pieceName, variant = "desktop" }: ImageGalleryProps) {
  const t = useTranslations("modal");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Touch handlers for swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && images.length > 1) {
      goToNext();
    }
    if (isRightSwipe && images.length > 1) {
      goToPrev();
    }
  };

  const currentImage = images[currentIndex];

  if (!images.length) {
    return (
      <div className="w-full h-full bg-bg-earth flex items-center justify-center rounded-xl">
        <span className="text-text-muted text-sm">No images available</span>
      </div>
    );
  }

  // Mobile variant: Full-width image with swipe and dot indicators
  if (variant === "mobile") {
    return (
      <div className="relative w-full h-full">
        {/* Main Image with touch support */}
        <div
          ref={containerRef}
          className="w-full h-full"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <OptimizedImage
            src={currentImage.url}
            alt={currentImage.alt || pieceName}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Swipe hint - positioned on left side */}
        {images.length > 1 && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <div className="flex items-center gap-1.5 bg-[#1A1512]/60 backdrop-blur-sm px-2.5 py-1.5 rounded-lg">
              <SwipeIcon />
              <span className="text-cream text-xs font-medium">Desliza</span>
            </div>
          </div>
        )}

        {/* Image counter badge */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <span className="inline-flex items-center justify-center min-w-[45px] bg-[#1A1512]/80 backdrop-blur-sm px-3 py-1.5 rounded-xl text-cream text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}

        {/* Dot indicators at bottom */}
        {images.length > 1 && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
            <div className="flex items-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    index === currentIndex
                      ? "bg-terracotta w-6"
                      : "bg-cream/40 hover:bg-cream/60"
                  )}
                  aria-label={`Ver imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Tablet variant: Similar to desktop but optimized for touch
  if (variant === "tablet") {
    return (
      <div className="flex flex-col h-full gap-3">
        {/* Main Image Container */}
        <div
          className="relative flex-1 min-h-0 rounded-xl overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden border border-[#4A4035]/25">
            <OptimizedImage
              src={currentImage.url}
              alt={currentImage.alt || pieceName}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 720px"
              priority
            />
          </div>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <span className="inline-flex items-center justify-center min-w-[50px] bg-[#1A1512]/80 px-3.5 py-2 rounded-2xl text-cream text-[15px] font-normal">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>

        {/* Thumbnails Container - 4 visible with navigation */}
        {images.length > 1 && (
          <div className="flex items-center gap-2 h-16">
            {/* Nav Left Button */}
            <button
              onClick={goToPrev}
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-full",
                "bg-bg-clay/50 border border-terracotta",
                "flex items-center justify-center",
                "text-cream active:bg-bg-clay/80",
                "transition-all duration-200"
              )}
              aria-label="Imagen anterior"
            >
              <ChevronLeftIcon />
            </button>

            {/* Thumbnails Row - show 4 max */}
            <div className="flex-1 flex gap-2 justify-center items-center overflow-hidden">
              {images.slice(0, 4).map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => goToIndex(index)}
                  className={cn(
                    "relative flex-shrink-0 w-12 h-14 rounded-md overflow-hidden",
                    "transition-all duration-200",
                    index === currentIndex
                      ? "ring-2 ring-terracotta"
                      : "ring-1 ring-[#4A4035]/25"
                  )}
                  aria-label={`Ver imagen ${index + 1}`}
                >
                  <OptimizedImage
                    src={image.url}
                    alt={image.alt || `${pieceName} - ${index + 1}`}
                    fill
                    className={cn(
                      "object-cover transition-opacity duration-200",
                      index === currentIndex ? "opacity-100" : "opacity-70"
                    )}
                    sizes="48px"
                  />
                </button>
              ))}
              {images.length > 4 && (
                <span className="text-text-muted text-sm">+{images.length - 4}</span>
              )}
            </div>

            {/* Nav Right Button */}
            <button
              onClick={goToNext}
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-full",
                "bg-bg-clay/50 border border-terracotta",
                "flex items-center justify-center",
                "text-cream active:bg-bg-clay/80",
                "transition-all duration-200"
              )}
              aria-label="Siguiente imagen"
            >
              <ChevronRightIcon />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Desktop variant: Original layout with thumbnails
  return (
    <div className="flex flex-col h-full gap-3">
      {/* Main Image Container - per design: height 580px, cornerRadius 12, transparent bg */}
      <div className="relative flex-1 min-h-0 rounded-xl overflow-hidden">
        {/* Main Image - per design: cornerRadius 12, border #4A403540 */}
        <div className="relative w-full h-full rounded-xl overflow-hidden border border-[#4A4035]/25">
          <OptimizedImage
            src={currentImage.url}
            alt={currentImage.alt || pieceName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 420px"
            priority
          />
        </div>

        {/* Image counter - per design: width 50px, cornerRadius 16, bg #1A1512CC, fontSize 15 */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <span className="inline-flex items-center justify-center min-w-[50px] bg-[#1A1512]/80 px-3.5 py-2 rounded-2xl text-cream text-[15px] font-normal">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails Container - per design: height 80px, gap 8, alignItems center */}
      {images.length > 1 && (
        <div className="flex items-center gap-2 h-20">
          {/* Nav Left Button - per design: 32x32px, cornerRadius 16, bg #2A241F80, stroke terracotta 1px */}
          <button
            onClick={goToPrev}
            className={cn(
              "flex-shrink-0 w-8 h-8 rounded-full",
              "bg-bg-clay/50 border border-terracotta",
              "flex items-center justify-center",
              "text-cream hover:bg-bg-clay/80",
              "transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            )}
            aria-label="Previous image"
          >
            <ChevronLeftIcon />
          </button>

          {/* Thumbnails Row - per design: gap 8, justifyContent center, height 72 */}
          <div className="flex-1 flex gap-2 justify-center items-center overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToIndex(index)}
                className={cn(
                  "relative flex-shrink-0 w-10 h-[72px] rounded-md overflow-hidden",
                  "transition-all duration-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
                  index === currentIndex
                    ? "ring-2 ring-terracotta"
                    : "ring-1 ring-[#4A4035]/25 hover:ring-text-muted/50"
                )}
                aria-label={`View image ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              >
                <OptimizedImage
                  src={image.url}
                  alt={image.alt || `${pieceName} - ${index + 1}`}
                  fill
                  className={cn(
                    "object-cover transition-opacity duration-200",
                    index === currentIndex ? "opacity-100" : "opacity-70 hover:opacity-100"
                  )}
                  sizes="40px"
                />
              </button>
            ))}
          </div>

          {/* Nav Right Button - per design: 32x32px, cornerRadius 16, bg #2A241F80, stroke terracotta 1px */}
          <button
            onClick={goToNext}
            className={cn(
              "flex-shrink-0 w-8 h-8 rounded-full",
              "bg-bg-clay/50 border border-terracotta",
              "flex items-center justify-center",
              "text-cream hover:bg-bg-clay/80",
              "transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            )}
            aria-label="Next image"
          >
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </div>
  );
}
