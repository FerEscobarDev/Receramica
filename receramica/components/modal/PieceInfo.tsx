"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { Piece } from "@/types";

interface PieceInfoProps {
  piece: Piece;
}

// WhatsApp icon component
function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function PieceInfo({ piece }: PieceInfoProps) {
  const t = useTranslations("modal");
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // Check if description is scrollable
  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      const isScrollable = el.scrollHeight > el.clientHeight;
      setShowScrollIndicator(isScrollable);
    }
  }, [piece.description_extended]);

  // Handle scroll to hide indicator
  const handleScroll = () => {
    const el = descriptionRef.current;
    if (el) {
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
      setShowScrollIndicator(!isAtBottom);
    }
  };

  // Generate WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the piece "${piece.name}" (${piece.year}). Could you share availability and pricing details?`
  );
  const whatsappNumber = "573001234567"; // Replace with actual number
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-6">
        <span className="text-terracotta text-xs font-body tracking-widest uppercase">
          {t("uniquePiece")}
        </span>
        <h2 className="text-cream font-display text-3xl md:text-4xl font-light mt-2">
          {piece.name}
        </h2>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-text-muted/20">
        <div>
          <span className="text-text-muted text-xs uppercase tracking-wider">Year</span>
          <p className="text-cream font-body mt-1">{piece.year}</p>
        </div>
        <div>
          <span className="text-text-muted text-xs uppercase tracking-wider">Technique</span>
          <p className="text-cream font-body mt-1">{piece.technique}</p>
        </div>
        {piece.dimensions && (
          <div className="col-span-2">
            <span className="text-text-muted text-xs uppercase tracking-wider">Dimensions</span>
            <p className="text-cream font-body mt-1">{piece.dimensions}</p>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="flex-1 min-h-0 relative mb-6">
        <span className="text-terracotta text-xs font-body tracking-widest uppercase block mb-3">
          {t("description")}
        </span>
        <div
          ref={descriptionRef}
          onScroll={handleScroll}
          className={cn(
            "overflow-y-auto pr-4 max-h-[200px] md:max-h-full",
            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-text-muted/30"
          )}
        >
          <p className="text-text-secondary font-body leading-relaxed whitespace-pre-line">
            {piece.description_extended || piece.description || "No description available."}
          </p>
        </div>

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <div className="absolute bottom-0 left-0 right-4 h-12 pointer-events-none bg-gradient-to-t from-bg-warm to-transparent flex items-end justify-center pb-2">
            <span className="text-text-muted text-xs animate-pulse-subtle">
              {t("scrollMore")}
            </span>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="mt-auto pt-6 border-t border-text-muted/20">
        <p className="text-text-secondary text-sm mb-4">
          {t("interested")}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center justify-center gap-3",
            "w-full px-10 py-4",
            "bg-terracotta text-cream",
            "font-body font-medium tracking-wide text-base",
            "rounded transition-all duration-200",
            "hover:bg-terracotta-dark",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-warm"
          )}
        >
          <WhatsAppIcon />
          {t("whatsappButton")}
        </a>
      </div>
    </div>
  );
}
