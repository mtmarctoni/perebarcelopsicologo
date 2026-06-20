import { use } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/app/metadata";
import { images } from "@/config/images";
import AboutContent from "./_about-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.about" });

  return createPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/about",
    locale,
    imagePath: images.profilePhoto,
  });
}

export default function AboutPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <AboutContent />;
}
