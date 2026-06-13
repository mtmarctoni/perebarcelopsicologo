import type { Metadata } from "next";
import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";

import { createPageMetadata } from "@/app/metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.contactLayout" });
  const host = (await headers()).get("host") || "";

  return await createPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/contact",
    imagePath: "/stock/personas-escuchando.webp",
    host,
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="pt-20">{children}</div>;
}
