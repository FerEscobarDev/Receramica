"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { CloseIcon } from "@/components/ui/IconButton";
import { ExpositionGrid } from "./ExpositionGrid";
import { useUI } from "@/context/UIContext";
import type { Piece } from "@/types";

// Demo pieces for exposition
const DEMO_PIECES: Piece[] = [
  {
    id: 1,
    name: "Vasija del Fénix",
    slug: "vasija-fenix",
    year: 2024,
    technique: "Cerámica esmaltada",
    dimensions: "45 x 30 cm",
    description: "Pieza única inspirada en el renacimiento",
    images: [{ id: 1, piece_id: 1, url: "/Images/barro.jpg", alt: "Vasija del Fénix", order: 0, is_main: true }],
    featured: true,
    available: true,
    order: 0,
    created_at: "",
    updated_at: "",
  },
  {
    id: 2,
    name: "Espiral Terracota",
    slug: "espiral-terracota",
    year: 2024,
    technique: "Gres terracota",
    dimensions: "35 x 25 cm",
    description: "Exploración del movimiento en arcilla",
    images: [{ id: 2, piece_id: 2, url: "/Images/tecnica.jpg", alt: "Espiral Terracota", order: 0, is_main: true }],
    featured: true,
    available: true,
    order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: 3,
    name: "Manganorhythmus",
    slug: "manganorhythmus",
    year: 2024,
    technique: "Cerámica con óxidos",
    dimensions: "50 x 40 cm",
    description: "Ritmos visuales en manganeso",
    images: [{ id: 3, piece_id: 3, url: "/Images/taller.jpg", alt: "Manganorhythmus", order: 0, is_main: true }],
    featured: false,
    available: true,
    order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: 4,
    name: "Aurora Cerámica",
    slug: "aurora-ceramica",
    year: 2023,
    technique: "Porcelana",
    dimensions: "30 x 20 cm",
    description: "Luz capturada en porcelana",
    images: [{ id: 4, piece_id: 4, url: "/Images/barro.jpg", alt: "Aurora Cerámica", order: 0, is_main: true }],
    featured: true,
    available: true,
    order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: 5,
    name: "Ondas del Tiempo",
    slug: "ondas-tiempo",
    year: 2023,
    technique: "Gres esmaltado",
    dimensions: "40 x 35 cm",
    description: "La fluidez del tiempo",
    images: [{ id: 5, piece_id: 5, url: "/Images/tecnica.jpg", alt: "Ondas del Tiempo", order: 0, is_main: true }],
    featured: false,
    available: true,
    order: 4,
    created_at: "",
    updated_at: "",
  },
  {
    id: 6,
    name: "Tierra Viva",
    slug: "tierra-viva",
    year: 2023,
    technique: "Cerámica rústica",
    dimensions: "55 x 45 cm",
    description: "Conexión con la tierra",
    images: [{ id: 6, piece_id: 6, url: "/Images/taller.jpg", alt: "Tierra Viva", order: 0, is_main: true }],
    featured: false,
    available: true,
    order: 5,
    created_at: "",
    updated_at: "",
  },
  {
    id: 7,
    name: "Eco del Fuego",
    slug: "eco-fuego",
    year: 2024,
    technique: "Rakú",
    dimensions: "38 x 28 cm",
    description: "Memorias del horno",
    images: [{ id: 7, piece_id: 7, url: "/Images/barro.jpg", alt: "Eco del Fuego", order: 0, is_main: true }],
    featured: true,
    available: true,
    order: 6,
    created_at: "",
    updated_at: "",
  },
  {
    id: 8,
    name: "Susurros de Arcilla",
    slug: "susurros-arcilla",
    year: 2023,
    technique: "Cerámica fina",
    dimensions: "25 x 20 cm",
    description: "La voz silenciosa del barro",
    images: [{ id: 8, piece_id: 8, url: "/Images/tecnica.jpg", alt: "Susurros de Arcilla", order: 0, is_main: true }],
    featured: false,
    available: true,
    order: 7,
    created_at: "",
    updated_at: "",
  },
  {
    id: 9,
    name: "Horizonte Dorado",
    slug: "horizonte-dorado",
    year: 2024,
    technique: "Cerámica con lustre",
    dimensions: "42 x 32 cm",
    description: "Reflejos del atardecer",
    images: [{ id: 9, piece_id: 9, url: "/Images/taller.jpg", alt: "Horizonte Dorado", order: 0, is_main: true }],
    featured: true,
    available: true,
    order: 8,
    created_at: "",
    updated_at: "",
  },
];

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
  const [pieces, setPieces] = useState<Piece[]>([]);

  // Load pieces when exposition opens
  useEffect(() => {
    if (isExpositionOpen) {
      // In production, fetch from API
      setPieces(DEMO_PIECES);
    }
  }, [isExpositionOpen]);

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

      {/* Header with title and close button */}
      <header
        className={cn(
          "relative z-10",
          "flex items-center justify-between",
          "px-6 md:px-12 py-6",
          "transition-all duration-700",
          isContentVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-8"
        )}
      >
        {/* Title */}
        <div className="flex flex-col">
          <span className="text-terracotta text-sm font-body tracking-widest uppercase mb-1">
            {t("label")}
          </span>
          <h1 className="text-cream font-display text-3xl md:text-4xl lg:text-5xl font-light">
            {t("title")}
          </h1>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className={cn(
            "flex items-center gap-3",
            "px-6 py-3 rounded-full",
            "border border-text-muted/30",
            "text-cream/80 hover:text-cream",
            "hover:border-terracotta/50 hover:bg-terracotta/10",
            "transition-all duration-300",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          )}
          aria-label={t("close")}
        >
          <span className="text-sm font-body hidden sm:inline">
            {t("enterSite")}
          </span>
          <CloseIcon />
        </button>
      </header>

      {/* Subtitle */}
      <div
        className={cn(
          "relative z-10 px-6 md:px-12 pb-6",
          "transition-all duration-700 delay-100",
          isContentVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4"
        )}
      >
        <p className="text-text-secondary font-body text-lg max-w-2xl">
          {t("subtitle")}
        </p>
      </div>

      {/* Grid of pieces */}
      <div className="relative z-10 flex-1 overflow-hidden">
        <ExpositionGrid
          pieces={pieces}
          onPieceClick={handlePieceClick}
          isVisible={isContentVisible}
        />
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
          "transition-all duration-700 delay-500",
          isContentVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="text-text-muted text-xs font-body tracking-wider uppercase">
          {t("scroll")}
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-terracotta to-transparent animate-pulse-subtle" />
      </div>
    </div>
  );
}
