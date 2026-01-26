/**
 * Representa una pieza de cerámica
 */
export interface Piece {
  id: number;
  name: string;
  slug: string;
  year: number;
  technique: string;
  dimensions: string;
  description: string;
  description_extended?: string;
  images: PieceImage[];
  featured: boolean;
  available: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

/**
 * Imagen de una pieza
 */
export interface PieceImage {
  id: number;
  piece_id: number;
  url: string;
  alt?: string;
  order: number;
  is_main: boolean;
}

/**
 * Pieza con datos mínimos para listados
 */
export interface PieceSummary {
  id: number;
  name: string;
  slug: string;
  year: number;
  technique: string;
  main_image: string;
  featured: boolean;
}

/**
 * Datos para el carrusel 3D
 */
export interface CarouselPiece {
  id: number;
  name: string;
  year: number;
  technique: string;
  image: string;
  slug: string;
}

/**
 * Datos para la exposición fullscreen
 */
export interface ExpositionTile {
  id: number;
  name: string;
  image: string;
  height: "small" | "medium" | "large";
  slug: string;
}
