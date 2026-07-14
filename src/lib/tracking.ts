export type TrackEvent = {
  event: string;
  label?: string;
  location?: string;
  [key: string]: unknown;
};

export function trackEvent(e: TrackEvent): void {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push(e);
  }
}
