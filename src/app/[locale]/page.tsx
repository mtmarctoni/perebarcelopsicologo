import type { Metadata } from "next";
import { use } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { createPageMetadata } from "@/app/metadata";
import HomeContent from "./_home-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.home" });

  return createPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/",
    locale,
  });
}

export default function HomePage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <HomeContent />;
}
