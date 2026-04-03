import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { TemplatePageLayout } from "@/components/templates";
import { getActiveTemplateId } from "@/lib/get-active-template";
import { getSiteConfig } from "@/lib/get-site-config";

type ExperienceDetailPageProps = {
  params: { type: string };
};

export default async function ExperienceDetailPage({ params }: ExperienceDetailPageProps) {
  const [templateId, config] = await Promise.all([
    getActiveTemplateId(),
    getSiteConfig(),
  ]);

  const features = config.content_id.features;
  const experience = features.find(f => f.id === params.type);

  if (!experience) {
    return (
      <TemplatePageLayout templateId={templateId}>
        <Container as="main" className="pb-24 pt-32">
          <p className="text-sm opacity-60">
            Experience not found. Please return to the experiences overview.
          </p>
        </Container>
      </TemplatePageLayout>
    );
  }

  return (
    <TemplatePageLayout templateId={templateId}>
      <Container
        as="main"
        className="flex flex-col gap-20 pb-24 pt-28 lg:gap-24 lg:pt-32"
      >
        <PageSection aria-labelledby="experience-hero">
          <div className="max-w-3xl space-y-6">
            <p className="text-[10px] uppercase tracking-[0.28em] opacity-50">
              Experiences
            </p>
            <h1
              id="experience-hero"
              className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl"
            >
              {experience.title}
            </h1>
            <AnimatedReveal delay={0.14}>
              <p className="max-w-2xl text-sm md:text-base md:leading-relaxed opacity-70">
                {experience.description}
              </p>
            </AnimatedReveal>
          </div>
        </PageSection>

        <PageSection aria-labelledby="experience-details">
          <SectionHeading
            eyebrow="Details"
            title={`About ${experience.title}`}
          />
          <div className="max-w-3xl space-y-4 text-sm opacity-70">
            <p>
              Experience the finest {experience.title.toLowerCase()} at Bumikarsa Bidakara Hotels. 
              Our dedicated team ensures every detail is crafted to exceed expectations.
            </p>
            <p>
              Contact our central reservations team to learn more about availability, 
              pricing, and bespoke arrangements for your event.
            </p>
          </div>
        </PageSection>
      </Container>
    </TemplatePageLayout>
  );
}
