import { NextRequest, NextResponse } from 'next/server';
import { cleanExpiredCache, getCacheStats } from '@/lib/imageCache';

// Secret para proteger el endpoint (configurar en variables de entorno)
const CRON_SECRET = process.env.CRON_SECRET || 'default-secret-change-me';

/**
 * Endpoint para limpiar cache expirado
 * 
 * POST /api/cache-cleanup
 * Headers: Authorization: Bearer {CRON_SECRET}
 * 
 * Puede ser invocado por un cron job para mantener el cache limpio
 */
export async function POST(request: NextRequest) {
    // Verificar autorización
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (token !== CRON_SECRET) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const result = await cleanExpiredCache();

        return NextResponse.json({
            success: true,
            message: 'Cache cleanup completed',
            deleted: result.deleted,
            kept: result.kept,
        });
    } catch (error) {
        console.error('Cache cleanup error:', error);

        return NextResponse.json(
            { error: 'Cleanup failed', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

/**
 * Endpoint para obtener estadísticas del cache
 * 
 * GET /api/cache-cleanup
 * Headers: Authorization: Bearer {CRON_SECRET}
 */
export async function GET(request: NextRequest) {
    // Verificar autorización
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (token !== CRON_SECRET) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const stats = await getCacheStats();

        return NextResponse.json({
            success: true,
            stats: {
                ...stats,
                totalSizeMB: (stats.totalSize / (1024 * 1024)).toFixed(2),
                oldestEntryAge: stats.oldestEntry
                    ? `${Math.round((Date.now() - stats.oldestEntry) / 1000 / 60)} minutes ago`
                    : null,
                newestEntryAge: stats.newestEntry
                    ? `${Math.round((Date.now() - stats.newestEntry) / 1000 / 60)} minutes ago`
                    : null,
            },
        });
    } catch (error) {
        console.error('Cache stats error:', error);

        return NextResponse.json(
            { error: 'Stats failed', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
