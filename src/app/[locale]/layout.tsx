import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import "../globals.css";
import Footer from "@/components/core/Footer";
import Navbar from "@/components/core/NavBar";
import CookieBanner from "@/components/privacy/CookieBanner";
import GoogleTagManager from "@/components/privacy/GoogleTagManager";
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

  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const initialTheme = themeCookie === "dark" ? "dark" : "light";

  return (
    <html
      lang={locale}
      className={`scroll-smooth bg-background ${initialTheme === "dark" ? "dark" : ""}`}
      suppressHydrationWarning
    >
      <head>
        {gtmId && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          </>
        )}
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        <Providers initialTheme={initialTheme}>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <div className="flex flex-col min-h-screen flex-grow">{children}</div>
            <Footer />
            <CookieBanner />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
