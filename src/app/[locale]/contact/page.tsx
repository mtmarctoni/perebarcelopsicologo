import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { createPageMetadata } from "@/app/metadata";
import ContactContent from "./_contact-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.contact" });

  return await createPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/contact",
  });
}

export default function ContactPage() {
  return <ContactContent />;
}
