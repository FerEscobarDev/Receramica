import { NextResponse } from "next/server";
import type { CarouselImageRaw } from "@/types";
import { transformCarouselImage } from "@/lib/transformers";
import environment from "@/environment";

const API_URL = process.env.NEXT_PUBLIC_API_URL || environment.urlBaseApi;
const API_TOKEN = process.env.API_AUTH_TOKEN || environment.authToken;

// Revalidar cada hora (3600 segundos)
export const revalidate = 3600;

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/images`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(API_TOKEN && { Authorization: API_TOKEN }),
      },
      next: {
        revalidate: 3600,
        tags: ["carousel"],
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: CarouselImageRaw[] = await response.json();

    // El API retorna un array directo de imágenes para el carrusel
    const images = Array.isArray(data) ? data : [];

    // Transformar a formato para Carousel3D
    const carouselPieces = images.map(transformCarouselImage);

    return NextResponse.json({
      success: true,
      images: carouselPieces,
      total: carouselPieces.length,
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching carousel images:", error);

    return NextResponse.json({
      success: false,
      images: [],
      total: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    }, {
      status: 500,
    });
  }
}
