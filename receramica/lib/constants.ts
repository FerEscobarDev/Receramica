/**
 * Constantes de la aplicación
 */

// Navegación
export const NAV_LINKS = [
  { key: "gallery", href: "#gallery" },
  { key: "artist", href: "#artist" },
  { key: "workshop", href: "#workshop" },
  { key: "contact", href: "#contact" },
] as const;

// Redes sociales
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/receramica",
  facebook: "https://facebook.com/receramica",
  whatsapp: "https://wa.me/573001234567",
} as const;

// Configuración del carrusel
export const CAROUSEL_CONFIG = {
  autoplayInterval: 5000,
  transitionDuration: 600,
  visibleSlides: 5,
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Duración de animaciones (ms)
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 800,
} as const;

// Configuración de la exposición
export const EXPOSITION_CONFIG = {
  columns: 5,
  gap: 12,
  tilePadding: 12,
} as const;

// Keys para localStorage
export const STORAGE_KEYS = {
  expositionSeen: "receramica_exposition_seen",
  preferredLanguage: "receramica_lang",
} as const;

// Información de contacto
export const CONTACT_INFO = {
  email: "info@receramica.com",
  location: "Bogota, Colombia",
  phone: "+57 300 123 4567",
} as const;

// Configuración de caché (segundos)
export const CACHE_CONFIG = {
  pieces: 60 * 60, // 1 hora
  pieceDetail: 60 * 60 * 24, // 24 horas
  images: 60 * 60 * 24 * 7, // 7 días
} as const;
