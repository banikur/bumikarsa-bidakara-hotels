"use client";

import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { useLocale } from "@/contexts/locale-context";
import { getStoryBySlug } from "@/content/selectors";

type StoryDetailPageProps = {
  params: { slug: string };
};

export default function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { locale } = useLocale();
  const story = getStoryBySlug(locale, params.slug);

  if (!story) {
    return (
      <Container as="main" className="pb-24 pt-32">
        <p className="text-sm text-zinc-400">
          {locale === "id"
            ? "Cerita tidak ditemukan. Silakan kembali ke jurnal."
            : "Story not found. Please return to the journal."}
        </p>
      </Container>
    );
  }

  return (
    <Container
      as="main"
      className="flex flex-col gap-16 pb-24 pt-28 lg:gap-20 lg:pt-32"
    >
      <PageSection aria-labelledby="story-hero">
        <SectionHeading
          eyebrow={story.category}
          title={
            <span id="story-hero" className="inline-block">
              {story.title}
            </span>
          }
        />
        <AnimatedReveal delay={0.16}>
          <p className="max-w-2xl text-xs text-zinc-400 md:text-sm md:leading-relaxed">
            {story.summary}
          </p>
        </AnimatedReveal>
      </PageSection>

      <PageSection aria-labelledby="story-body">
        <h2
          id="story-body"
          className="sr-only"
        >
          {locale === "id" ? "Isi cerita" : "Story content"}
        </h2>
        <article className="prose prose-invert max-w-none prose-p:text-zinc-300 prose-p:text-sm md:prose-p:text-base">
          <p>
            {locale === "id"
              ? "Artikel lengkap akan dikelola melalui sistem CMS. Halaman ini menyiapkan struktur tipografi dan ritme baca yang tenang untuk cerita jangka panjang."
              : "The full article body will be managed via a CMS. This page prepares the typographic structure and calm reading rhythm for long-form storytelling."}
          </p>
        </article>
      </PageSection>
    </Container>
  );
}

