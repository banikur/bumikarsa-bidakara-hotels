import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StoryCard } from "@/components/home/story-card";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { TemplatePageLayout } from "@/components/templates";
import { getActiveTemplateId } from "@/lib/get-active-template";
import { getSiteConfig } from "@/lib/get-site-config";

export default async function StoriesPage() {
  const [templateId, config] = await Promise.all([
    getActiveTemplateId(),
    getSiteConfig(),
  ]);

  const pages = config.content_id.pages;

  return (
    <TemplatePageLayout templateId={templateId}>
      <Container
        as="main"
        className="flex flex-col gap-20 pb-24 pt-28 lg:gap-24 lg:pt-32"
      >
        <PageSection aria-labelledby="stories-hero">
          <SectionHeading
            eyebrow="Stories"
            title={pages?.stories?.title || "Notes from Across the Archipelago"}
            description={pages?.stories?.description || "Short journals on cities, people, and quiet moments."}
          />
          <AnimatedReveal delay={0.15}>
            <p className="max-w-2xl text-xs md:text-sm md:leading-relaxed opacity-60">
              Stories from the heart of the archipelago—about people, places, and the quiet moments that make hospitality meaningful.
            </p>
          </AnimatedReveal>
        </PageSection>

        <PageSection aria-labelledby="stories-grid">
          <SectionHeading
            eyebrow="Journal"
            title="Latest Stories"
          />
          <div className="grid gap-4 md:grid-cols-3">
            <p className="col-span-full text-sm opacity-60">
              Stories coming soon. Check back for updates from Bumikarsa Bidakara.
            </p>
          </div>
        </PageSection>
      </Container>
    </TemplatePageLayout>
  );
}
