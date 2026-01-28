"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { Piece } from "@/types";

interface PieceInfoProps {
  piece: Piece;
  isLoading?: boolean;
  variant?: "mobile" | "tablet" | "desktop";
}

// Message circle icon for WhatsApp - per design: 22x22
function MessageCircleIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

// Chevrons down icon for scroll indicator - per design: 16x16
function ChevronsDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7 6 5 5 5-5" />
      <path d="m7 13 5 5 5-5" />
    </svg>
  );
}

export function PieceInfo({ piece, isLoading = false, variant = "desktop" }: PieceInfoProps) {
  const t = useTranslations("modal");
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      const checkScrollable = () => {
        const isScrollable = el.scrollHeight > el.clientHeight;
        const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
        setShowScrollIndicator(isScrollable && !isAtBottom);
      };
      checkScrollable();
      // Re-check after content loads
      const timer = setTimeout(checkScrollable, 100);
      return () => clearTimeout(timer);
    }
  }, [piece.description_extended, isLoading]);

  const handleScroll = () => {
    const el = descriptionRef.current;
    if (el) {
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
      setShowScrollIndicator(!isAtBottom);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hola! Estoy interesado en la pieza "${piece.name}" (${piece.year}). ¿Podrían compartirme información sobre disponibilidad y precio?`
  );
  const whatsappNumber = "573001234567";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Mobile variant: Simple content flow - parent handles scroll
  if (variant === "mobile") {
    return (
      <div>
        {/* Header */}
        <div className="pb-3">
          <span className="text-terracotta text-[11px] font-semibold tracking-[1.5px] uppercase block">
            {t("uniquePiece")}
          </span>
          <h2 id="modal-title" className="text-cream font-display text-xl font-normal mt-1.5 leading-tight">
            {piece.name}
          </h2>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap text-sm">
            <span className="text-text-secondary">{piece.year}</span>
            <span className="w-1 h-1 rounded-full bg-text-muted" />
            <span className="text-text-secondary">{piece.technique}</span>
            {piece.dimensions && (
              <>
                <span className="w-1 h-1 rounded-full bg-text-muted" />
                <span className="text-text-secondary">{piece.dimensions}</span>
              </>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#4A4035]/25" />

        {/* Description */}
        <div className="py-3">
          <span className="text-terracotta text-[10px] font-semibold tracking-[2px] uppercase block mb-2">
            {t("description")}
          </span>
          {isLoading ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-3 bg-text-muted/20 rounded w-full" />
              <div className="h-3 bg-text-muted/20 rounded w-11/12" />
            </div>
          ) : (
            <p className="text-text-secondary text-sm leading-relaxed">
              {piece.description_extended || piece.description || "No description available."}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-[#4A4035]/25" />

        {/* CTA */}
        <div className="pt-3 pb-2">
          <p className="text-text-secondary text-xs text-center mb-2">
            {t("interested")}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[#25D366] text-white font-semibold text-sm rounded-lg active:bg-[#1DA851]"
          >
            <MessageCircleIcon size={20} />
            {t("whatsappButton")}
          </a>
        </div>
      </div>
    );
  }

  // Tablet variant: Balanced layout
  if (variant === "tablet") {
    return (
      <div className="flex flex-col h-full gap-4">
        {/* Header Section */}
        <div className="flex-shrink-0">
          <span className="text-terracotta text-xs font-semibold tracking-[2px] uppercase block">
            {t("uniquePiece")}
          </span>

          <h2
            id="modal-title"
            className="text-cream font-display text-2xl font-normal mt-2 leading-tight"
          >
            {piece.name}
          </h2>

          <div className="flex items-center gap-4 mt-2 flex-wrap">
            <span className="text-text-secondary text-sm">{piece.year}</span>
            <span className="w-1 h-1 rounded-full bg-text-muted" aria-hidden="true" />
            <span className="text-text-secondary text-sm">{piece.technique}</span>
            {piece.dimensions && (
              <>
                <span className="w-1 h-1 rounded-full bg-text-muted" aria-hidden="true" />
                <span className="text-text-secondary text-sm">{piece.dimensions}</span>
              </>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#4A4035]/25 flex-shrink-0" />

        {/* Scroll indicator bar */}
        <div className="flex justify-center flex-shrink-0">
          <div className="w-12 h-1 rounded-full bg-terracotta" />
        </div>

        {/* Description - Scrollable with limited height */}
        <div className="flex-1 min-h-0 flex flex-col gap-2 overflow-hidden">
          <span className="text-terracotta text-[11px] font-semibold tracking-[2px] uppercase flex-shrink-0">
            {t("description")}
          </span>

          <div
            ref={descriptionRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-text-muted/30"
          >
            {isLoading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-3 bg-text-muted/20 rounded w-full" />
                <div className="h-3 bg-text-muted/20 rounded w-11/12" />
                <div className="h-3 bg-text-muted/20 rounded w-10/12" />
                <div className="h-3 bg-text-muted/20 rounded w-full" />
              </div>
            ) : (
              <p className="text-text-secondary text-[14px] leading-[1.6]">
                {piece.description_extended || piece.description || "No description available."}
              </p>
            )}
          </div>

          {/* Scroll indicator */}
          {showScrollIndicator && !isLoading && (
            <div className="flex items-center justify-center gap-2 pt-1 text-text-muted flex-shrink-0">
              <ChevronsDownIcon />
              <span className="text-xs">{t("scrollMore")}</span>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="flex-shrink-0 pt-3 border-t border-[#4A4035]/25">
          <div className="flex flex-col items-center gap-2">
            <p className="text-text-secondary text-sm text-center">
              {t("interested")}
            </p>

            {/* Full-width WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center justify-center gap-3 w-full",
                "px-8 py-4",
                "bg-[#25D366] text-white",
                "font-semibold text-[15px]",
                "rounded-lg transition-all duration-200",
                "hover:bg-[#1DA851]"
              )}
            >
              <MessageCircleIcon />
              {t("whatsappButton")}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Desktop variant: Original layout
  return (
    <div className="flex flex-col h-full gap-5">
      {/* Info Header - per design: gap 10 */}
      <div className="flex-shrink-0">
        {/* Label - per design: fontSize 13, fontWeight 500, letterSpacing 4, terracotta */}
        <span className="text-terracotta text-[13px] font-medium tracking-[4px] uppercase block">
          {t("uniquePiece")}
        </span>

        {/* Title - per design: fontSize 40, Cormorant Garamond, cream */}
        <h2
          id="modal-title"
          className="text-cream font-display text-3xl md:text-[40px] font-normal mt-2.5 leading-tight"
        >
          {piece.name}
        </h2>

        {/* Metadata row - per design: horizontal with dot separators, gap 16, fontSize 15 */}
        <div className="flex items-center gap-4 mt-2.5 flex-wrap">
          <span className="text-text-secondary text-[15px]">{piece.year}</span>
          <span className="w-1 h-1 rounded-full bg-text-muted" aria-hidden="true" />
          <span className="text-text-secondary text-[15px]">{piece.technique}</span>
          {piece.dimensions && (
            <>
              <span className="w-1 h-1 rounded-full bg-text-muted" aria-hidden="true" />
              <span className="text-text-secondary text-[15px]">{piece.dimensions}</span>
            </>
          )}
        </div>
      </div>

      {/* Divider - per design: #4A403540, height 1 */}
      <div className="h-px bg-[#4A4035]/25 flex-shrink-0" />

      {/* Description Container - per design: clip true, gap 12, flex-1 */}
      <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden relative">
        {/* Description Label - per design: fontSize 12, fontWeight 500, letterSpacing 3 */}
        <span className="text-terracotta text-xs font-medium tracking-[3px] uppercase flex-shrink-0">
          {t("description")}
        </span>

        {/* Description Scroll Area - per design: clip true, gap 12 */}
        <div
          ref={descriptionRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-text-muted/30"
        >
          {isLoading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-text-muted/20 rounded w-full" />
              <div className="h-4 bg-text-muted/20 rounded w-11/12" />
              <div className="h-4 bg-text-muted/20 rounded w-10/12" />
              <div className="h-4 bg-text-muted/20 rounded w-full" />
              <div className="h-4 bg-text-muted/20 rounded w-9/12" />
            </div>
          ) : (
            <p className="text-text-secondary text-[15px] leading-[1.7] whitespace-pre-line">
              {piece.description_extended || piece.description || "No description available."}
            </p>
          )}
        </div>

        {/* Scroll Indicator - per design: padding-top 8, gap 8, centered, fontSize 12, text-muted */}
        {showScrollIndicator && !isLoading && (
          <div className="flex items-center justify-center gap-2 pt-2 text-text-muted flex-shrink-0">
            <ChevronsDownIcon />
            <span className="text-xs">{t("scrollMore")}</span>
          </div>
        )}
      </div>

      {/* CTA Section - per design: gap 16, padding-top 16 */}
      <div className="flex-shrink-0 pt-4 border-t border-[#4A4035]/25">
        {/* CTA Content - per design: gap 12, padding-top 12, alignItems center */}
        <div className="flex flex-col items-center gap-3 pt-3">
          {/* CTA Text - per design: fontSize 15, textAlign center, text-secondary */}
          <p className="text-text-secondary text-[15px] text-center">
            {t("interested")}
          </p>

          {/* WhatsApp Button - per design: #25D366, cornerRadius 8, padding [16, 32], gap 12, auto width */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center gap-3",
              "px-8 py-4",
              "bg-[#25D366] text-white",
              "font-semibold text-[15px]",
              "rounded-lg transition-all duration-200",
              "hover:bg-[#1DA851]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-clay"
            )}
          >
            <MessageCircleIcon />
            {t("whatsappButton")}
          </a>
        </div>
      </div>
    </div>
  );
}

