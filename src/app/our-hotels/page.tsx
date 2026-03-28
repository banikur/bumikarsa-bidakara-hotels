"use client";

import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { HotelCard3D } from "@/components/cards/hotel-card-3d";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { useLocale } from "@/contexts/locale-context";
import { getHotels } from "@/content/selectors";
import { homeCopy } from "@/content/home";

export default function OurHotelsPage() {
  const { locale } = useLocale();
  const hotels = getHotels(locale);
  const copy = homeCopy[locale];

  return (
    <Container
      as="main"
      className="flex flex-col gap-20 pb-24 pt-28 lg:gap-24 lg:pt-32"
    >
      <PageSection aria-labelledby="our-hotels-hero">
        <SectionHeading
          eyebrow={locale === "id" ? "Our Hotels" : "Our Hotels"}
          title={
            <span id="our-hotels-hero" className="inline-block">
              {copy.hotels.heading}
            </span>
          }
          description={copy.hotels.description}
        />
        <AnimatedReveal delay={0.15}>
          <p className="max-w-2xl text-xs text-zinc-400 md:text-sm md:leading-relaxed">
            {locale === "id"
              ? "Portofolio Bumikarsa Bidakara mencakup hotel bisnis, destinasi konferensi, dan retret elevasi yang merangkai efisiensi korporasi dengan kehangatan budaya Indonesia."
              : "The Bumikarsa Bidakara portfolio spans business hotels, conference-ready destinations, and elevated retreats that blend corporate efficiency with Indonesian warmth."}
          </p>
        </AnimatedReveal>
      </PageSection>

      <PageSection aria-labelledby="our-hotels-grid">
        <SectionHeading
          eyebrow={locale === "id" ? "Destinations" : "Destinations"}
          title={
            <span id="our-hotels-grid" className="inline-block">
              {locale === "id"
                ? "Temukan Hotel yang Selaras dengan Agenda Anda"
                : "Discover the Hotel that Fits Your Agenda"}
            </span>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <HotelCard3D
              key={hotel.slug}
              name={hotel.name}
              location={hotel.location}
              summary={hotel.summary}
              tag={hotel.tag}
              href={`/our-hotels/${hotel.slug}`}
            />
          ))}
        </div>
      </PageSection>
    </Container>
  );
}

