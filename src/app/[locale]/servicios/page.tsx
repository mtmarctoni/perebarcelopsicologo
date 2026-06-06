import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { createPageMetadata } from "@/app/metadata";
import ServiciosContent from "./_servicios-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.servicios" });

  return createPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/servicios",
  });
}

export default function ServiciosPage() {
  return <ServiciosContent />;
}
