import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

// Cache configuration
const CACHE_DIR = path.join(process.cwd(), '.image-cache');
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hora en milisegundos

interface CacheMetadata {
    cachedAt: number;
    contentType: string;
    originalUrl: string;
    size: number;
}

/**
 * Genera un hash único para una URL de imagen
 */
export function getUrlHash(url: string): string {
    return crypto.createHash('md5').update(url).digest('hex');
}

/**
 * Obtiene la extensión de una URL de imagen
 */
export function getImageExtension(url: string): string {
    try {
        const urlPath = new URL(url).pathname;
        const ext = path.extname(urlPath).toLowerCase();
        return ext || '.jpg';
    } catch {
        return '.jpg';
    }
}

/**
 * Genera las rutas de cache para una URL
 */
export function getCachePaths(url: string): { imagePath: string; metaPath: string } {
    const hash = getUrlHash(url);
    const ext = getImageExtension(url);
    return {
        imagePath: path.join(CACHE_DIR, `${hash}${ext}`),
        metaPath: path.join(CACHE_DIR, `${hash}.meta.json`),
    };
}

/**
 * Asegura que el directorio de cache existe
 */
export async function ensureCacheDir(): Promise<void> {
    await fs.mkdir(CACHE_DIR, { recursive: true });
}

/**
 * Verifica si una entrada de cache es válida (existe y no ha expirado)
 */
export async function isCacheValid(url: string): Promise<boolean> {
    const { imagePath, metaPath } = getCachePaths(url);

    try {
        const [imageExists, metaContent] = await Promise.all([
            fs.access(imagePath).then(() => true).catch(() => false),
            fs.readFile(metaPath, 'utf-8').catch(() => null),
        ]);

        if (!imageExists || !metaContent) {
            return false;
        }

        const meta: CacheMetadata = JSON.parse(metaContent);
        const age = Date.now() - meta.cachedAt;

        return age < CACHE_DURATION_MS;
    } catch {
        return false;
    }
}

/**
 * Obtiene una imagen del cache
 */
export async function getFromCache(url: string): Promise<{ buffer: Buffer; contentType: string } | null> {
    const { imagePath, metaPath } = getCachePaths(url);

    try {
        const isValid = await isCacheValid(url);
        if (!isValid) {
            return null;
        }

        const [buffer, metaContent] = await Promise.all([
            fs.readFile(imagePath),
            fs.readFile(metaPath, 'utf-8'),
        ]);

        const meta: CacheMetadata = JSON.parse(metaContent);
        return { buffer, contentType: meta.contentType };
    } catch {
        return null;
    }
}

/**
 * Guarda una imagen en el cache
 */
export async function saveToCache(
    url: string,
    buffer: Buffer,
    contentType: string
): Promise<void> {
    await ensureCacheDir();

    const { imagePath, metaPath } = getCachePaths(url);

    const meta: CacheMetadata = {
        cachedAt: Date.now(),
        contentType,
        originalUrl: url,
        size: buffer.length,
    };

    await Promise.all([
        fs.writeFile(imagePath, buffer),
        fs.writeFile(metaPath, JSON.stringify(meta, null, 2)),
    ]);
}

/**
 * Elimina una entrada del cache
 */
export async function deleteFromCache(url: string): Promise<void> {
    const { imagePath, metaPath } = getCachePaths(url);

    await Promise.all([
        fs.unlink(imagePath).catch(() => { }),
        fs.unlink(metaPath).catch(() => { }),
    ]);
}

/**
 * Limpia todas las entradas expiradas del cache
 */
export async function cleanExpiredCache(): Promise<{ deleted: number; kept: number }> {
    await ensureCacheDir();

    let deleted = 0;
    let kept = 0;

    try {
        const files = await fs.readdir(CACHE_DIR);
        const metaFiles = files.filter(f => f.endsWith('.meta.json'));

        for (const metaFile of metaFiles) {
            const metaPath = path.join(CACHE_DIR, metaFile);

            try {
                const metaContent = await fs.readFile(metaPath, 'utf-8');
                const meta: CacheMetadata = JSON.parse(metaContent);
                const age = Date.now() - meta.cachedAt;

                if (age >= CACHE_DURATION_MS) {
                    // Expirado, eliminar
                    const hash = metaFile.replace('.meta.json', '');
                    const imageFiles = files.filter(f => f.startsWith(hash) && !f.endsWith('.meta.json'));

                    await Promise.all([
                        fs.unlink(metaPath),
                        ...imageFiles.map(f => fs.unlink(path.join(CACHE_DIR, f)).catch(() => { })),
                    ]);

                    deleted++;
                } else {
                    kept++;
                }
            } catch {
                // Si hay error leyendo meta, eliminar
                await fs.unlink(metaPath).catch(() => { });
                deleted++;
            }
        }
    } catch (error) {
        console.error('Error cleaning cache:', error);
    }

    return { deleted, kept };
}

/**
 * Obtiene estadísticas del cache
 */
export async function getCacheStats(): Promise<{
    totalFiles: number;
    totalSize: number;
    oldestEntry: number | null;
    newestEntry: number | null;
}> {
    await ensureCacheDir();

    try {
        const files = await fs.readdir(CACHE_DIR);
        const metaFiles = files.filter(f => f.endsWith('.meta.json'));

        let totalSize = 0;
        let oldestEntry: number | null = null;
        let newestEntry: number | null = null;

        for (const metaFile of metaFiles) {
            const metaPath = path.join(CACHE_DIR, metaFile);

            try {
                const metaContent = await fs.readFile(metaPath, 'utf-8');
                const meta: CacheMetadata = JSON.parse(metaContent);

                totalSize += meta.size;

                if (oldestEntry === null || meta.cachedAt < oldestEntry) {
                    oldestEntry = meta.cachedAt;
                }
                if (newestEntry === null || meta.cachedAt > newestEntry) {
                    newestEntry = meta.cachedAt;
                }
            } catch {
                // Ignorar archivos con errores
            }
        }

        return {
            totalFiles: metaFiles.length,
            totalSize,
            oldestEntry,
            newestEntry,
        };
    } catch {
        return {
            totalFiles: 0,
            totalSize: 0,
            oldestEntry: null,
            newestEntry: null,
        };
    }
}
