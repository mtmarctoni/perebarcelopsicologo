import type { Metadata } from "next";

import { createPageMetadata } from "@/app/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contacto y reserva | Pere Barceló",
  description:
    "Contacta con Pere Barceló para resolver dudas, pedir informacion o reservar una primera llamada sobre psicologia deportiva.",
  path: "/contact",
  imagePath: "/stock/personas-escuchando.webp",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="pt-20">{children}</div>;
}
