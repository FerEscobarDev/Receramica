import { NextResponse } from "next/server";
import { CACHE_CONFIG } from "@/lib/constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ricardo-admin.receramica.com";
const API_TOKEN = process.env.API_AUTH_TOKEN || "";

export const revalidate = CACHE_CONFIG.pieces; // Revalidar cada hora

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/pieces`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(API_TOKEN && { Authorization: API_TOKEN }),
      },
      next: {
        revalidate: CACHE_CONFIG.pieces,
        tags: ["pieces"],
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Transformar datos para el frontend
    const pieces = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);

    // Separar piezas destacadas
    const featured = pieces.filter((p: { featured?: boolean }) => p.featured);

    // Mapear para incluir URL completa de imagen
    const mappedPieces = pieces.map((piece: {
      id: number;
      name: string;
      slug?: string;
      year?: number;
      technique?: string;
      dimensions?: string;
      description?: string;
      images?: Array<{ url: string; is_main?: boolean }>;
      main_image?: string;
      featured?: boolean;
      available?: boolean;
    }) => ({
      id: piece.id,
      name: piece.name,
      slug: piece.slug || `piece-${piece.id}`,
      year: piece.year || new Date().getFullYear(),
      technique: piece.technique || "Cerámica",
      dimensions: piece.dimensions || "",
      description: piece.description || "",
      main_image: getMainImage(piece),
      featured: piece.featured || false,
      available: piece.available !== false,
    }));

    return NextResponse.json({
      success: true,
      pieces: mappedPieces,
      featured: mappedPieces.filter((p: { featured: boolean }) => p.featured),
      total: mappedPieces.length,
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching pieces:", error);

    // Retornar datos de fallback en caso de error
    return NextResponse.json({
      success: false,
      pieces: [],
      featured: [],
      total: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    }, {
      status: 500,
    });
  }
}

function getMainImage(piece: {
  images?: Array<{ url: string; is_main?: boolean }>;
  main_image?: string;
}): string {
  const baseUrl = API_URL;

  // Si tiene array de imágenes, buscar la principal
  if (piece.images && piece.images.length > 0) {
    const mainImg = piece.images.find(img => img.is_main) || piece.images[0];
    const imgUrl = mainImg.url;

    if (imgUrl.startsWith("http")) return imgUrl;
    return `${baseUrl}/storage/${imgUrl}`;
  }

  // Si tiene main_image directamente
  if (piece.main_image) {
    if (piece.main_image.startsWith("http")) return piece.main_image;
    return `${baseUrl}/storage/${piece.main_image}`;
  }

  // Placeholder
  return "/Images/placeholder.jpg";
}
