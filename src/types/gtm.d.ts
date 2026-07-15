declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: GTM dataLayer accepts mixed entry types (event objects and gtag argument arrays)
    dataLayer: any[];
    // biome-ignore lint/suspicious/noExplicitAny: gtag accepts arbitrary argument arrays
    gtag: (...args: any[]) => void;
  }
}

export {};
