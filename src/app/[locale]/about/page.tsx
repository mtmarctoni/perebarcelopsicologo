import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { createPageMetadata } from "@/app/metadata";
import AboutContent from "./_about-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.about" });

  return await createPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/about",
    imagePath: "/wp/profile-photo.webp",
  });
}

export default function AboutPage() {
  return <AboutContent />;
}
