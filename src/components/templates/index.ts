// Template export map
// Each template receives a `copy` prop matching the UniversalContent shape

export { TemplateWarmEarthy } from "./template-warm-earthy";
export { TemplateCinematic } from "./template-cinematic";
export { TemplateMembership } from "./template-membership";
export { TemplateMice } from "./template-mice";

// Template ID → Component map (used by page.tsx)
import { TemplateWarmEarthy } from "./template-warm-earthy";
import { TemplateCinematic } from "./template-cinematic";
import { TemplateMembership } from "./template-membership";
import { TemplateMice } from "./template-mice";
import type { ComponentType } from "react";
import { UniversalContent, TemplateId } from "@/types/cms.types";

export const TEMPLATE_MAP: Record<TemplateId, ComponentType<{ copy: UniversalContent }>> = {
  "warm-earthy": TemplateWarmEarthy,
  cinematic: TemplateCinematic,
  membership: TemplateMembership,
  mice: TemplateMice,
  // Corporate falls back to warm-earthy until its own template is built
  corporate: TemplateWarmEarthy,
};

// Export the page layout wrapper for isolated page mode
export { TemplatePageLayout } from "./template-page-layout";
export type { TemplateId } from "@/types/cms.types";
