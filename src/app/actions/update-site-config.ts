"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { insforge } from "@/lib/insforge";
import { UniversalContent, TemplateId } from "@/types/cms.types";

interface UpdateConfigPayload {
  active_template: TemplateId;
  content_id: UniversalContent;
  content_en: UniversalContent;
}

export async function updateSiteConfig(payload: UpdateConfigPayload): Promise<{ success: boolean; error?: string }> {
  try {
    // 0. Authentication check - verify admin session cookie
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (!session || session.value !== "true") {
      return { success: false, error: "Unauthorized: Admin access required." };
    }

    // 1. Validate payload basics
    if (!payload.active_template || !payload.content_id || !payload.content_en) {
      return { success: false, error: "Missing required payload fields." };
    }

    // 2. Update the first (and only) row in site_config
    const { data: existingData, error: fetchError } = await insforge.database
      .from("site_config")
      .select("id")
      .limit(1)
      .single();

    if (fetchError || !existingData) {
      console.error("InsForge Fetch Error:", fetchError);
      return { success: false, error: "No site_config row found in database." };
    }

    const { error } = await insforge.database
      .from("site_config")
      .update({
        active_template: payload.active_template,
        content_id: payload.content_id,
        content_en: payload.content_en,
      })
      .eq("id", existingData.id);

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
