import { NextRequest, NextResponse } from 'next/server';
import { getFromCache, saveToCache, isCacheValid } from '@/lib/imageCache';

// Disable static generation for this route
export const dynamic = 'force-dynamic';

/**
 * Proxy de imágenes con cache server-side
 * 
 * GET /api/image-proxy?url=https://storage.example.com/image.jpg
 * 
 * Headers de respuesta:
 * - X-Cache: HIT | MISS
 * - Cache-Control: public, max-age=3600
 */
export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get('url');

    if (!url) {
        return NextResponse.json(
            { error: 'Missing url parameter' },
            { status: 400 }
        );
    }

    // Validar que sea una URL válida
    try {
        new URL(url);
    } catch {
        return NextResponse.json(
            { error: 'Invalid url parameter' },
            { status: 400 }
        );
    }

    try {
        // Intentar obtener del cache
        const cached = await getFromCache(url);

        if (cached) {
            return new NextResponse(new Uint8Array(cached.buffer), {
                headers: {
                    'Content-Type': cached.contentType,
                    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
                    'X-Cache': 'HIT',
                },
            });
        }

        // Cache miss: descargar de origen
        const response = await fetch(url, {
            headers: {
                'Accept': 'image/*',
            },
        });

        if (!response.ok) {
            // Si falla la descarga, retornar error o redirect al original
            return NextResponse.redirect(url, { status: 302 });
        }

        const buffer = Buffer.from(await response.arrayBuffer());
        const contentType = response.headers.get('content-type') || 'image/jpeg';

        // Guardar en cache (no bloquear la respuesta)
        saveToCache(url, buffer, contentType).catch((error) => {
            console.error('Error saving to cache:', error);
        });

        return new NextResponse(new Uint8Array(buffer), {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
                'X-Cache': 'MISS',
            },
        });
    } catch (error) {
        console.error('Image proxy error:', error);

        // Fallback: redirect al original
        return NextResponse.redirect(url, { status: 302 });
    }
}
