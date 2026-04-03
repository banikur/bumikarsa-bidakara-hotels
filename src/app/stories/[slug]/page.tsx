import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { TemplatePageLayout } from "@/components/templates";
import { getActiveTemplateId } from "@/lib/get-active-template";

type StoryDetailPageProps = {
  params: { slug: string };
};

export default async function StoryDetailPage({ params }: StoryDetailPageProps) {
  const templateId = await getActiveTemplateId();

  return (
    <TemplatePageLayout templateId={templateId}>
      <Container
        as="main"
        className="flex flex-col gap-20 pb-24 pt-28 lg:gap-24 lg:pt-32"
      >
        <PageSection aria-labelledby="story-hero">
          <div className="max-w-3xl space-y-6">
            <p className="text-[10px] uppercase tracking-[0.28em] opacity-50">
              Stories
            </p>
            <h1
              id="story-hero"
              className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl"
            >
              Story Detail
            </h1>
            <p className="text-sm opacity-60">
              Stories content is coming soon. Check back for updates from Bumikarsa Bidakara.
            </p>
          </div>
        </PageSection>
      </Container>
    </TemplatePageLayout>
  );
}
