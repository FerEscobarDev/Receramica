import type {
  CreacionesResponse,
  CreacionDetailResponse,
  CarouselImagesResponse,
  FetchOptions,
} from "@/types";
import type { Piece, PieceSummary, CarouselPiece } from "@/types";
import { CACHE_CONFIG } from "./constants";
import {
  transformCreacion,
  transformCreacionToSummary,
  transformCarouselImage,
} from "./transformers";
import environment from "@/environment";

const API_URL = process.env.NEXT_PUBLIC_API_URL || environment.urlBaseApi;
const API_TOKEN = process.env.API_AUTH_TOKEN || environment.authToken;

/**
 * Cliente base para peticiones a la API
 */
async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate = CACHE_CONFIG.pieces, tags = [] } = options;

  const url = `${API_URL}/api${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(API_TOKEN && { Authorization: API_TOKEN }),
    },
    next: {
      revalidate,
      tags,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Obtiene todas las creaciones y las transforma a Pieces
 */
export async function getPieces(): Promise<Piece[]> {
  const creaciones = await fetchApi<CreacionesResponse>("/creaciones", {
    revalidate: CACHE_CONFIG.pieces,
    tags: ["pieces"],
  });

  return creaciones.map(transformCreacion);
}

/**
 * Obtiene todas las creaciones como PieceSummary para listados
 */
export async function getPiecesSummary(): Promise<PieceSummary[]> {
  const creaciones = await fetchApi<CreacionesResponse>("/creaciones", {
    revalidate: CACHE_CONFIG.pieces,
    tags: ["pieces"],
  });

  return creaciones.map(transformCreacionToSummary);
}

/**
 * Obtiene el detalle de una pieza por ID
 */
export async function getPieceById(id: number): Promise<Piece> {
  const creacion = await fetchApi<CreacionDetailResponse>(`/creaciones/${id}`, {
    revalidate: CACHE_CONFIG.pieceDetail,
    tags: ["pieces", `piece-${id}`],
  });

  return transformCreacion(creacion);
}

/**
 * Obtiene las imágenes para el carrusel
 */
export async function getCarouselImages(): Promise<CarouselPiece[]> {
  const images = await fetchApi<CarouselImagesResponse>("/images", {
    revalidate: CACHE_CONFIG.pieces,
    tags: ["carousel"],
  });

  return images.map(transformCarouselImage);
}

/**
 * Invalida el caché de piezas (para usar en revalidación manual)
 */
export async function revalidatePieces(): Promise<void> {
  try {
    await fetch("/api/revalidate?tag=pieces", { method: "POST" });
  } catch (error) {
    console.error("Error revalidating pieces cache:", error);
  }
}

/**
 * Prefetch de imágenes para el carrusel
 */
export function prefetchImages(imageUrls: string[]): void {
  if (typeof window === "undefined") return;

  imageUrls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  });
}
