import { NextRequest, NextResponse } from "next/server";
import { CACHE_CONFIG } from "@/lib/constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ricardo-admin.receramica.com";
const API_TOKEN = process.env.API_AUTH_TOKEN || "";

export const revalidate = CACHE_CONFIG.pieceDetail; // Revalidar cada 24 horas

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    // Intentar buscar por ID o por slug
    const endpoint = isNaN(Number(id))
      ? `${API_URL}/api/pieces/slug/${id}`
      : `${API_URL}/api/pieces/${id}`;

    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(API_TOKEN && { Authorization: API_TOKEN }),
      },
      next: {
        revalidate: CACHE_CONFIG.pieceDetail,
        tags: ["pieces", `piece-${id}`],
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({
          success: false,
          error: "Piece not found",
        }, { status: 404 });
      }
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const piece = data.data || data;

    // Transformar y enriquecer datos
    const enrichedPiece = {
      id: piece.id,
      name: piece.name,
      slug: piece.slug || `piece-${piece.id}`,
      year: piece.year || new Date().getFullYear(),
      technique: piece.technique || "Cerámica",
      dimensions: piece.dimensions || "",
      description: piece.description || "",
      description_extended: piece.description_extended || piece.description || "",
      images: mapImages(piece.images || []),
      featured: piece.featured || false,
      available: piece.available !== false,
      created_at: piece.created_at,
      updated_at: piece.updated_at,
    };

    return NextResponse.json({
      success: true,
      piece: enrichedPiece,
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Error fetching piece:", error);

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }, {
      status: 500,
    });
  }
}

function mapImages(images: Array<{
  id?: number;
  url: string;
  alt?: string;
  order?: number;
  is_main?: boolean;
}>): Array<{
  id: number;
  url: string;
  alt: string;
  order: number;
  is_main: boolean;
}> {
  const baseUrl = API_URL;

  return images.map((img, index) => ({
    id: img.id || index,
    url: img.url.startsWith("http") ? img.url : `${baseUrl}/storage/${img.url}`,
    alt: img.alt || "",
    order: img.order || index,
    is_main: img.is_main || index === 0,
  }));
}
