import type { Piece, PieceSummary, Creacion, CarouselImageRaw } from "./piece";

/**
 * Respuesta genérica de la API
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Respuesta paginada de la API
 */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

/**
 * Respuesta de /api/creaciones - array directo
 */
export type CreacionesResponse = Creacion[];

/**
 * Respuesta de /api/creaciones/{id} - objeto directo
 */
export type CreacionDetailResponse = Creacion;

/**
 * Respuesta de /api/images - array de imágenes para carrusel
 */
export type CarouselImagesResponse = CarouselImageRaw[];

/**
 * Respuesta de listado de piezas (transformada)
 */
export type PiecesListResponse = ApiResponse<PieceSummary[]>;

/**
 * Respuesta de detalle de pieza (transformada)
 */
export type PieceDetailResponse = ApiResponse<Piece>;

/**
 * Error de la API
 */
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Opciones de fetch para la API
 */
export interface FetchOptions {
  revalidate?: number | false;
  tags?: string[];
}
