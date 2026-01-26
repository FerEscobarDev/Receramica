"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MaximizeIcon } from "@/components/ui/IconButton";
import { CarouselSkeleton } from "@/components/ui/Skeleton";
import { Carousel3D, CarouselPiece } from "@/components/gallery";
import { useUI } from "@/context/UIContext";

// Demo pieces - will be replaced by API data
const DEMO_PIECES: CarouselPiece[] = [
  { id: 1, name: "Vasija del Fénix", year: 2024, technique: "Cerámica esmaltada", image: "/Images/barro.jpg" },
  { id: 2, name: "Espiral Terracota", year: 2024, technique: "Gres terracota", image: "/Images/tecnica.jpg" },
  { id: 3, name: "Manganorhythmus", year: 2024, technique: "Cerámica con óxidos", image: "/Images/taller.jpg" },
  { id: 4, name: "Aurora Cerámica", year: 2023, technique: "Porcelana", image: "/Images/barro.jpg" },
  { id: 5, name: "Ondas del Tiempo", year: 2023, technique: "Gres esmaltado", image: "/Images/tecnica.jpg" },
];

export function GallerySection() {
  const t = useTranslations("gallery");
  const { openExposition, openPieceModal } = useUI();
  const [pieces, setPieces] = useState<CarouselPiece[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load pieces (demo for now)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPieces(DEMO_PIECES);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePieceClick = (piece: CarouselPiece) => {
    openPieceModal({
      id: piece.id,
      name: piece.name,
      slug: `piece-${piece.id}`,
      year: piece.year,
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
          className="mb-12 md:mb-16"
        />

        {/* Carousel Container */}
        {isLoading ? (
          <div className="h-[400px] md:h-[450px] lg:h-[500px] mb-12">
            <CarouselSkeleton />
          </div>
        ) : (
          <Carousel3D
            pieces={pieces}
            onPieceClick={handlePieceClick}
            autoplay={true}
            autoplayInterval={5000}
          />
        )}

        {/* Experience Button */}
        <div className="text-center">
          <button
            onClick={openExposition}
            className={cn(
              "inline-flex items-center gap-3",
              "px-8 py-4 rounded-full",
              "border-2 border-terracotta",
              "text-terracotta font-body font-medium",
              "hover:bg-terracotta/10 transition-colors duration-300",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-bg-clay"
            )}
          >
            <MaximizeIcon />
            <span>{t("experienceButton")}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
