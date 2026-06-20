import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import "../globals.css";
import { clientEnv } from "@/config/client-env.config";
import { routing } from "@/i18n/routing";
import { createPageMetadata } from "../metadata";
import { Providers } from "../providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const CookiebotScript = ({ cbid }: { cbid: string }) => (
  <Script
    id="Cookiebot"
    src="https://consent.cookiebot.com/uc.js"
    data-cbid={cbid}
    data-blockingmode="auto"
    type="text/javascript"
    strategy="beforeInteractive"
  />
);

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return createPageMetadata({
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    path: "/",
    locale,
  });
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f8fafc",
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const gtmId = clientEnv.NEXT_PUBLIC_GTM_ID;
  const cookiebotCbid = clientEnv.NEXT_PUBLIC_COOKIEBOT_CBID;

  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const initialTheme = themeCookie === "dark" ? "dark" : "light";

  return (
    <html
      lang={locale}
      className={`scroll-smooth bg-background ${initialTheme === "dark" ? "dark" : ""}`}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        {cookiebotCbid && (
          <>
            <link rel="preconnect" href="https://consent.cookiebot.com" />
            <link rel="dns-prefetch" href="https://consent.cookiebot.com" />
            <CookiebotScript cbid={cookiebotCbid} />
          </>
        )}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        <Providers initialTheme={initialTheme}>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
