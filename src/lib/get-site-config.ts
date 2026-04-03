import { insforge } from "./insforge";
import { SiteConfig, UniversalContent } from "@/types/cms.types";
import { DEFAULT_CONTENT } from "./default-content";

// Helper to deep merge default content
function deepMerge(data: any): UniversalContent {
  if (!data || typeof data !== "object") return DEFAULT_CONTENT;

  return {
    hero: { ...DEFAULT_CONTENT.hero, ...data.hero },
    properties: Array.isArray(data.properties) ? data.properties : DEFAULT_CONTENT.properties,
    features: Array.isArray(data.features) ? data.features : DEFAULT_CONTENT.features,
    offers: Array.isArray(data.offers) ? data.offers : DEFAULT_CONTENT.offers,
    membership: { ...DEFAULT_CONTENT.membership, ...data.membership },
    contact: { ...DEFAULT_CONTENT.contact, ...data.contact },
    pages: { ...DEFAULT_CONTENT.pages, ...data.pages },
  };
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const { data, error } = await insforge.database
    .from("site_config")
    .select("*")
    .limit(1)
    .single();

  if (error || !data) {
    // If table is totally empty, return a safe fallback object locally
    return {
      id: "fallback-uuid",
      active_template: "warm-earthy",
      content_id: DEFAULT_CONTENT,
      content_en: DEFAULT_CONTENT,
      updated_at: new Date().toISOString(),
    };
  }

  // Parse JSON and apply fallback merging just in case
  const contentId = typeof data.content_id === "string" ? JSON.parse(data.content_id) : data.content_id;
  const contentEn = typeof data.content_en === "string" ? JSON.parse(data.content_en) : data.content_en;

  return {
    id: data.id,
    active_template: data.active_template,
    content_id: deepMerge(contentId),
    content_en: deepMerge(contentEn),
    updated_at: data.updated_at,
  };
}
