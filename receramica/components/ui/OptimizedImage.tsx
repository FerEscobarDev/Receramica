"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

// Blur placeholder base64 - un degradado cálido que combina con la paleta
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIRAAAgIBAwUBAAAAAAAAAAAAAQIDBAAFESEGEhMxQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAACAQMhMf/aAAwDAQACEQMRAD8AzdOprNWvBFqEUhuRRhZHjBCO4HJUb8bntxnPxjGVSpY+T//Z";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  quality?: number;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  onLoad?: () => void;
  onClick?: () => void;
  showSkeleton?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  containerClassName,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  objectFit = "cover",
  onLoad,
  onClick,
  showSkeleton = true,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  // Fallback para errores de imagen
  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-bg-warm",
          fill ? "absolute inset-0" : "",
          containerClassName
        )}
        style={!fill ? { width, height } : undefined}
      >
        <div className="text-center p-4">
          <svg
            className="w-8 h-8 mx-auto text-text-muted mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs text-text-muted">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        fill ? "absolute inset-0" : "",
        containerClassName
      )}
      style={!fill ? { width, height } : undefined}
      onClick={onClick}
    >
      {/* Skeleton loader */}
      {isLoading && showSkeleton && (
        <div
          className={cn(
            "absolute inset-0 bg-bg-warm animate-pulse",
            "after:absolute after:inset-0",
            "after:bg-gradient-to-r after:from-transparent after:via-bg-clay/30 after:to-transparent",
            "after:animate-shimmer"
          )}
        />
      )}

      <Image
        src={src}
        alt={alt}
        {...(fill
          ? { fill: true }
          : { width: width || 400, height: height || 400 })}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className={cn(
          "transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100",
          objectFit === "cover" && "object-cover",
          objectFit === "contain" && "object-contain",
          objectFit === "fill" && "object-fill",
          onClick && "cursor-pointer",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

// Versión para el carrusel con efectos 3D
interface Carousel3DImageProps extends OptimizedImageProps {
  position: "far-left" | "left" | "center" | "right" | "far-right";
  isActive?: boolean;
}

export function Carousel3DImage({
  position,
  isActive = false,
  className,
  ...props
}: Carousel3DImageProps) {
  const positionStyles = {
    "far-left": "opacity-40 scale-75 -translate-x-[60%] z-10",
    "left": "opacity-70 scale-85 -translate-x-[30%] z-20",
    "center": "opacity-100 scale-100 translate-x-0 z-30",
    "right": "opacity-70 scale-85 translate-x-[30%] z-20",
    "far-right": "opacity-40 scale-75 translate-x-[60%] z-10",
  };

  return (
    <div
      className={cn(
        "absolute transition-all duration-500 ease-out",
        positionStyles[position],
        isActive && "ring-2 ring-terracotta",
        className
      )}
    >
      <OptimizedImage {...props} />
    </div>
  );
}

// Versión para tiles de la exposición
interface ExpositionTileImageProps extends Omit<OptimizedImageProps, "fill"> {
  aspectRatio?: "square" | "portrait" | "landscape";
}

export function ExpositionTileImage({
  aspectRatio = "portrait",
  className,
  containerClassName,
  ...props
}: ExpositionTileImageProps) {
  const aspectStyles = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        aspectStyles[aspectRatio],
        containerClassName
      )}
    >
      <OptimizedImage
        {...props}
        fill
        className={cn(
          "transition-transform duration-700 group-hover:scale-110",
          className
        )}
      />
    </div>
  );
}
