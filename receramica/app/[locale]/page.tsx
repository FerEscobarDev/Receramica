import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  HeroSection,
  GallerySection,
  ArtistSection,
  InnovationSection,
  WorkshopSection,
  EssenceSection,
  CTASection,
} from "@/components/sections";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Header transparent />

      <main className="min-h-screen bg-bg-earth">
        <HeroSection />
        <GallerySection />
        <ArtistSection />
        <InnovationSection />
        <WorkshopSection />
        <EssenceSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
