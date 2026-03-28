"use server";

import { cookies } from "next/headers";
import { insforge } from "@/lib/insforge";
import { revalidatePath } from "next/cache";

export async function loginAction(formData: FormData) {
  const password = formData.get("password");
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return { success: true };
  }
  return { error: "Invalid password" };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return { success: true };
}

export async function updateSiteConfig(id: string, payload: any) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  
  if (!session || session.value !== "true") {
    throw new Error("Unauthorized");
  }

  const { error } = await insforge.database
    .from("site_config")
    .update({
      active_template: payload.active_template,
      locale: payload.locale,
      content_id: payload.content_id,
      content_en: payload.content_en,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin");

  return { success: true };
}