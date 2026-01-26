import type { Piece, PieceSummary } from "./piece";

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
 * Respuesta de listado de piezas
 */
export type PiecesListResponse = ApiResponse<PieceSummary[]>;

/**
 * Respuesta de detalle de pieza
 */
export type PieceDetailResponse = ApiResponse<Piece>;

/**
 * Respuesta de piezas destacadas
 */
export type FeaturedPiecesResponse = ApiResponse<PieceSummary[]>;

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
