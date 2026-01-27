import type {
  Creacion,
  CreacionImage,
  CarouselImageRaw,
  Piece,
  PieceImage,
  PieceSummary,
  CarouselPiece,
} from "@/types";
import environment from "@/environment";

const STORAGE_BASE_URL = environment.urlImages.replace(/\/$/, "");
const DEFAULT_YEAR = 2025;

/**
 * Construye la URL completa de una imagen a partir de la ruta relativa
 */
export function buildImageUrl(relativePath: string): string {
  if (!relativePath) return "/Images/placeholder.jpg";
  if (relativePath.startsWith("http")) return relativePath;

  // Normalizar barras invertidas a barras normales
  const normalizedPath = relativePath.replace(/\\/g, "/");
  return `${STORAGE_BASE_URL}/${normalizedPath}`;
}

/**
 * Transforma una imagen del API a PieceImage para UI
 */
export function transformImage(
  img: CreacionImage,
  index: number
): PieceImage {
  return {
    id: img.id,
    piece_id: img.product_id,
    url: buildImageUrl(img.url),
    alt: img.alt || "",
    order: index,
    is_main: img.main === 1,
  };
}

/**
 * Transforma una Creacion del API a Piece para UI
 */
export function transformCreacion(creacion: Creacion): Piece {
  const images = creacion.images.map((img, index) => transformImage(img, index));

  return {
    id: creacion.id,
    name: creacion.name,
    slug: `piece-${creacion.id}`,
    year: DEFAULT_YEAR,
    technique: "Cerámica",
    dimensions: "",
    description: creacion.description,
    description_extended: creacion.description,
    images,
    featured: creacion.landing === 1,
    available: creacion.quantity > 0,
    order: 0,
    created_at: creacion.created_at,
    updated_at: creacion.updated_at,
  };
}

/**
 * Transforma una Creacion a PieceSummary para listados
 */
export function transformCreacionToSummary(creacion: Creacion): PieceSummary {
  const mainImage = creacion.images.find((img) => img.main === 1) || creacion.images[0];

  return {
    id: creacion.id,
    name: creacion.name,
    slug: `piece-${creacion.id}`,
    year: DEFAULT_YEAR,
    technique: "Cerámica",
    main_image: mainImage ? buildImageUrl(mainImage.url) : "/Images/placeholder.jpg",
    featured: creacion.landing === 1,
  };
}

/**
 * Transforma una imagen del carrusel del API a CarouselPiece para UI
 */
export function transformCarouselImage(img: CarouselImageRaw): CarouselPiece {
  return {
    id: img.product_id,
    name: img.alt,
    year: DEFAULT_YEAR,
    technique: "Cerámica",
    image: buildImageUrl(img.url),
    slug: `piece-${img.product_id}`,
  };
}

/**
 * Obtiene la imagen principal de una Creacion
 */
export function getMainImageUrl(creacion: Creacion): string {
  const mainImage = creacion.images.find((img) => img.main === 1) || creacion.images[0];
  return mainImage ? buildImageUrl(mainImage.url) : "/Images/placeholder.jpg";
}
