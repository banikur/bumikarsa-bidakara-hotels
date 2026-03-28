"use client";

import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StoryCard } from "@/components/home/story-card";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { useLocale } from "@/contexts/locale-context";
import { getStories } from "@/content/selectors";
import { homeCopy } from "@/content/home";

export default function StoriesPage() {
  const { locale } = useLocale();
  const stories = getStories(locale);
  const copy = homeCopy[locale];

  return (
    <Container
      as="main"
      className="flex flex-col gap-20 pb-24 pt-28 lg:gap-24 lg:pt-32"
    >
      <PageSection aria-labelledby="stories-hero">
        <SectionHeading
          eyebrow={locale === "id" ? "Stories" : "Stories"}
          title={
            <span id="stories-hero" className="inline-block">
              {copy.stories.heading}
            </span>
          }
          description={copy.stories.description}
        />
        <AnimatedReveal delay={0.15}>
          <p className="max-w-2xl text-xs text-zinc-400 md:text-sm md:leading-relaxed">
            {locale === "id"
              ? "Jurnal singkat yang menyorot manusia, kota, dan momen hening di antara perjalanan — untuk memberi konteks pada setiap kunjungan Anda."
              : "Short journals capturing people, cities, and the quiet in-between moments — lending context and meaning to each of your stays."}
          </p>
        </AnimatedReveal>
      </PageSection>

      <PageSection aria-labelledby="stories-grid">
        <SectionHeading
          eyebrow={locale === "id" ? "Journal" : "Journal"}
          title={
            <span id="stories-grid" className="inline-block">
              {locale === "id"
                ? "Catatan dari Jantung Nusantara"
                : "Notes from Across the Archipelago"}
            </span>
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          {stories.map((story) => (
            <StoryCard
              key={story.slug}
              title={story.title}
              category={story.category}
              summary={story.summary}
              href={`/stories/${story.slug}`}
            />
          ))}
        </div>
      </PageSection>
    </Container>
  );
}

