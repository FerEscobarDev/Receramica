/**
 * Variables de entorno tipadas
 * Este archivo proporciona acceso seguro a las variables de entorno
 */

/**
 * Variables de entorno del servidor (no expuestas al cliente)
 */
export const serverEnv = {
  API_AUTH_TOKEN: process.env.API_AUTH_TOKEN || "",
  NODE_ENV: process.env.NODE_ENV || "development",
} as const;

/**
 * Variables de entorno públicas (disponibles en cliente y servidor)
 */
export const publicEnv = {
  NEXT_PUBLIC_API_URL:
    process.env.NEXT_PUBLIC_API_URL || "https://ricardo-admin.receramica.com",
  NEXT_PUBLIC_SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL || "https://receramica.com",
} as const;

/**
 * Verifica que las variables de entorno requeridas estén definidas
 */
export function validateEnv(): void {
  const requiredServerEnvs = ["API_AUTH_TOKEN"];
  const requiredPublicEnvs = ["NEXT_PUBLIC_API_URL", "NEXT_PUBLIC_SITE_URL"];

  const missingServerEnvs = requiredServerEnvs.filter(
    (env) => !process.env[env]
  );
  const missingPublicEnvs = requiredPublicEnvs.filter(
    (env) => !process.env[env]
  );

  if (missingServerEnvs.length > 0 || missingPublicEnvs.length > 0) {
    console.warn(
      "Warning: Missing environment variables:",
      [...missingServerEnvs, ...missingPublicEnvs].join(", ")
    );
  }
}

/**
 * Helper para determinar si estamos en producción
 */
export const isProd = process.env.NODE_ENV === "production";

/**
 * Helper para determinar si estamos en desarrollo
 */
export const isDev = process.env.NODE_ENV === "development";
