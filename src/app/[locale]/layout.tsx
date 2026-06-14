import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

const CookiebotHead = ({ cbid }: { cbid: string }) => (
  <Script
    id="Cookiebot"
    src="https://consent.cookiebot.com/uc.js"
    data-cbid={cbid}
    type="text/javascript"
    strategy="afterInteractive"
  />
);

const GTMHead = ({ gtmId }: { gtmId: string }) => (
  <Script
    id="gtm-script"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `,
    }}
  />
);

const GTMBody = ({ gtmId }: { gtmId: string }) => (
  <noscript
    dangerouslySetInnerHTML={{
      __html: `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `,
    }}
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

  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <head>
        {cookiebotCbid && <CookiebotHead cbid={cookiebotCbid} />}
        {gtmId && <GTMHead gtmId={gtmId} />}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        {gtmId && <GTMBody gtmId={gtmId} />}
        <Providers>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
