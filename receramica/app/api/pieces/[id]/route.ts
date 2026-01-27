import { NextRequest, NextResponse } from "next/server";
import type { Creacion } from "@/types";
import { transformCreacion } from "@/lib/transformers";
import environment from "@/environment";

const API_URL = process.env.NEXT_PUBLIC_API_URL || environment.urlBaseApi;
const API_TOKEN = process.env.API_AUTH_TOKEN || environment.authToken;

// Revalidar cada 24 horas (86400 segundos)
export const revalidate = 86400;

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    // Solo soportamos búsqueda por ID numérico
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json({
        success: false,
        error: "Invalid piece ID",
      }, { status: 400 });
    }

    const response = await fetch(`${API_URL}/api/creaciones/${numericId}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(API_TOKEN && { Authorization: API_TOKEN }),
      },
      next: {
        revalidate: 86400,
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

    const creacion: Creacion = await response.json();
    const piece = transformCreacion(creacion);

    return NextResponse.json({
      success: true,
      piece,
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
