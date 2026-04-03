import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactMapPreview } from "@/components/home/contact-map-preview";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { TemplatePageLayout } from "@/components/templates";
import { getActiveTemplateId } from "@/lib/get-active-template";
import { getSiteConfig } from "@/lib/get-site-config";

export default async function ContactPage() {
  const [templateId, config] = await Promise.all([
    getActiveTemplateId(),
    getSiteConfig(),
  ]);

  const pages = config.content_id.pages;
  const contact = config.content_id.contact;

  return (
    <TemplatePageLayout templateId={templateId}>
      <Container
        as="main"
        className="flex flex-col gap-20 pb-24 pt-28 lg:gap-24 lg:pt-32"
      >
        <PageSection aria-labelledby="contact-hero">
          <SectionHeading
            eyebrow="Contact"
            title={pages?.contact?.title || "Get In Touch"}
            description={pages?.contact?.description || "Our central team is ready to assist you."}
          />
          <AnimatedReveal delay={0.14}>
            <p className="max-w-2xl text-xs md:text-sm md:leading-relaxed opacity-60">
              From individual reservations to large-scale MICE, our central team will connect you with the property and offer that best fits your needs.
            </p>
          </AnimatedReveal>
        </PageSection>

        <PageSection aria-labelledby="contact-locations">
          <SectionHeading
            eyebrow="Locations"
            title="Three Cities, One Seamless Team"
          />
          <ContactMapPreview
            title={contact?.footer_tagline || "Soulful Indonesian Hospitality"}
            description={contact?.address || ""}
            primaryCta="Contact Us"
            secondaryCta="View Locations"
          />
        </PageSection>
      </Container>
    </TemplatePageLayout>
  );
}
