"use client";

import { useEffect, useCallback, useRef } from "react";

interface PrefetchOptions {
  /** Delay before starting prefetch (ms) */
  delay?: number;
  /** Priority level for prefetch */
  priority?: "high" | "low" | "auto";
  /** Maximum concurrent prefetch requests */
  maxConcurrent?: number;
}

/**
 * Hook para prefetch de imágenes críticas
 */
export function useImagePrefetch(
  imageUrls: string[],
  options: PrefetchOptions = {}
) {
  const { delay = 100, priority = "auto", maxConcurrent = 4 } = options;
  const prefetchedRef = useRef<Set<string>>(new Set());

  const prefetchImage = useCallback((url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (prefetchedRef.current.has(url)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        prefetchedRef.current.add(url);
        resolve();
      };
      img.onerror = reject;
      img.src = url;
    });
  }, []);

  const prefetchWithConcurrency = useCallback(
    async (urls: string[]) => {
      const queue = [...urls];
      const executing: Promise<void>[] = [];

      while (queue.length > 0 || executing.length > 0) {
        while (executing.length < maxConcurrent && queue.length > 0) {
          const url = queue.shift()!;
          const promise = prefetchImage(url).finally(() => {
            executing.splice(executing.indexOf(promise), 1);
          });
          executing.push(promise);
        }

        if (executing.length > 0) {
          await Promise.race(executing);
        }
      }
    },
    [maxConcurrent, prefetchImage]
  );

  useEffect(() => {
    if (typeof window === "undefined" || imageUrls.length === 0) return;

    const timeoutId = setTimeout(() => {
      // Filtrar URLs ya prefetcheadas
      const urlsToPrefetch = imageUrls.filter(
        (url) => !prefetchedRef.current.has(url)
      );

      if (urlsToPrefetch.length === 0) return;

      // Usar link prefetch para soporte nativo del navegador
      if (priority === "high") {
        urlsToPrefetch.forEach((url) => {
          const link = document.createElement("link");
          link.rel = "prefetch";
          link.as = "image";
          link.href = url;
          document.head.appendChild(link);
        });
      }

      // Prefetch con Image para mejor control
      prefetchWithConcurrency(urlsToPrefetch).catch(console.error);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [imageUrls, delay, priority, prefetchWithConcurrency]);

  // Método para prefetch manual de una imagen específica
  const prefetch = useCallback(
    (url: string) => {
      if (!prefetchedRef.current.has(url)) {
        prefetchImage(url).catch(console.error);
      }
    },
    [prefetchImage]
  );

  return { prefetch, prefetchedUrls: prefetchedRef.current };
}

/**
 * Hook para prefetch de imágenes visibles en viewport
 */
export function useViewportImagePrefetch(
  containerRef: React.RefObject<HTMLElement | null>,
  images: Array<{ url: string; id: string | number }>
) {
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLElement;
            const imageUrl = img.dataset.prefetchUrl;
            if (imageUrl) {
              const preloadLink = document.createElement("link");
              preloadLink.rel = "preload";
              preloadLink.as = "image";
              preloadLink.href = imageUrl;
              document.head.appendChild(preloadLink);
              observer.unobserve(img);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    const elements = containerRef.current.querySelectorAll("[data-prefetch-url]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerRef, images]);
}

/**
 * Prefetch de las primeras N imágenes del carrusel
 */
export function useCriticalImagePrefetch(images: string[], count: number = 5) {
  useEffect(() => {
    if (typeof window === "undefined" || images.length === 0) return;

    const criticalImages = images.slice(0, count);

    // Usar preload para imágenes críticas (highest priority)
    criticalImages.forEach((url, index) => {
      const link = document.createElement("link");
      link.rel = index === 0 ? "preload" : "prefetch";
      link.as = "image";
      link.href = url;
      if (index === 0) {
        link.setAttribute("fetchpriority", "high");
      }
      document.head.appendChild(link);
    });
  }, [images, count]);
}
