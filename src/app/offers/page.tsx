"use client";

import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { OfferHighlight } from "@/components/home/offer-highlight";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { useLocale } from "@/contexts/locale-context";
import { getOffers } from "@/content/selectors";
import { homeCopy } from "@/content/home";

export default function OffersPage() {
  const { locale } = useLocale();
  const offers = getOffers(locale);
  const copy = homeCopy[locale];

  return (
    <Container
      as="main"
      className="flex flex-col gap-20 pb-24 pt-28 lg:gap-24 lg:pt-32"
    >
      <PageSection aria-labelledby="offers-hero">
        <SectionHeading
          eyebrow={locale === "id" ? "Offers & Packages" : "Offers & Packages"}
          title={
            <span id="offers-hero" className="inline-block">
              {copy.offers.heading}
            </span>
          }
          description={copy.offers.description}
        />
        <AnimatedReveal delay={0.15}>
          <p className="max-w-2xl text-xs text-zinc-400 md:text-sm md:leading-relaxed">
            {locale === "id"
              ? "Penawaran kami tidak sekadar diskon musiman, tetapi kurasi nilai yang relevan untuk agenda bisnis dan liburan terencana."
              : "Each offer is composed as more than a seasonal discount — it is a curated layer of value for both business and intentional leisure."}
          </p>
        </AnimatedReveal>
      </PageSection>

      <PageSection aria-labelledby="offers-grid">
        <SectionHeading
          eyebrow={locale === "id" ? "Curated Offers" : "Curated Offers"}
          title={
            <span id="offers-grid" className="inline-block">
              {locale === "id"
                ? "Paket yang Dapat Disesuaikan"
                : "Packages Ready to be Tailored"}
            </span>
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          {offers.map((offer) => (
            <OfferHighlight
              key={offer.title}
              title={offer.title}
              label={offer.label}
              description={offer.description}
              href="/offers"
            />
          ))}
        </div>
      </PageSection>
    </Container>
  );
}

