"use client";

import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { useLocale } from "@/contexts/locale-context";
import { getExperienceById } from "@/content/selectors";
import type { ExperienceType } from "@/components/cards/experience-card";
import { BookingBar } from "@/components/booking/booking-bar";

type ExperienceDetailPageProps = {
  params: { type: ExperienceType };
};

export default function ExperienceDetailPage({
  params,
}: ExperienceDetailPageProps) {
  const { locale } = useLocale();
  const experience = getExperienceById(locale, params.type);

  if (!experience) {
    notFound();
  }

  return (
    <Container
      as="main"
      className="flex flex-col gap-20 pb-24 pt-28 lg:gap-24 lg:pt-32"
    >
      <PageSection aria-labelledby="experience-hero">
        <SectionHeading
          eyebrow={locale === "id" ? "Experiences" : "Experiences"}
          title={
            <span id="experience-hero" className="inline-block">
              {experience.title}
            </span>
          }
        />
        <AnimatedReveal delay={0.12}>
          <p className="max-w-2xl text-sm text-zinc-300 md:text-base md:leading-relaxed">
            {experience.description}
          </p>
        </AnimatedReveal>
      </PageSection>

      <PageSection aria-labelledby="experience-sections">
        <SectionHeading
          eyebrow={locale === "id" ? "Overview" : "Overview"}
          title={
            <span id="experience-sections" className="inline-block">
              {locale === "id"
                ? "Dirangkai Seperti Sebuah Alur Acara"
                : "Composed Like a Carefully Scored Program"}
            </span>
          }
        />
        <div className="grid gap-4 md:grid-cols-3 text-xs text-zinc-300">
          <div className="rounded-2xl border border-border-subtle/70 bg-black/55 p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">
              {locale === "id" ? "Pra-Acara" : "Pre-Event"}
            </p>
            <p className="mt-2 leading-relaxed">
              {locale === "id"
                ? "Tim kami membantu menyusun alur, layout, dan kebutuhan teknis sejak sesi perencanaan awal."
                : "Our specialists help choreograph flow, layout, and technical needs from the very first planning call."}
            </p>
          </div>
          <div className="rounded-2xl border border-border-subtle/70 bg-black/55 p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">
              {locale === "id" ? "Hari-H" : "Event Day"}
            </p>
            <p className="mt-2 leading-relaxed">
              {locale === "id"
                ? "Tim on-ground yang tenang dan responsif memastikan setiap momen berjalan mulus."
                : "A calm, responsive on-ground team ensures each moment unfolds with precision."}
            </p>
          </div>
          <div className="rounded-2xl border border-border-subtle/70 bg-black/55 p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">
              {locale === "id" ? "Pasca-Acara" : "Post-Event"}
            </p>
            <p className="mt-2 leading-relaxed">
              {locale === "id"
                ? "Ringkasan dan evaluasi pasca-acara untuk memastikan kemitraan jangka panjang."
                : "Post-event summaries and reflections designed for long-term partnership."}
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection aria-labelledby="experience-cta">
        <SectionHeading
          eyebrow={locale === "id" ? "Enquiry" : "Enquiry"}
          title={
            <span id="experience-cta" className="inline-block">
              {locale === "id"
                ? "Mulai dari Satu Percakapan Tenang"
                : "Begin with a Quiet Conversation"}
            </span>
          }
        />
        <BookingBar
          primaryAction="plan-event"
          secondaryAction="request-proposal"
          context={{
            experienceType: params.type,
            audience: params.type === "weddings" ? "wedding" : "mice",
          }}
          label={
            locale === "id"
              ? "Perencanaan Pertemuan & Pernikahan"
              : "Meetings & Wedding Planning"
          }
        />
      </PageSection>
    </Container>
  );
}

