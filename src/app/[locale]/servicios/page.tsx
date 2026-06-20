import { use } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { createPageMetadata } from "@/app/metadata";
import FaqPageSchema from "@/components/seo/FaqPageSchema";
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
    locale,
  });
}

export default function ServiciosPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <FaqPageSchema locale={locale} />
      <ServiciosContent />
    </>
  );
}
