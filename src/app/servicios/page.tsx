import type { Metadata } from "next";

import { createPageMetadata } from "@/app/metadata";
import ServiciosContent from "./_servicios-content";

export const metadata: Metadata = createPageMetadata({
  title: "Servicios | Pere Barcelo - Psicologo Deportivo",
  description:
    "No es que no tengas nivel. Es que no compites igual que entrenas. Psicologia deportiva para deportistas que se bloquean en competicion.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return <ServiciosContent />;
}
