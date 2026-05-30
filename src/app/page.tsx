import type { Metadata } from "next";

import { createPageMetadata } from "@/app/metadata";
import HomeContent from "./_home-content";

export const metadata: Metadata = createPageMetadata({
  title: "Psicologo deportivo | Pere Barcelo",
  description:
    "Entrenas bien. Pero cuando compites, algo cambia. Psicologia deportiva para competir al nivel al que entrenas, incluso bajo presion.",
  path: "/",
  imagePath: "/wp/home-hero.webp",
});

export default function Home() {
  return <HomeContent />;
}
