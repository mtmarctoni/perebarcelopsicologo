import type { Metadata } from "next";

import { createPageMetadata } from "@/app/metadata";
import PrivacyContent from "./_privacy-content";

export const metadata: Metadata = createPageMetadata({
  title: "Politica de Privacidad | Pere Barcelo - Psicologo Deportivo",
  description:
    "Informacion sobre el tratamiento de datos personales, cookies y derechos de los usuarios en el sitio web de Pere Barcelo Psicologo.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PrivacyContent />;
}
