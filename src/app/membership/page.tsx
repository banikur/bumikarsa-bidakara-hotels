import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { MembershipSpotlight } from "@/components/home/membership-spotlight";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { TemplatePageLayout } from "@/components/templates";
import { getActiveTemplateId } from "@/lib/get-active-template";
import { getSiteConfig } from "@/lib/get-site-config";

export default async function MembershipPage() {
  const [templateId, config] = await Promise.all([
    getActiveTemplateId(),
    getSiteConfig(),
  ]);

  const pages = config.content_id.pages;
  const membership = config.content_id.membership;

  return (
    <TemplatePageLayout templateId={templateId}>
      <Container
        as="main"
        className="flex flex-col gap-20 pb-24 pt-28 lg:gap-24 lg:pt-32"
      >
        <PageSection aria-labelledby="membership-hero">
          <SectionHeading
            eyebrow="Membership"
            title={pages?.membership?.title || "Bumikarsa Member Circle 2.0"}
            description={pages?.membership?.description || "Layered benefits for your travel rhythm."}
          />
          <AnimatedReveal delay={0.15}>
            <p className="max-w-2xl text-xs md:text-sm md:leading-relaxed opacity-60">
              Unlock privileged rates, dedicated service, and exclusive upgrades designed for how you actually travel.
            </p>
          </AnimatedReveal>
        </PageSection>

        <PageSection aria-labelledby="membership-benefits">
          <SectionHeading
            eyebrow="Benefits"
            title={membership?.headline || "Beyond Points and Status"}
            description={membership?.description}
          />
          <MembershipSpotlight
            title={membership?.headline || "Beyond Points and Status"}
            subtitle={membership?.description || ""}
            bullets={membership?.tiers?.[0]?.benefits || []}
            description={membership?.description || ""}
          />
        </PageSection>
      </Container>
    </TemplatePageLayout>
  );
}
