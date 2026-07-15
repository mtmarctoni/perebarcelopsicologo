"use client";

import Script from "next/script";

type Props = {
  gtmId: string;
};

export default function GoogleTagManager({ gtmId }: Props) {
  return (
    <>
      <Script
        id="gtm-consent-default"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied'
});
if (document.cookie.indexOf('cookie_consent=accepted') !== -1) {
  gtag('consent', 'update', {
    'ad_storage': 'granted',
    'ad_user_data': 'granted',
    'ad_personalization': 'granted',
    'analytics_storage': 'granted'
  });
}
window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
`,
        }}
      />
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
      />
      <noscript>
        <iframe
          title="Google Tag Manager"
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
