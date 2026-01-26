import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-bg-earth">
      {/* Placeholder - Las secciones se implementarán en fases posteriores */}
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-6xl font-light text-cream tracking-wide mb-4">
            Ricardo Escobar
          </h1>
          <p className="text-text-secondary font-body text-lg tracking-widest uppercase">
            {locale === "es" ? "Cerámica de Autor" : "Author Ceramics"}
          </p>
          <p className="text-terracotta mt-8 font-body text-sm">
            {locale === "es" ? "Sitio en construcción..." : "Site under construction..."}
          </p>
        </div>
      </div>
    </main>
  );
}
