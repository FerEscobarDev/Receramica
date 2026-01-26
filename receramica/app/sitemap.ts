import { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://receramica.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    "",
    "/#gallery",
    "/#artist",
    "/#workshop",
    "/#contact",
  ];

  // Generate entries for each locale
  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}${page}`])
        ),
      },
    }))
  );

  // Fetch pieces for dynamic entries (optional)
  let pieceEntries: MetadataRoute.Sitemap = [];
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://ricardo-admin.receramica.com";
    const response = await fetch(`${API_URL}/api/pieces`, {
      next: { revalidate: 86400 }, // Revalidate daily
    });

    if (response.ok) {
      const data = await response.json();
      const pieces = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);

      pieceEntries = pieces.flatMap((piece: { slug?: string; id: number; updated_at?: string }) =>
        locales.map((locale) => ({
          url: `${BASE_URL}/${locale}/piece/${piece.slug || piece.id}`,
          lastModified: piece.updated_at ? new Date(piece.updated_at) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
          alternates: {
            languages: Object.fromEntries(
              locales.map((l) => [l, `${BASE_URL}/${l}/piece/${piece.slug || piece.id}`])
            ),
          },
        }))
      );
    }
  } catch {
    // Silently fail if API is unavailable
    console.log("Sitemap: Could not fetch pieces from API");
  }

  return [...staticEntries, ...pieceEntries];
}
