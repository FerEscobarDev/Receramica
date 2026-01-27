import { NextResponse } from "next/server";
import type { Creacion, CreacionImage } from "@/types";
import { buildImageUrl } from "@/lib/transformers";
import environment from "@/environment";

const API_URL = process.env.NEXT_PUBLIC_API_URL || environment.urlBaseApi;
const API_TOKEN = process.env.API_AUTH_TOKEN || environment.authToken;

// Revalidar cada hora (3600 segundos)
export const revalidate = 3600;

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/creaciones`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(API_TOKEN && { Authorization: API_TOKEN }),
      },
      next: {
        revalidate: 3600,
        tags: ["pieces"],
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: Creacion[] = await response.json();

    // El API retorna un array directo
    const creaciones = Array.isArray(data) ? data : [];

    // Mapear para incluir URL completa de imagen
    const mappedPieces = creaciones.map((creacion: Creacion) => ({
      id: creacion.id,
      name: creacion.name,
      slug: `piece-${creacion.id}`,
      year: 2025,
      technique: "Cerámica",
      dimensions: "",
      description: creacion.description,
      main_image: getMainImage(creacion.images),
      featured: creacion.landing === 1,
      available: creacion.quantity > 0,
    }));

    // Filtrar piezas para landing
    const featured = mappedPieces.filter((p) => p.featured);

    return NextResponse.json({
      success: true,
      pieces: mappedPieces,
      featured,
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

function getMainImage(images: CreacionImage[]): string {
  if (!images || images.length === 0) {
    return "/Images/placeholder.jpg";
  }

  // Buscar imagen principal (main === 1)
  const mainImg = images.find((img) => img.main === 1) || images[0];
  return buildImageUrl(mainImg.url);
}
