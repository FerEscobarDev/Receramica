import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path") || "/";
    const secret = searchParams.get("secret");

    // Verificar secret en producción
    if (process.env.NODE_ENV === "production") {
      const expectedSecret = process.env.REVALIDATE_SECRET;
      if (!expectedSecret || secret !== expectedSecret) {
        return NextResponse.json(
          { success: false, message: "Invalid secret" },
          { status: 401 }
        );
      }
    }

    // Revalidar el path especificado
    revalidatePath(path, "layout");

    return NextResponse.json({
      success: true,
      revalidated: true,
      path,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// También soportar GET para testing
export async function GET(request: NextRequest) {
  return POST(request);
}
