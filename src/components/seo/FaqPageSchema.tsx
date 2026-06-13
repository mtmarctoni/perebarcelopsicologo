import { getTranslations } from "next-intl/server";
import JsonLd from "./JsonLd";

type Props = {
  locale: string;
};

export default async function FaqPageSchema({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "ServiciosFaqSection" });

  const faqs = [
    { question: t("faq1Q"), answer: t("faq1A") },
    { question: t("faq2Q"), answer: t("faq2A") },
    { question: t("faq3Q"), answer: t("faq3A") },
  ];

  return (
    <JsonLd
      id="faq-schema"
      code={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}
