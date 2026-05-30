import type { Metadata } from "next";

import { createPageMetadata } from "@/app/metadata";
import AboutContent from "./_about-content";

export const metadata: Metadata = createPageMetadata({
  title: "Sobre mi | Pere Barcelo - Psicologo Deportivo",
  description:
    "Si sabes que puedes rendir mas, esto no va de entrenar mas. Conoce a Pere Barcelo, psicologo deportivo especializado en rendimiento bajo presion.",
  path: "/about",
  imagePath: "/wp/profile-photo.webp",
});

export default function AboutPage() {
  return <AboutContent />;
}
