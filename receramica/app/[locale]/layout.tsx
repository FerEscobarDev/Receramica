import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { locales, type Locale } from "@/i18n/config";
import { UIProvider } from "@/context/UIContext";
import type { Metadata } from "next";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Receramica | Ricardo Escobar - Ceramic Artist",
    es: "Recerámica | Ricardo Escobar - Artista Cerámico",
  };

  const descriptions: Record<string, string> = {
    en: "Discover the unique ceramic artworks of Ricardo Escobar. Each piece is an expression of perpetual happiness, enthusiasm, and surprise. Author ceramics from Colombia.",
    es: "Descubre las obras cerámicas únicas de Ricardo Escobar. Cada pieza es una expresión de felicidad, entusiasmo y sorpresa perpetuos. Cerámica de autor de Colombia.",
  };

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://receramica.com"
    ),
    title: {
      default: titles[locale] || titles.en,
      template: "%s | Receramica",
    },
    description: descriptions[locale] || descriptions.en,
    keywords: [
      "ceramics",
      "ceramic art",
      "Ricardo Escobar",
      "Colombian artist",
      "handmade pottery",
      "artisan ceramics",
      "unique pieces",
      "ceramic sculpture",
      "art gallery",
      "Receramica",
    ],
    authors: [{ name: "Ricardo Escobar" }],
    creator: "Ricardo Escobar",
    publisher: "Receramica",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_CO" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_CO",
      url: "/",
      siteName: "Receramica",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: [
        {
          url: "/Images/ricardo.jpg",
          width: 1200,
          height: 630,
          alt: "Ricardo Escobar - Ceramic Artist",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: ["/Images/ricardo.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/Images/logoIco.jpg",
      apple: "/Images/logoIco.jpg",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://ricardo-admin.receramica.com" />
        <link rel="dns-prefetch" href="https://ricardo-admin.receramica.com" />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <UIProvider>{children}</UIProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
