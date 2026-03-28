"use client";

import { HeroCinematic } from "@/components/home/hero-cinematic";
import { SectionHeading } from "@/components/ui/section-heading";
import { HotelCard3D } from "@/components/cards/hotel-card-3d";
import { ExperienceCard } from "@/components/cards/experience-card";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { PageSection } from "@/components/layout/page-section";
import { OfferHighlight } from "@/components/home/offer-highlight";
import { MembershipSpotlight } from "@/components/home/membership-spotlight";
import { StoryCard } from "@/components/home/story-card";
import { ContactMapPreview } from "@/components/home/contact-map-preview";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { homeCopy } from "@/content/home";
import { useLocale } from "@/contexts/locale-context";

export default function Home() {
  const { locale } = useLocale();
  const copy = homeCopy[locale];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Container
        as="main"
        size="wide"
        className="flex flex-col gap-16 pb-24 pt-20 lg:gap-20 lg:pt-24"
      >
        <HeroCinematic
          title={copy.hero.title}
          subtitle={copy.hero.subtitle}
          description={copy.hero.description}
          localeLabel={copy.hero.localeLabel}
        />

        {/* Featured Hotels */}
        <PageSection aria-labelledby="hotels-heading">
          <SectionHeading
            eyebrow={locale === "id" ? "Our Hotels" : "Our Hotels"}
            title={
              <span id="hotels-heading" className="inline-block">
                {copy.hotels.heading}
              </span>
            }
            description={copy.hotels.description}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {copy.hotels.items.map((hotel) => (
              <HotelCard3D
                key={hotel.name}
                name={hotel.name}
                location={hotel.location}
                summary={hotel.summary}
                tag={hotel.tag}
                href={`/our-hotels/${hotel.slug}`}
              />
            ))}
          </div>
        </PageSection>

        {/* Offers & Packages */}
        <PageSection aria-labelledby="offers-heading">
          <SectionHeading
            eyebrow={locale === "id" ? "Offers & Packages" : "Offers & Packages"}
            title={
              <span id="offers-heading" className="inline-block">
                {copy.offers.heading}
              </span>
            }
            description={copy.offers.description}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {copy.offers.highlights.map((offer) => (
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

        {/* Experiences */}
        <PageSection aria-labelledby="experiences-heading">
          <SectionHeading
            eyebrow={locale === "id" ? "Experiences" : "Experiences"}
            title={
              <span id="experiences-heading" className="inline-block">
                {copy.experiences.heading}
              </span>
            }
            description={copy.experiences.description}
          />
          <AnimatedReveal>
            <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-3 md:mx-0 md:px-0 md:pb-1 snap-x snap-mandatory">
              {copy.experiences.items.map((exp) => (
                <ExperienceCard
                  key={exp.id}
                  type={exp.id}
                  title={exp.title}
                  description={exp.description}
                />
              ))}
            </div>
          </AnimatedReveal>
        </PageSection>

        {/* Membership Spotlight */}
        <PageSection aria-labelledby="membership-heading">
          <SectionHeading
            eyebrow={locale === "id" ? "Membership" : "Membership"}
            title={
              <span id="membership-heading" className="inline-block">
                {copy.membership.heading}
              </span>
            }
            description={copy.membership.description}
            align="center"
          />
          <MembershipSpotlight
            title={copy.membership.content.title}
            subtitle={copy.membership.content.subtitle}
            bullets={copy.membership.content.bullets}
            description={copy.membership.description}
          />
        </PageSection>

        {/* Stories / Journal */}
        <PageSection aria-labelledby="stories-heading">
          <SectionHeading
            eyebrow={locale === "id" ? "Stories" : "Stories"}
            title={
              <span id="stories-heading" className="inline-block">
                {copy.stories.heading}
              </span>
            }
            description={copy.stories.description}
          />
          <div className="grid gap-4 md:grid-cols-3">
            {copy.stories.items.map((story) => (
              <StoryCard
                key={story.title}
                title={story.title}
                category={story.category}
                summary={story.summary}
                href={`/stories/${story.slug}`}
              />
            ))}
          </div>
        </PageSection>

        {/* Contact / Locations teaser */}
        <ContactMapPreview
          title={copy.contactTeaser.title}
          description={copy.contactTeaser.description}
          primaryCta={copy.contactTeaser.primaryCta}
          secondaryCta={copy.contactTeaser.secondaryCta}
        />
      </Container>
      <Footer />
    </div>
  );
}

