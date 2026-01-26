"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { IconButton, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/IconButton";
import type { PieceImage } from "@/types";

interface ImageGalleryProps {
  images: PieceImage[];
  pieceName: string;
}

export function ImageGallery({ images, pieceName }: ImageGalleryProps) {
  const t = useTranslations("modal");
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const currentImage = images[currentIndex];

  if (!images.length) {
    return (
      <div className="w-full h-full bg-bg-clay flex items-center justify-center rounded-lg">
        <span className="text-text-muted">No images available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Main Image */}
      <div className="relative flex-1 min-h-0 bg-bg-earth rounded-lg overflow-hidden">
        <OptimizedImage
          src={currentImage.url}
          alt={currentImage.alt || pieceName}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {/* Navigation arrows (only show if multiple images) */}
        {images.length > 1 && (
          <>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <IconButton
                icon={<ChevronLeftIcon />}
                label="Previous image"
                onClick={goToPrev}
                size="md"
                className="bg-bg-earth/80 backdrop-blur-sm hover:bg-bg-earth"
              />
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
              <IconButton
                icon={<ChevronRightIcon />}
                label="Next image"
                onClick={goToNext}
                size="md"
                className="bg-bg-earth/80 backdrop-blur-sm hover:bg-bg-earth"
              />
            </div>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <span className="bg-bg-earth/80 backdrop-blur-sm px-4 py-2 rounded-full text-cream text-sm">
              {t("imageCounter", { current: currentIndex + 1, total: images.length })}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails (only show if multiple images) */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-text-muted/50">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => goToIndex(index)}
              className={cn(
                "relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden",
                "ring-2 transition-all duration-200",
                "focus:outline-none focus-visible:ring-terracotta",
                index === currentIndex
                  ? "ring-terracotta"
                  : "ring-transparent hover:ring-text-muted/50"
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
                  index === currentIndex ? "opacity-100" : "opacity-60 hover:opacity-100"
                )}
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
