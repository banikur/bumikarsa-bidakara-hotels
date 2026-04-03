import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExperienceCard } from "@/components/cards/experience-card";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { TemplatePageLayout } from "@/components/templates";
import { getActiveTemplateId } from "@/lib/get-active-template";
import { getSiteConfig } from "@/lib/get-site-config";

export default async function ExperiencesPage() {
  const [templateId, config] = await Promise.all([
    getActiveTemplateId(),
    getSiteConfig(),
  ]);

  const pages = config.content_id.pages;
  const features = config.content_id.features;

  return (
    <TemplatePageLayout templateId={templateId}>
      <Container
        as="main"
        className="flex flex-col gap-20 pb-24 pt-28 lg:gap-24 lg:pt-32"
      >
        <PageSection aria-labelledby="experiences-hero">
          <SectionHeading
            eyebrow="Experiences"
            title={pages?.experiences?.title || "Four Pillars of Bumikarsa Experiences"}
            description={pages?.experiences?.description || "Every experience is crafted with intention."}
          />
          <AnimatedReveal delay={0.15}>
            <p className="max-w-2xl text-xs md:text-sm md:leading-relaxed opacity-60">
              From executive meetings to wedding celebrations, from Nusantara cuisine to wellness rituals—each experience is designed with intention and executed with precision.
            </p>
          </AnimatedReveal>
        </PageSection>

        <PageSection aria-labelledby="experiences-grid">
          <SectionHeading
            eyebrow="Categories"
            title="Curated Experiences"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((exp) => (
              <ExperienceCard
                key={exp.id}
                type={exp.id as "meetings" | "weddings" | "dining" | "wellness"}
                title={exp.title}
                description={exp.description}
              />
            ))}
          </div>
        </PageSection>
      </Container>
    </TemplatePageLayout>
  );
}
