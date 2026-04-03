import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { HotelCard3D } from "@/components/cards/hotel-card-3d";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { TemplatePageLayout } from "@/components/templates";
import { getActiveTemplateId } from "@/lib/get-active-template";
import { getSiteConfig } from "@/lib/get-site-config";

export default async function OurHotelsPage() {
  const [templateId, config] = await Promise.all([
    getActiveTemplateId(),
    getSiteConfig(),
  ]);

  const pages = config.content_id.pages;
  const properties = config.content_id.properties;

  return (
    <TemplatePageLayout templateId={templateId}>
      <Container
        as="main"
        className="flex flex-col gap-20 pb-24 pt-28 lg:gap-24 lg:pt-32"
      >
        <PageSection aria-labelledby="our-hotels-hero">
          <SectionHeading
            eyebrow="Our Hotels"
            title={pages?.ourHotels?.title || "Our Destinations"}
            description={pages?.ourHotels?.description || "Discover our portfolio of hotels across Indonesia."}
          />
          <AnimatedReveal delay={0.15}>
            <p className="max-w-2xl text-xs md:text-sm md:leading-relaxed opacity-60">
              The Bumikarsa Bidakara portfolio spans business hotels, conference-ready destinations, and elevated retreats that blend corporate efficiency with Indonesian warmth.
            </p>
          </AnimatedReveal>
        </PageSection>

        <PageSection aria-labelledby="our-hotels-grid">
          <SectionHeading
            eyebrow="Destinations"
            title="Discover the Hotel that Fits Your Agenda"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((hotel) => (
              <HotelCard3D
                key={hotel.id}
                name={hotel.name}
                location={hotel.location}
                summary={hotel.abstract}
                href={`/our-hotels/${hotel.id}`}
              />
            ))}
          </div>
        </PageSection>
      </Container>
    </TemplatePageLayout>
  );
}
