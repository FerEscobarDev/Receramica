import Script from "next/script";
import type { Piece } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://receramica.com";

// Organization Schema
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Receramica",
    alternateName: "Recerámica - Ricardo Escobar",
    url: BASE_URL,
    logo: `${BASE_URL}/Images/logoHorizontalBlanco.png`,
    sameAs: [
      "https://instagram.com/receramica",
      "https://facebook.com/receramica",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+57-300-123-4567",
      contactType: "customer service",
      areaServed: "CO",
      availableLanguage: ["Spanish", "English"],
    },
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Artist/Person Schema
export function ArtistJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ricardo Escobar",
    jobTitle: "Ceramic Artist",
    description:
      "Ricardo Escobar is a distinguished ceramic artist whose vision and creativity are manifested in each of his works.",
    image: `${BASE_URL}/Images/ricardo.jpg`,
    url: `${BASE_URL}/en#artist`,
    sameAs: [
      "https://instagram.com/receramica",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Receramica",
    },
    knowsAbout: [
      "Ceramics",
      "Pottery",
      "Sculptural Art",
      "Traditional Colombian Crafts",
    ],
  };

  return (
    <Script
      id="artist-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Art Gallery Schema
export function ArtGalleryJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ArtGallery",
    name: "Recerámica Gallery",
    description:
      "Gallery showcasing unique ceramic artworks by Ricardo Escobar",
    url: `${BASE_URL}/en#gallery`,
    image: `${BASE_URL}/Images/ricardo.jpg`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <Script
      id="gallery-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Visual Artwork (Product) Schema
interface VisualArtworkJsonLdProps {
  piece: Piece;
}

export function VisualArtworkJsonLd({ piece }: VisualArtworkJsonLdProps) {
  const mainImage = piece.images?.[0]?.url || "/Images/placeholder.jpg";

  const schema = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: piece.name,
    description: piece.description,
    image: mainImage.startsWith("http") ? mainImage : `${BASE_URL}${mainImage}`,
    dateCreated: (piece.year || 2025).toString(),
    artMedium: piece.technique,
    artworkSurface: "Ceramic",
    width: piece.dimensions,
    creator: {
      "@type": "Person",
      name: "Ricardo Escobar",
      url: `${BASE_URL}/en#artist`,
    },
    offers: piece.available
      ? {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "COP",
          seller: {
            "@type": "Organization",
            name: "Receramica",
          },
        }
      : undefined,
  };

  return (
    <Script
      id={`artwork-${piece.id}-jsonld`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Website Schema with Search Action
export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Recerámica",
    alternateName: "Ricardo Escobar Ceramics",
    url: BASE_URL,
    inLanguage: ["en", "es"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/en#gallery?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
