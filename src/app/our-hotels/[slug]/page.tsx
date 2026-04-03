import Image from "next/image";
import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { BookingBar } from "@/components/booking/booking-bar";
import { TemplatePageLayout } from "@/components/templates";
import { getActiveTemplateId } from "@/lib/get-active-template";
import { getSiteConfig } from "@/lib/get-site-config";

type HotelDetailPageProps = {
  params: { slug: string };
};

export default async function HotelDetailPage({ params }: HotelDetailPageProps) {
  const [templateId, config] = await Promise.all([
    getActiveTemplateId(),
    getSiteConfig(),
  ]);

  const properties = config.content_id.properties;
  const hotel = properties.find(p => p.id === params.slug || p.name.toLowerCase().replace(/\s+/g, '-') === params.slug);

  if (!hotel) {
    return (
      <TemplatePageLayout templateId={templateId}>
        <Container as="main" className="pb-24 pt-32">
          <p className="text-sm opacity-60">
            Hotel not found. Please return to the hotel overview.
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
        {/* Hero */}
        <PageSection aria-labelledby="hotel-hero">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)] md:items-end">
            <div className="space-y-6">
              <p className="text-[10px] uppercase tracking-[0.28em] opacity-50">
                Our Hotels
              </p>
              <h1
                id="hotel-hero"
                className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl"
              >
                {hotel.name}
              </h1>
              <p className="text-xs uppercase tracking-[0.26em] opacity-50">
                {hotel.location}
              </p>
              <p className="max-w-xl text-sm md:text-base md:leading-relaxed opacity-70">
                {hotel.abstract}
              </p>
              <BookingBar
                primaryAction="book-stay"
                secondaryAction="check-availability"
                context={{ hotelSlug: hotel.id, audience: "leisure" }}
                label="Reservations & Availability"
              />
            </div>

            <AnimatedReveal as="div">
              <div className="relative h-52 overflow-hidden rounded-3xl border bg-zinc-900/80 sm:h-64">
                {hotel.image_url && (
                  <Image
                    src={hotel.image_url}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </AnimatedReveal>
          </div>
        </PageSection>

        {/* Highlights scaffold */}
        <PageSection aria-labelledby="hotel-highlights">
          <SectionHeading
            eyebrow="Highlights"
            title="Composed for Business Agendas and Personal Moments"
          />
          <div className="grid gap-4 md:grid-cols-3 text-xs opacity-70">
            <div className="rounded-2xl border p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] opacity-50">
                Meetings &amp; Events
              </p>
              <p className="mt-2 leading-relaxed">
                A ballroom and modular meeting suites supported by an onsite MICE team for high-level agendas.
              </p>
            </div>
            <div className="rounded-2xl border p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] opacity-50">
                Stays
              </p>
              <p className="mt-2 leading-relaxed">
                Rooms and suites that balance productivity with restorative calm.
              </p>
            </div>
            <div className="rounded-2xl border p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] opacity-50">
                Dining &amp; Wellness
              </p>
              <p className="mt-2 leading-relaxed">
                Dining, lounge, and wellness spaces designed for pauses between sessions and journeys.
              </p>
            </div>
          </div>
        </PageSection>
      </Container>
    </TemplatePageLayout>
  );
}
