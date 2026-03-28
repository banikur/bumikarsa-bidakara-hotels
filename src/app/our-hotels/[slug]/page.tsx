"use client";

import Image from "next/image";
import { useLocale } from "@/contexts/locale-context";
import { Container } from "@/components/layout/container";
import { PageSection } from "@/components/layout/page-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedReveal } from "@/components/motion/animated-reveal";
import { getHotelBySlug } from "@/content/selectors";
import { BookingBar } from "@/components/booking/booking-bar";

type HotelDetailPageProps = {
  params: { slug: string };
};

export default function HotelDetailPage({ params }: HotelDetailPageProps) {
  const { locale } = useLocale();
  const hotel = getHotelBySlug(locale, params.slug);

  if (!hotel) {
    return (
      <Container as="main" className="pb-24 pt-32">
        <p className="text-sm text-zinc-400">
          {locale === "id"
            ? "Hotel tidak ditemukan. Silakan kembali ke daftar hotel."
            : "Hotel not found. Please return to the hotel overview."}
        </p>
      </Container>
    );
  }

  return (
    <Container
      as="main"
      className="flex flex-col gap-20 pb-24 pt-28 lg:gap-24 lg:pt-32"
    >
      {/* Hero */}
      <PageSection aria-labelledby="hotel-hero">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)] md:items-end">
          <div className="space-y-6">
            <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-400">
              {locale === "id" ? "Our Hotels" : "Our Hotels"}
            </p>
            <h1
              id="hotel-hero"
              className="font-serif text-3xl leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl"
            >
              {hotel.name}
            </h1>
            <p className="text-xs uppercase tracking-[0.26em] text-zinc-400">
              {hotel.location}
            </p>
            <p className="max-w-xl text-sm text-zinc-300 md:text-base md:leading-relaxed">
              {hotel.summary}
            </p>
            <BookingBar
              primaryAction="book-stay"
              secondaryAction="check-availability"
              context={{ hotelSlug: hotel.slug, audience: "leisure" }}
              label={
                locale === "id"
                  ? "Reservasi & Ketersediaan"
                  : "Reservations & Availability"
              }
            />
          </div>

          <AnimatedReveal as="div">
            <div className="relative h-52 overflow-hidden rounded-3xl border border-border-subtle/70 bg-zinc-900/80 sm:h-64">
              <Image
                src="/window.svg"
                alt={hotel.name}
                fill
                className="object-cover opacity-80 mix-blend-screen"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>
          </AnimatedReveal>
        </div>
      </PageSection>

      {/* Highlights scaffold */}
      <PageSection aria-labelledby="hotel-highlights">
        <SectionHeading
          eyebrow={locale === "id" ? "Highlights" : "Highlights"}
          title={
            <span id="hotel-highlights" className="inline-block">
              {locale === "id"
                ? "Disusun untuk Agenda Bisnis dan Momen Personal"
                : "Composed for Business Agendas and Personal Moments"}
            </span>
          }
        />
        <div className="grid gap-4 md:grid-cols-3 text-xs text-zinc-300">
          <div className="rounded-2xl border border-border-subtle/70 bg-black/50 p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">
              Meetings &amp; Events
            </p>
            <p className="mt-2 leading-relaxed">
              {locale === "id"
                ? "Ballroom dan ruang rapat modular dengan dukungan tim MICE onsite untuk agenda tingkat direksi."
                : "A ballroom and modular meeting suites supported by an onsite MICE team for high-level agendas."}
            </p>
          </div>
          <div className="rounded-2xl border border-border-subtle/70 bg-black/50 p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">
              Stays
            </p>
            <p className="mt-2 leading-relaxed">
              {locale === "id"
                ? "Kamar dan suite yang memadukan fungsionalitas bisnis dengan kenyamanan istirahat yang tenang."
                : "Rooms and suites that balance productivity with restorative calm."}
            </p>
          </div>
          <div className="rounded-2xl border border-border-subtle/70 bg-black/50 p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">
              Dining &amp; Wellness
            </p>
            <p className="mt-2 leading-relaxed">
              {locale === "id"
                ? "Restoran, lounge, dan fasilitas wellness untuk jeda di antara sesi rapat dan perjalanan."
                : "Dining, lounge, and wellness spaces designed for pauses between sessions and journeys."}
            </p>
          </div>
        </div>
      </PageSection>
    </Container>
  );
}

