import { type ClassValue, clsx } from "clsx";

/**
 * Combina clases de Tailwind de forma inteligente
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Formatea una URL de imagen de la API
 */
export function getImageUrl(path: string): string {
  if (!path) return "/Images/placeholder.jpg";
  if (path.startsWith("http")) return path;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://ricardo-admin.receramica.com";
  return `${baseUrl}/storage/${path}`;
}

/**
 * Genera un placeholder blur para imágenes
 */
export function getBlurDataUrl(): string {
  return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIRAAAgIBAwUBAAAAAAAAAAAAAQIDBAAFESEGEhMxQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAACAQMhMf/aAAwDAQACEQMRAD8AzdOprNWvBFqEUhuRRhZHjBCO4HJUb8bntxnPxjGVSpY+T//Z";
}

/**
 * Delay para animaciones stagger
 */
export function staggerDelay(index: number, baseDelay: number = 100): number {
  return index * baseDelay;
}

/**
 * Formatea el año de una pieza
 */
export function formatPieceYear(year: number): string {
  return year.toString();
}

/**
 * Genera meta descripción para una pieza
 */
export function getPieceMetaDescription(name: string, technique: string, year: number): string {
  return `${name} (${year}) - ${technique}. Unique ceramic artwork by Ricardo Escobar. Discover this handcrafted piece from Receramica.`;
}

/**
 * Genera URL amigable para compartir
 */
export function getShareUrl(slug: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://receramica.com";
  return `${baseUrl}/piece/${slug}`;
}

/**
 * Genera mensaje de WhatsApp para consulta de pieza
 */
export function getWhatsAppMessage(pieceName: string, locale: string = "en"): string {
  const messages = {
    en: `Hello! I'm interested in the piece "${pieceName}". Could you provide more information about availability and price?`,
    es: `Hola! Estoy interesado en la pieza "${pieceName}". ¿Podría darme más información sobre disponibilidad y precio?`,
  };
  return encodeURIComponent(messages[locale as keyof typeof messages] || messages.en);
}

/**
 * Genera link de WhatsApp
 */
export function getWhatsAppLink(pieceName: string, locale: string = "en"): string {
  const phone = "573001234567"; // Reemplazar con número real
  const message = getWhatsAppMessage(pieceName, locale);
  return `https://wa.me/${phone}?text=${message}`;
}

/**
 * Detecta si estamos en el servidor
 */
export function isServer(): boolean {
  return typeof window === "undefined";
}

/**
 * Detecta si el dispositivo es táctil
 */
export function isTouchDevice(): boolean {
  if (isServer()) return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
