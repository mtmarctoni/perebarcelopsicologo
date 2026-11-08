import { images } from "@/config/images";
import { getCanonicalUrl } from "@/lib/site";

import JsonLd from "./JsonLd";

const canonicalUrl = getCanonicalUrl();

export const WebsiteSchema = () => {
  return (
    <JsonLd
      id="website-schema"
      code={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Pere Barceló - Psicólogo Deportivo Online",
        url: canonicalUrl,
      }}
    />
  );
};

export const PersonSchema = () => {
  return (
    <JsonLd
      id="person-schema"
      code={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Pere Barceló Lambea",
        image: `${canonicalUrl}${images.ogDefault}`,
        "@id": `${canonicalUrl}#person`,
        url: canonicalUrl,
        telephone: "+34636674759",
        sameAs: [
          "https://www.linkedin.com/in/pere-barcel%C3%B3-lambea-6b5255192/",
          "https://www.instagram.com/perebarcelopsico/",
        ],
      }}
    />
  );
};
