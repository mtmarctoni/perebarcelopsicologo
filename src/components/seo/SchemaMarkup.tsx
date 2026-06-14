import { getSiteUrl } from "@/lib/site";

import JsonLd from "./JsonLd";

const siteUrl = getSiteUrl();

export const WebsiteSchema = () => {
  return (
    <JsonLd
      id="website-schema"
      code={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Pere Barceló - Psicólogo Deportivo",
        url: siteUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
};

export const LocalBusinessSchema = () => {
  return (
    <JsonLd
      id="local-business-schema"
      code={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Pere Barceló - Psicólogo Deportivo",
        image: `${siteUrl}/stock/alcanza-tu-objetivo.webp`,
        "@id": siteUrl,
        url: siteUrl,
        telephone: "+34636674759",
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Carrer de la Indústria, 12",
          addressLocality: "Palma",
          postalCode: "07013",
          addressCountry: "ES",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 39.5742,
          longitude: 2.6549,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "20:00",
        },
        sameAs: [
          "https://www.linkedin.com/in/pere-barcel%C3%B3-lambea-6b5255192/",
          "https://www.instagram.com/perebarcelopsico/",
        ],
      }}
    />
  );
};
