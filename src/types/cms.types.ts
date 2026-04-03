export type TemplateId = 'warm-earthy' | 'cinematic' | 'membership' | 'mice' | 'corporate';

export interface HeroContent {
  headline: string;
  subtitle: string;
  description: string;
  cta_primary: string;
  cta_secondary: string;
  background_image_url: string;
}

export interface PropertyItem {
  id: string;           // uuid or nanoid — required for list keying
  name: string;
  location: string;
  abstract: string;
  image_url: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  capacity?: number;    // used by MICE template only
  image_url: string;
}

export interface OfferItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  image_url: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  benefits: string[];   // simple string array
}

export interface MembershipContent {
  headline: string;
  description: string;
  tiers: MembershipTier[];
}

export interface ContactContent {
  phone: string;
  email: string;
  address: string;
  maps_url: string;
  footer_tagline: string;
}

export interface SubpageHeader {
  title: string;
  description: string;
}

export interface UniversalContent {
  hero: HeroContent;
  properties: PropertyItem[];
  features: FeatureItem[];
  offers: OfferItem[];
  membership: MembershipContent;
  contact: ContactContent;
  pages?: {
    ourHotels: SubpageHeader;
    experiences: SubpageHeader;
    offers: SubpageHeader;
    membership: SubpageHeader;
    contact: SubpageHeader;
    stories: SubpageHeader;
  };
}

export interface SiteConfig {
  id: string;
  active_template: TemplateId;
  content_id: UniversalContent;   // Bahasa Indonesia
  content_en: UniversalContent;   // English
  updated_at: string;
}
