import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export default async function LocaleNotFound() {
  const t = await getTranslations({ locale: routing.defaultLocale, namespace: "NotFound" });

  return (
    <main className="flex flex-col items-center justify-center flex-1 px-5 text-center">
      <span className="text-8xl sm:text-9xl font-bold text-secondary/30 select-none">404</span>
      <h1 className="text-3xl sm:text-4xl font-bold text-text-dark tracking-tight mb-4">
        {t("title")}
      </h1>
      <p className="text-text-light text-lg max-w-md mb-8">{t("description")}</p>
      <Link
        href="/"
        className="bg-secondary text-text-dark dark:text-[#0f172a] font-bold rounded-full px-8 py-4 hover:shadow-glow transition-all"
      >
        {t("goHome")}
      </Link>
    </main>
  );
}
