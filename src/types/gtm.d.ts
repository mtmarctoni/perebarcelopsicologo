type DataLayerEvent = {
  event: string;
  label?: string;
  location?: string;
  leadSource?: string;
};

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
  }
}

export {};
