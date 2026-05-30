import type { Metadata } from "next";

import { createPageMetadata } from "@/app/metadata";
import ContactContent from "./_contact-content";

export const metadata: Metadata = createPageMetadata({
  title: "Contacto | Pere Barcelo - Psicologo Deportivo",
  description:
    "Contacta con Pere Barcelo, psicologo deportivo especializado en alto rendimiento. Primera sesion gratuita y sin compromiso.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
