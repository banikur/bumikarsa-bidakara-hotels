"use client";

import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactMapPreview } from "@/components/home/contact-map-preview";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { useLocale } from "@/contexts/locale-context";
import { getContactTeaser } from "@/content/selectors";

export default function ContactPage() {
  const { locale } = useLocale();
  const contact = getContactTeaser(locale);

  return (
    <Container
      as="main"
      className="flex flex-col gap-20 pb-24 pt-28 lg:gap-24 lg:pt-32"
    >
      <PageSection aria-labelledby="contact-hero">
        <SectionHeading
          eyebrow={locale === "id" ? "Contact" : "Contact"}
          title={
            <span id="contact-hero" className="inline-block">
              {contact.title}
            </span>
          }
          description={contact.description}
        />
        <AnimatedReveal delay={0.14}>
          <p className="max-w-2xl text-xs text-zinc-400 md:text-sm md:leading-relaxed">
            {locale === "id"
              ? "Mulai dari reservasi individual hingga MICE skala besar, tim terpusat kami akan menghubungkan Anda dengan properti dan penawaran yang paling relevan."
              : "From individual reservations to large-scale MICE, our central team will connect you with the property and offer that best fits your needs."}
          </p>
        </AnimatedReveal>
      </PageSection>

      <PageSection aria-labelledby="contact-locations">
        <SectionHeading
          eyebrow={locale === "id" ? "Locations" : "Locations"}
          title={
            <span id="contact-locations" className="inline-block">
              {locale === "id"
                ? "Tiga Kota, Satu Tim Terpadu"
                : "Three Cities, One Seamless Team"}
            </span>
          }
        />
        <ContactMapPreview
          title={contact.title}
          description={contact.description}
          primaryCta={contact.primaryCta}
          secondaryCta={contact.secondaryCta}
        />
      </PageSection>
    </Container>
  );
}

