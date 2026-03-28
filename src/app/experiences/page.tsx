"use client";

import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExperienceCard } from "@/components/cards/experience-card";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { useLocale } from "@/contexts/locale-context";
import { getExperiences } from "@/content/selectors";
import { homeCopy } from "@/content/home";

export default function ExperiencesPage() {
  const { locale } = useLocale();
  const experiences = getExperiences(locale);
  const copy = homeCopy[locale];

  return (
    <Container
      as="main"
      className="flex flex-col gap-20 pb-24 pt-28 lg:gap-24 lg:pt-32"
    >
      <PageSection aria-labelledby="experiences-hero">
        <SectionHeading
          eyebrow={locale === "id" ? "Experiences" : "Experiences"}
          title={
            <span id="experiences-hero" className="inline-block">
              {copy.experiences.heading}
            </span>
          }
          description={copy.experiences.description}
        />
        <AnimatedReveal delay={0.15}>
          <p className="max-w-2xl text-xs text-zinc-400 md:text-sm md:leading-relaxed">
            {locale === "id"
              ? "Pilih jalur pengalaman yang paling dekat dengan agenda Anda — dari rapat tingkat direksi hingga resepsi pernikahan intim."
              : "Choose the experience path that best aligns with your agenda — from executive board meetings to intimate wedding receptions."}
          </p>
        </AnimatedReveal>
      </PageSection>

      <PageSection aria-labelledby="experiences-grid">
        <SectionHeading
          eyebrow={locale === "id" ? "Categories" : "Categories"}
          title={
            <span id="experiences-grid" className="inline-block">
              {locale === "id"
                ? "Empat Pilar Pengalaman Bumikarsa"
                : "Four Pillars of Bumikarsa Experiences"}
            </span>
          }
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              type={exp.id}
              title={exp.title}
              description={exp.description}
            />
          ))}
        </div>
      </PageSection>
    </Container>
  );
}

