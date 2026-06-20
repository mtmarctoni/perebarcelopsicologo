import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import "../globals.css";
import Footer from "@/components/core/Footer";
import Navbar from "@/components/core/NavBar";
import { clientEnv } from "@/config/client-env.config";
import { routing } from "@/i18n/routing";
import { createPageMetadata } from "../metadata";
import { Providers } from "../providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const CookiebotScript = ({ cbid }: { cbid: string }) => (
  <Script
    id="Cookiebot"
    src="https://consent.cookiebot.com/uc.js"
    data-cbid={cbid}
    data-blockingmode="auto"
    type="text/javascript"
    strategy="lazyOnload"
  />
);

const GtmScript = ({ gtmId }: { gtmId: string }) => (
  <Script
    id="gtm"
    src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
    strategy="lazyOnload"
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
      <head>
        {/* Preconnect to critical third-party origins for faster resource loading.
            Place preconnect hints before any preload/resource links to ensure the
            browser initiates TCP/TLS handshakes early. */}
        {gtmId && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          </>
        )}
        {cookiebotCbid && (
          <>
            <link rel="preconnect" href="https://consent.cookiebot.com" />
            <link rel="dns-prefetch" href="https://consent.cookiebot.com" />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        {cookiebotCbid && <CookiebotScript cbid={cookiebotCbid} />}
        {gtmId && <GtmScript gtmId={gtmId} />}
        <Providers initialTheme={initialTheme}>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <div className="flex flex-col min-h-screen flex-grow">{children}</div>
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
