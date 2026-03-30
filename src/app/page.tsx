import { getSiteConfig } from "@/lib/get-site-config";
import { TEMPLATE_MAP, TemplateId } from "@/components/templates";

// Add ISR revalidation so the page is cached and only rebuilt when via revalidatePath
export const revalidate = false;

export default async function HomePage() {
  const config = await getSiteConfig();
  
  // Using ID language as default for now. Bilingual support will be handled via LocaleContext in the future if needed public-side.
  const content = config.content_id; 

  const activeTemplateId = config.active_template as TemplateId;
  const ActiveTemplate = TEMPLATE_MAP[activeTemplateId] || TEMPLATE_MAP["warm-earthy"];

  return (
    <main className="min-h-screen bg-background">
      <ActiveTemplate copy={content} />
    </main>
  );
}
