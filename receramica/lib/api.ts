import type {
  ApiResponse,
  PiecesListResponse,
  PieceDetailResponse,
  FeaturedPiecesResponse,
  FetchOptions,
} from "@/types";
import { CACHE_CONFIG } from "./constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ricardo-admin.receramica.com";
const API_TOKEN = process.env.API_AUTH_TOKEN || "";

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
 * Obtiene todas las piezas
 */
export async function getPieces(): Promise<PiecesListResponse> {
  return fetchApi<PiecesListResponse>("/api/creaciones", {
    revalidate: CACHE_CONFIG.pieces,
    tags: ["pieces"],
  });
}

/**
 * Obtiene piezas destacadas para el carrusel
 */
export async function getFeaturedPieces(): Promise<FeaturedPiecesResponse> {
  return fetchApi<FeaturedPiecesResponse>("/pieces/featured", {
    revalidate: CACHE_CONFIG.pieces,
    tags: ["pieces", "featured"],
  });
}

/**
 * Obtiene el detalle de una pieza por slug
 */
export async function getPieceBySlug(slug: string): Promise<PieceDetailResponse> {
  return fetchApi<PieceDetailResponse>(`/pieces/${slug}`, {
    revalidate: CACHE_CONFIG.pieceDetail,
    tags: ["pieces", `piece-${slug}`],
  });
}

/**
 * Obtiene el detalle de una pieza por ID
 */
export async function getPieceById(id: number): Promise<PieceDetailResponse> {
  return fetchApi<PieceDetailResponse>(`/pieces/id/${id}`, {
    revalidate: CACHE_CONFIG.pieceDetail,
    tags: ["pieces", `piece-${id}`],
  });
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
