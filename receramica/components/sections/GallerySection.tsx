"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MaximizeIcon } from "@/components/ui/IconButton";
import { CarouselSkeleton } from "@/components/ui/Skeleton";
import { Carousel3D, CarouselPiece } from "@/components/gallery";
import { useUI } from "@/context/UIContext";
import { useCarouselImages, useCriticalImagePrefetch, useImagePrefetch } from "@/hooks";

export function GallerySection() {
  const t = useTranslations("gallery");
  const { openExposition, openPieceModal } = useUI();
  const { images, imageUrls, isLoading, error } = useCarouselImages();

  // Prefetch de imágenes críticas (primeras 5)
  useCriticalImagePrefetch(imageUrls, 5);

  // Prefetch del resto de imágenes con control de concurrencia
  useImagePrefetch(imageUrls);

  const handlePieceClick = (piece: CarouselPiece) => {
    openPieceModal({
      id: piece.id,
      name: piece.name,
      slug: piece.slug || `piece-${piece.id}`,
      year: piece.year || 2025,
      technique: piece.technique,
      dimensions: "",
      description: "",
      description_extended: "",
      images: [{ id: 1, piece_id: piece.id, url: piece.image, alt: piece.name, order: 0, is_main: true }],
      featured: false,
      available: true,
      order: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  };

  return (
    <section
      id="gallery"
      className="bg-bg-clay py-20 md:py-24 lg:py-28 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <SectionTitle
          label={t("label")}
          title={t("title")}
          description={t("subtitle")}
          align="center"
          className="mb-6 md:mb-8"
        />

        {/* Carousel Container */}
        {isLoading ? (
          <div className="h-[380px] sm:h-[480px] md:h-[540px] lg:h-[580px] mb-8 sm:mb-12">
            <CarouselSkeleton />
          </div>
        ) : error ? (
          <div className="h-[380px] sm:h-[480px] md:h-[540px] lg:h-[580px] mb-8 sm:mb-12 flex items-center justify-center">
            <p className="text-text-secondary">{t("errorLoading")}</p>
          </div>
        ) : images.length > 0 ? (
          <Carousel3D
            pieces={images}
            onPieceClick={handlePieceClick}
            autoplay={true}
            autoplayInterval={5000}
          />
        ) : (
          <div className="h-[380px] sm:h-[480px] md:h-[540px] lg:h-[580px] mb-8 sm:mb-12 flex items-center justify-center">
            <p className="text-text-secondary">{t("noImages")}</p>
          </div>
        )}

        {/* Experience Button */}
        <div className="text-center">
          <button
            onClick={openExposition}
            className={cn(
              "inline-flex items-center justify-center gap-3",
              "px-12 py-5 rounded-full",
              "border-2 border-terracotta",
              "text-terracotta font-body text-base font-medium",
              "hover:bg-terracotta/10 transition-colors duration-300",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-bg-clay"
            )}
          >
            <span className="w-5 h-5">
              <MaximizeIcon />
            </span>
            <span>{t("experienceButton")}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
