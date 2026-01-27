"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { CloseIcon } from "@/components/ui/IconButton";
import { ExpositionGrid } from "./ExpositionGrid";
import { useUI } from "@/context/UIContext";
import { usePieces } from "@/hooks";
import type { Piece, PieceSummary } from "@/types";

export function ExpositionFullscreen() {
  const t = useTranslations("exposition");
  const {
    isExpositionOpen,
    closeExposition,
    markExpositionAsSeen,
    openPieceModal,
  } = useUI();

  const [isAnimating, setIsAnimating] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const { pieces: pieceSummaries, isLoading } = usePieces();

  // Transformar PieceSummary a Piece para ExpositionGrid
  const pieces: Piece[] = pieceSummaries.map((summary: PieceSummary) => ({
    id: summary.id,
    name: summary.name,
    slug: summary.slug,
    year: summary.year || 2025,
    technique: summary.technique,
    dimensions: "",
    description: "",
    description_extended: "",
    images: [{
      id: 1,
      piece_id: summary.id,
      url: summary.main_image,
      alt: summary.name,
      order: 0,
      is_main: true,
    }],
    featured: summary.featured,
    available: true,
    order: 0,
    created_at: "",
    updated_at: "",
  }));

  // Handle animation states
  useEffect(() => {
    if (isExpositionOpen) {
      setIsAnimating(true);
      // Delay content animation for entrance effect
      const timer = setTimeout(() => {
        setIsContentVisible(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setIsContentVisible(false);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isExpositionOpen]);

  const handleClose = useCallback(() => {
    closeExposition();
    markExpositionAsSeen();
  }, [closeExposition, markExpositionAsSeen]);

  const handlePieceClick = useCallback((piece: Piece) => {
    openPieceModal(piece);
  }, [openPieceModal]);

  if (!isAnimating && !isExpositionOpen) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        "flex flex-col",
        "transition-opacity duration-500",
        isExpositionOpen ? "opacity-100" : "opacity-0"
      )}
      role="dialog"
      aria-modal="true"
      aria-label={t("title")}
    >
      {/* Background with radial gradient */}
      <div
        className={cn(
          "absolute inset-0",
          "transition-transform duration-700 ease-out",
          isExpositionOpen ? "scale-100" : "scale-95"
        )}
        style={{
          background: "radial-gradient(ellipse at center 20%, #2A241F 0%, #1A1512 60%, #0D0B09 100%)",
        }}
      />

      {/* Overlay gradient for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(26,21,18,0.4) 100%)",
        }}
      />

      {/* Title Overlay - Absolute positioned */}
      <div
        className={cn(
          "absolute top-7 left-7 z-30",
          "flex flex-col",
          "px-4 py-3 rounded-lg",
          "bg-black/30 backdrop-blur-sm",
          "transition-all duration-700",
          isContentVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-8"
        )}
      >
        <span className="text-terracotta text-[10px] font-body tracking-[3px] uppercase">
          {t("label")}
        </span>
        <h1 className="text-cream font-display text-[28px] font-light leading-tight">
          {t("title")}
        </h1>
      </div>

      {/* Close Button - Circular, absolute positioned */}
      <button
        onClick={handleClose}
        className={cn(
          "absolute top-7 right-7 z-30",
          "flex items-center justify-center",
          "w-7 h-7 rounded-full",
          "bg-black/50 backdrop-blur-sm border border-terracotta",
          "text-cream hover:text-cream",
          "hover:bg-terracotta/20",
          "transition-all duration-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta",
          "shadow-[0_4px_12px_rgba(0,0,0,0.25)]",
          isContentVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-8"
        )}
        aria-label={t("close")}
      >
        <CloseIcon />
      </button>

      {/* Grid of pieces */}
      <div className="relative z-10 flex-1 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-text-secondary">
              {t("loading")}
            </div>
          </div>
        ) : (
          <ExpositionGrid
            pieces={pieces}
            onPieceClick={handlePieceClick}
            isVisible={isContentVisible}
          />
        )}
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20"
        style={{
          background: "linear-gradient(to top, rgba(13,11,9,0.9) 0%, transparent 100%)",
        }}
      />

      {/* Scroll indicator */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 z-30",
          "flex flex-col items-center gap-2",
          "px-6 py-3",
          "transition-all duration-700 delay-500",
          isContentVisible ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, transparent 70%)",
        }}
      >
        <span className="text-cream/80 text-xs font-body tracking-wider uppercase">
          {t("scroll")}
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-terracotta to-transparent animate-pulse-subtle" />
      </div>
    </div>
  );
}
