"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { CAROUSEL_CONFIG } from "@/lib/constants";

interface UseCarouselOptions {
  totalItems: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  loop?: boolean;
}

interface UseCarouselReturn {
  currentIndex: number;
  isAnimating: boolean;
  goToNext: () => void;
  goToPrev: () => void;
  goToIndex: (index: number) => void;
  pauseAutoplay: () => void;
  resumeAutoplay: () => void;
}

export function useCarousel({
  totalItems,
  autoplay = true,
  autoplayInterval = CAROUSEL_CONFIG.autoplayInterval,
  loop = true,
}: UseCarouselOptions): UseCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToIndex = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return;

      setIsAnimating(true);

      let targetIndex = index;
      if (loop) {
        if (index < 0) {
          targetIndex = totalItems - 1;
        } else if (index >= totalItems) {
          targetIndex = 0;
        }
      } else {
        targetIndex = Math.max(0, Math.min(index, totalItems - 1));
      }

      setCurrentIndex(targetIndex);

      setTimeout(() => {
        setIsAnimating(false);
      }, CAROUSEL_CONFIG.transitionDuration);
    },
    [currentIndex, isAnimating, loop, totalItems]
  );

  const goToNext = useCallback(() => {
    goToIndex(currentIndex + 1);
  }, [currentIndex, goToIndex]);

  const goToPrev = useCallback(() => {
    goToIndex(currentIndex - 1);
  }, [currentIndex, goToIndex]);

  const pauseAutoplay = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeAutoplay = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Autoplay logic
  useEffect(() => {
    if (!autoplay || isPaused || totalItems <= 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      goToNext();
    }, autoplayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, autoplayInterval, goToNext, isPaused, totalItems]);

  return {
    currentIndex,
    isAnimating,
    goToNext,
    goToPrev,
    goToIndex,
    pauseAutoplay,
    resumeAutoplay,
  };
}
