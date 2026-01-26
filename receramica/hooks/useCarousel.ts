"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { CAROUSEL_CONFIG } from "@/lib/constants";

interface UseCarouselOptions {
  totalItems: number;
  autoplay?: boolean;
  autoplayInterval?: number;
  loop?: boolean;
  swipeThreshold?: number;
}

interface UseCarouselReturn {
  currentIndex: number;
  isAnimating: boolean;
  isDragging: boolean;
  dragOffset: number;
  goToNext: () => void;
  goToPrev: () => void;
  goToIndex: (index: number) => void;
  pauseAutoplay: () => void;
  resumeAutoplay: () => void;
  handleTouchStart: (e: React.TouchEvent | React.MouseEvent) => void;
  handleTouchMove: (e: React.TouchEvent | React.MouseEvent) => void;
  handleTouchEnd: () => void;
}

export function useCarousel({
  totalItems,
  autoplay = true,
  autoplayInterval = CAROUSEL_CONFIG.autoplayInterval,
  loop = true,
  swipeThreshold = 50,
}: UseCarouselOptions): UseCarouselReturn {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<number | null>(null);
  const touchStartTimeRef = useRef<number>(0);

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

  // Touch/swipe handlers
  const getClientX = (e: React.TouchEvent | React.MouseEvent): number => {
    if ("touches" in e) {
      return e.touches[0]?.clientX ?? 0;
    }
    return e.clientX;
  };

  const handleTouchStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    touchStartRef.current = getClientX(e);
    touchStartTimeRef.current = Date.now();
    setIsDragging(true);
    setIsPaused(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (touchStartRef.current === null) return;

    const currentX = getClientX(e);
    const diff = currentX - touchStartRef.current;
    setDragOffset(diff);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartRef.current === null) return;

    const timeDiff = Date.now() - touchStartTimeRef.current;
    const velocity = Math.abs(dragOffset) / timeDiff;

    // Trigger swipe if threshold exceeded or velocity is high enough
    if (Math.abs(dragOffset) > swipeThreshold || velocity > 0.5) {
      if (dragOffset > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }

    touchStartRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
    setIsPaused(false);
  }, [dragOffset, goToNext, goToPrev, swipeThreshold]);

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  return {
    currentIndex,
    isAnimating,
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
  };
}
