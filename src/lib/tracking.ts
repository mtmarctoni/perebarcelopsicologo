export function buildDataAttrs(track?: string, trackLocation?: string, trackLabel?: string) {
  const attrs: Record<string, string | undefined> = {};
  if (track) attrs["data-track"] = track;
  if (trackLocation) attrs["data-track-location"] = trackLocation;
  if (trackLabel) attrs["data-track-label"] = trackLabel;
  return attrs as Record<string, string>;
}

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
