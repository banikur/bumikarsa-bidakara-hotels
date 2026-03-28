"use client";

import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { MembershipSpotlight } from "@/components/home/membership-spotlight";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { useLocale } from "@/contexts/locale-context";
import { getMembership } from "@/content/selectors";

export default function MembershipPage() {
  const { locale } = useLocale();
  const membership = getMembership(locale);

  return (
    <Container
      as="main"
      className="flex flex-col gap-20 pb-24 pt-28 lg:gap-24 lg:pt-32"
    >
      <PageSection aria-labelledby="membership-hero">
        <SectionHeading
          eyebrow="Membership"
          title={
            <span id="membership-hero" className="inline-block">
              {membership.heading}
            </span>
          }
          description={membership.description}
        />
        <AnimatedReveal delay={0.15}>
          <p className="max-w-2xl text-xs text-zinc-400 md:text-sm md:leading-relaxed">
            {locale === "id"
              ? "Bumikarsa Member Circle 2.0 dirancang sebagai ekosistem yang hidup, bukan kartu statis — mengiringi ritme perjalanan Anda sepanjang tahun."
              : "Bumikarsa Member Circle 2.0 is designed as a living ecosystem rather than a static card — moving in rhythm with your travels throughout the year."}
          </p>
        </AnimatedReveal>
      </PageSection>

      <PageSection aria-labelledby="membership-benefits">
        <SectionHeading
          eyebrow={locale === "id" ? "Benefits" : "Benefits"}
          title={
            <span id="membership-benefits" className="inline-block">
              {membership.content.title}
            </span>
          }
          description={membership.content.subtitle}
        />
        <MembershipSpotlight
          title={membership.content.title}
          subtitle={membership.content.subtitle}
          bullets={membership.content.bullets}
          description={membership.description}
        />
      </PageSection>
    </Container>
  );
}

