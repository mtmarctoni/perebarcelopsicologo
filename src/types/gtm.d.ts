type DataLayerEvent = {
  event: "generate_lead" | "calendly_scheduled";
  leadSource?: string;
};

declare global {
  interface Window {
    dataLayer: Array<DataLayerEvent>;
  }
}

export {};
