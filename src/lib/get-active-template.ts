import { getSiteConfig } from "@/lib/get-site-config";
import { TemplateId } from "@/types/cms.types";

export async function getActiveTemplateId(): Promise<TemplateId> {
  try {
    const config = await getSiteConfig();
    return config.active_template as TemplateId;
  } catch {
    return "warm-earthy";
  }
}
