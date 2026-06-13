import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { createPageMetadata } from "@/app/metadata";
import PrivacyContent from "./_privacy-content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.privacy" });

  return await createPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/privacy",
  });
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
