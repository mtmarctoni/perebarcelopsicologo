type DataLayerEvent = {
  event: "generate_lead";
  leadSource?: string;
};

declare global {
  interface Window {
    dataLayer: Array<DataLayerEvent>;
  }
}

export {};
