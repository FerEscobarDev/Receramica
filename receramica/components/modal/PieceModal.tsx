"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { CloseIcon } from "@/components/ui/IconButton";
import { ImageGallery } from "./ImageGallery";
import { PieceInfo } from "./PieceInfo";
import { useUI } from "@/context/UIContext";

export function PieceModal() {
  const t = useTranslations("modal");
  const { isModalOpen, selectedPiece, closePieceModal } = useUI();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle animation states
  useEffect(() => {
    if (isModalOpen) {
      setIsAnimating(true);
      // Delay content animation for entrance effect
      const timer = setTimeout(() => {
        setIsContentVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsContentVisible(false);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  // Handle click outside to close
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      closePieceModal();
    }
  }, [closePieceModal]);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePieceModal();
      }

      // Tab trap
      if (e.key === "Tab") {
        const focusableElements = contentRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Focus the close button when modal opens
    const closeButton = contentRef.current?.querySelector('[data-close-button]') as HTMLElement;
    closeButton?.focus();

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closePieceModal]);

  if (!isAnimating && !isModalOpen) {
    return null;
  }

  if (!selectedPiece) {
    return null;
  }

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className={cn(
        "fixed inset-0 z-[60]",
        "flex items-center justify-center",
        "p-4 md:p-8",
        "transition-opacity duration-300",
        isModalOpen ? "opacity-100" : "opacity-0"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/80 backdrop-blur-sm",
          "transition-opacity duration-300",
          isModalOpen ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        ref={contentRef}
        className={cn(
          "relative z-10",
          "w-full max-w-5xl max-h-[90vh]",
          "bg-bg-warm rounded-2xl overflow-hidden",
          "shadow-2xl",
          "transition-all duration-400 ease-out",
          isContentVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        )}
      >
        {/* Close button */}
        <button
          data-close-button
          onClick={closePieceModal}
          className={cn(
            "absolute top-4 right-4 z-20",
            "w-10 h-10 rounded-full",
            "bg-bg-earth/80 backdrop-blur-sm",
            "flex items-center justify-center",
            "text-cream/80 hover:text-cream",
            "hover:bg-bg-earth",
            "transition-all duration-200",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
          )}
          aria-label={t("close")}
        >
          <CloseIcon />
        </button>

        {/* Modal body - 2 columns on desktop */}
        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          {/* Left column - Image gallery */}
          <div className="md:w-1/2 p-6 md:p-8 bg-bg-clay/50">
            <div className="h-[300px] md:h-full">
              <ImageGallery
                images={selectedPiece.images}
                pieceName={selectedPiece.name}
              />
            </div>
          </div>

          {/* Right column - Piece info */}
          <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[400px] md:max-h-none">
            <PieceInfo piece={selectedPiece} />
          </div>
        </div>
      </div>
    </div>
  );
}
