import { UniversalContent } from "@/types/cms.types";

export const DEFAULT_CONTENT: UniversalContent = {
  hero: {
    headline: "",
    subtitle: "",
    description: "",
    cta_primary: "",
    cta_secondary: "",
    background_image_url: "",
  },
  properties: [],
  features: [],
  offers: [],
  membership: {
    headline: "",
    description: "",
    tiers: [],
  },
  contact: {
    phone: "",
    email: "",
    address: "",
    maps_url: "",
    footer_tagline: "",
  },
};
