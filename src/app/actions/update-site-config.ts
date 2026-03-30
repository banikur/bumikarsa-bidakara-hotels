"use server";

import { revalidatePath } from "next/cache";
import { insforge } from "@/lib/insforge";
import { UniversalContent, TemplateId } from "@/types/cms.types";

interface UpdateConfigPayload {
  active_template: TemplateId;
  content_id: UniversalContent;
  content_en: UniversalContent;
}

export async function updateSiteConfig(payload: UpdateConfigPayload): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Validate payload basics
    if (!payload.active_template || !payload.content_id || !payload.content_en) {
      return { success: false, error: "Missing required payload fields." };
    }

    // 2. Update database row where id = 1
    const { error } = await insforge.database
      .from("site_config")
      .update({
        active_template: payload.active_template,
        content_id: payload.content_id,
        content_en: payload.content_en,
      })
      .eq("id", 1);

    if (error) {
      console.error("InsForge Update Error:", error);
      return { success: false, error: error.message };
    }

    // 3. Invalidate public landing page cache
    revalidatePath("/");

    // 4. Return success
    return { success: true };
  } catch (err: any) {
    console.error("Server Action Exception:", err);
    return { success: false, error: String(err.message || err) };
  }
}
