import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { OfferHighlight } from "@/components/home/offer-highlight";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { TemplatePageLayout } from "@/components/templates";
import { getActiveTemplateId } from "@/lib/get-active-template";
import { getSiteConfig } from "@/lib/get-site-config";

export default async function OffersPage() {
  const [templateId, config] = await Promise.all([
    getActiveTemplateId(),
    getSiteConfig(),
  ]);

  const pages = config.content_id.pages;
  const offers = config.content_id.offers;

  return (
    <TemplatePageLayout templateId={templateId}>
      <Container
        as="main"
        className="flex flex-col gap-20 pb-24 pt-28 lg:gap-24 lg:pt-32"
      >
        <PageSection aria-labelledby="offers-hero">
          <SectionHeading
            eyebrow="Offers & Packages"
            title={pages?.offers?.title || "Packages Ready to be Tailored"}
            description={pages?.offers?.description || "Offers designed for value, not noise."}
          />
          <AnimatedReveal delay={0.15}>
            <p className="max-w-2xl text-xs md:text-sm md:leading-relaxed opacity-60">
              Every package can be curated to your specific needs—from corporate retreats to intimate weddings, from weekend escapes to wellness journeys.
            </p>
          </AnimatedReveal>
        </PageSection>

        <PageSection aria-labelledby="offers-grid">
          <SectionHeading
            eyebrow="Curated Offers"
            title="Packages Ready to be Tailored"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {offers.map((offer) => (
              <OfferHighlight
                key={offer.id}
                title={offer.title}
                label={offer.badge || ""}
                description={offer.subtitle}
                href="/offers"
              />
            ))}
          </div>
        </PageSection>
      </Container>
    </TemplatePageLayout>
  );
}
