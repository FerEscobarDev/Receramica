"use client";

import { useCarousel } from "@/hooks/useCarousel";
import { cn } from "@/lib/utils";
import { IconButton, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/IconButton";
import { CarouselSlide, SlidePosition } from "./CarouselSlide";
import { CarouselDots } from "./CarouselDots";
import type { CarouselPiece } from "@/types";

export type { CarouselPiece };

interface Carousel3DProps {
  pieces: CarouselPiece[];
  onPieceClick?: (piece: CarouselPiece) => void;
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}

export function Carousel3D({
  pieces,
  onPieceClick,
  autoplay = true,
  autoplayInterval = 5000,
  className,
}: Carousel3DProps) {
  const {
    currentIndex,
    isDragging,
    dragOffset,
    goToNext,
    goToPrev,
    goToIndex,
    pauseAutoplay,
    resumeAutoplay,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useCarousel({
    totalItems: pieces.length,
    autoplay,
    autoplayInterval,
    swipeThreshold: 50,
  });

  const getSlidePosition = (index: number): SlidePosition => {
    const diff = index - currentIndex;
    const total = pieces.length;

    // Handle wrapping for circular carousel
    let normalizedDiff = diff;
    if (diff > total / 2) normalizedDiff = diff - total;
    if (diff < -total / 2) normalizedDiff = diff + total;

    switch (normalizedDiff) {
      case -2: return "far-left";
      case -1: return "left";
      case 0: return "center";
      case 1: return "right";
      case 2: return "far-right";
      default: return "hidden";
    }
  };

  const currentPiece = pieces[currentIndex];

  return (
    <div className={cn("relative", className)}>
      {/* Main Carousel Container */}
      <div
        className="relative h-[380px] sm:h-[480px] md:h-[540px] lg:h-[580px] mb-8 sm:mb-12 select-none overflow-hidden"
        onMouseEnter={pauseAutoplay}
        onMouseLeave={() => {
          if (isDragging) handleTouchEnd();
          resumeAutoplay();
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={isDragging ? handleTouchMove : undefined}
        onMouseUp={handleTouchEnd}
      >
        {/* Navigation Arrow - Left */}
        <div className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-40">
          <IconButton
            icon={<ChevronLeftIcon />}
            label="Previous slide"
            onClick={goToPrev}
            size="lg"
            className="bg-bg-earth/60 backdrop-blur-sm hover:bg-bg-earth/80"
          />
        </div>

        {/* Navigation Arrow - Right */}
        <div className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-40">
          <IconButton
            icon={<ChevronRightIcon />}
            label="Next slide"
            onClick={goToNext}
            size="lg"
            className="bg-bg-earth/60 backdrop-blur-sm hover:bg-bg-earth/80"
          />
        </div>

        {/* Depth Background Effect */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center bottom, rgba(26,21,18,0.9) 0%, transparent 70%)",
          }}
        />

        {/* Carousel Slides */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            isDragging && "cursor-grabbing"
          )}
        >
          {pieces.map((piece, index) => (
            <CarouselSlide
              key={piece.id}
              id={piece.id}
              name={piece.name}
              image={piece.image}
              position={getSlidePosition(index)}
              isDragging={isDragging}
              dragOffset={dragOffset}
              onClick={() => goToIndex(index)}
              onPieceClick={() => onPieceClick?.(piece)}
            />
          ))}
        </div>
      </div>

      {/* Piece Info */}
      {currentPiece && (
        <div
          className="text-center mb-8"
          key={currentPiece.id}
        >
          <h3
            className={cn(
              "font-display text-2xl md:text-3xl text-cream mb-2",
              "animate-fade-in"
            )}
          >
            {currentPiece.name}
          </h3>
          <p className="text-text-secondary font-body text-sm animate-fade-in animation-delay-100">
            {currentPiece.year || 2025} · {currentPiece.technique}
          </p>
        </div>
      )}

      {/* Dots Navigation */}
      <CarouselDots
        total={pieces.length}
        currentIndex={currentIndex}
        onDotClick={goToIndex}
        className="mb-10"
      />
    </div>
  );
}
