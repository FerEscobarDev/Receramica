"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { CarouselPiece } from "@/types";

interface UseCarouselImagesReturn {
  images: CarouselPiece[];
  imageUrls: string[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook para obtener las imágenes del carrusel
 */
export function useCarouselImages(): UseCarouselImagesReturn {
  const [images, setImages] = useState<CarouselPiece[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/carousel");
      if (!response.ok) throw new Error("Failed to fetch carousel images");

      const data = await response.json();
      setImages(data.images || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Extraer URLs de imágenes para el sistema de prefetch
  const imageUrls = useMemo(() => images.map((img) => img.image), [images]);

  return {
    images,
    imageUrls,
    isLoading,
    error,
    refetch: fetchImages,
  };
}
