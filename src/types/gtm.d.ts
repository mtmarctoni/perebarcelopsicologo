// Global type declaration for Google Tag Manager dataLayer
// Used by GTM, GA4, Google Ads, and Cookiebot Consent Mode

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

export {};
