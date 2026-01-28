"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ImageGallery } from "./ImageGallery";
import { PieceInfo } from "./PieceInfo";
import { useUI } from "@/context/UIContext";
import { usePieceDetail } from "@/hooks";

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function PieceModal() {
  const t = useTranslations("modal");
  const { isModalOpen, selectedPiece, closePieceModal } = useUI();
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { piece: fullPieceData, isLoading } = usePieceDetail(
    isModalOpen && selectedPiece ? selectedPiece.id : null
  );

  const piece = fullPieceData || selectedPiece;

  // Animation
  useEffect(() => {
    if (isModalOpen) {
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [isModalOpen]);

  // Close on backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePieceModal();
    }
  }, [closePieceModal]);

  // Keyboard: Escape to close
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePieceModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isModalOpen, closePieceModal]);

  if (!isModalOpen || !piece) return null;

  return (
    <>
      {/* 
        MOBILE MODAL - Completely separate from tablet/desktop
        Uses a simple structure: fixed full-screen container with two sections
      */}
      <div
        className="md:hidden fixed inset-0 z-[60]"
        style={{
          // Force the container to NEVER exceed viewport
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          overflow: 'hidden'
        }}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-[#1A1512]/95 transition-opacity duration-300",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          onClick={closePieceModal}
        />

        {/* Close Button */}
        <button
          onClick={closePieceModal}
          className="absolute top-3 right-3 z-50 w-11 h-11 rounded-full bg-[#1A1512]/90 border-2 border-terracotta flex items-center justify-center text-cream"
          aria-label={t("close")}
        >
          <CloseIcon />
        </button>

        {/* Content Container - Uses absolute with explicit dimensions */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col transition-all duration-300",
            isVisible ? "opacity-100" : "opacity-0 translate-y-4"
          )}
          style={{ overflow: 'hidden' }}
        >
          {/* IMAGE SECTION: Fixed 55% height */}
          <div
            className="relative flex-shrink-0 bg-bg-earth"
            style={{ height: '55%' }}
          >
            <ImageGallery images={piece.images} pieceName={piece.name} variant="mobile" />
          </div>

          {/* CONTENT SECTION: Remaining 45% with scroll */}
          <div
            className="relative flex-1 bg-bg-clay rounded-t-[20px] -mt-5 z-10 flex flex-col"
            style={{
              minHeight: 0,  // Critical for flex overflow
              overflow: 'hidden'
            }}
          >
            {/* Scroll handle */}
            <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
              <div className="w-9 h-1 rounded-full bg-terracotta" />
            </div>

            {/* Scrollable Area */}
            <div
              className="flex-1 px-4 pb-4"
              style={{
                minHeight: 0,
                overflowY: 'auto',
                overflowX: 'hidden'
              }}
            >
              <PieceInfo piece={piece} isLoading={isLoading} variant="mobile" />
            </div>
          </div>
        </div>
      </div>

      {/* 
        TABLET MODAL (md to lg)
      */}
      <div
        ref={modalRef}
        onClick={handleBackdropClick}
        className={cn(
          "hidden md:flex lg:hidden fixed inset-0 z-[60] items-center justify-center",
          "transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        style={{ overflow: 'hidden' }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#1A1512]/95" />

        {/* Modal Card */}
        <div
          className={cn(
            "relative z-10 bg-bg-clay rounded-2xl border border-[#4A4035]/25 shadow-2xl",
            "flex flex-col",
            "transition-all duration-300",
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
          style={{
            width: 'calc(100vw - 32px)',
            maxWidth: '768px',
            height: '90vh',
            maxHeight: '900px',
            overflow: 'hidden'
          }}
        >
          {/* Close Button */}
          <button
            onClick={closePieceModal}
            className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-[#1A1512]/90 border-2 border-terracotta flex items-center justify-center text-cream hover:text-white transition-colors"
            aria-label={t("close")}
          >
            <CloseIcon />
          </button>

          {/* Image Section */}
          <div className="flex-shrink-0 p-6 pb-0" style={{ height: '50%' }}>
            <ImageGallery images={piece.images} pieceName={piece.name} variant="tablet" />
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 pt-4" style={{ minHeight: 0, overflow: 'hidden' }}>
            <PieceInfo piece={piece} isLoading={isLoading} variant="tablet" />
          </div>
        </div>
      </div>

      {/* 
        DESKTOP MODAL (lg and up)
      */}
      <div
        onClick={handleBackdropClick}
        className={cn(
          "hidden lg:flex fixed inset-0 z-[60] items-center justify-center",
          "transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        style={{ overflow: 'hidden' }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#1A1512]/95" />

        {/* Modal Card */}
        <div
          className={cn(
            "relative z-10 bg-bg-clay rounded-2xl border border-[#4A4035]/25 shadow-2xl",
            "flex flex-row p-10 gap-10",
            "transition-all duration-300",
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          )}
          style={{
            width: '1280px',
            maxWidth: 'calc(100vw - 64px)',
            height: '780px',
            maxHeight: 'calc(100vh - 80px)',
            overflow: 'hidden'
          }}
        >
          {/* Close Button */}
          <button
            onClick={closePieceModal}
            className="absolute top-4 right-4 z-30 w-14 h-14 rounded-full bg-[#1A1512]/90 border-2 border-terracotta flex items-center justify-center text-cream hover:text-white transition-colors"
            aria-label={t("close")}
          >
            <CloseIcon />
          </button>

          {/* Left: Image Gallery */}
          <div className="w-[420px] flex-shrink-0 h-full">
            <ImageGallery images={piece.images} pieceName={piece.name} variant="desktop" />
          </div>

          {/* Right: Piece Info */}
          <div className="flex-1 h-full" style={{ minWidth: 0, overflow: 'hidden' }}>
            <PieceInfo piece={piece} isLoading={isLoading} variant="desktop" />
          </div>
        </div>
      </div>
    </>
  );
}
