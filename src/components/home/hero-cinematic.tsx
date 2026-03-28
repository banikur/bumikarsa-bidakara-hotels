"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AnimatedReveal } from "../motion/animated-reveal";
import { CanvasScrubber } from "@/components/scroll/canvas-scrubber";

type HeroCinematicProps = {
  title: string;
  subtitle: string;
  description?: string;
  localeLabel: string;
};

export function HeroCinematic({
  title,
  subtitle,
  description,
  localeLabel,
}: HeroCinematicProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[86vh] items-center justify-center overflow-hidden"
    >
      {/* Background media */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#353842_0,#0f1115_55%,#050608_100%)]" />
        <motion.div
          className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl"
          animate={{ y: [0, 24, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full flex-col gap-10 px-4 pb-20 pt-24 md:px-6 lg:px-8 lg:flex-row lg:items-end">
        {/* Primary message */}
        <div className="flex-1 space-y-7">
          <AnimatedReveal delay={0.05}>
            <p className="mb-1 text-xs font-medium tracking-[0.28em] uppercase text-zinc-200">
              {localeLabel}
            </p>
            <p className="text-[11px] tracking-[0.32em] uppercase text-zinc-300/80">
              Soul of the Archipelago
            </p>
          </AnimatedReveal>

          <AnimatedReveal delay={0.1}>
            <h1
              id="hero-heading"
              className="font-serif text-4xl leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
            >
              {title}
            </h1>
          </AnimatedReveal>

          <AnimatedReveal delay={0.18}>
            <p className="max-w-xl text-sm text-zinc-200/90 md:text-base md:leading-relaxed">
              {subtitle}
            </p>
          </AnimatedReveal>

          {description ? (
            <AnimatedReveal delay={0.26}>
              <p className="max-w-lg text-xs text-zinc-300/80 md:text-sm md:leading-relaxed">
                {description}
              </p>
            </AnimatedReveal>
          ) : null}

          <AnimatedReveal delay={0.34}>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/our-hotels"
                className="inline-flex items-center justify-center rounded-full bg-accent-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-black shadow-[0_20px_60px_rgba(0,0,0,0.65)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Book a Stay
              </Link>
              <Link
                href="/experiences"
                className="inline-flex items-center justify-center rounded-full border border-border-subtle/70 bg-black/30 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-100 backdrop-blur transition hover:border-zinc-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Explore Experiences
              </Link>
            </div>
          </AnimatedReveal>
        </div>

        {/* Supporting visual card (kept, simplified) */}
        <AnimatedReveal delay={0.32}>
          <aside className="mt-10 w-full max-w-sm self-stretch rounded-3xl border border-border-subtle/70 bg-black/50 p-4 backdrop-blur-xl sm:p-5 lg:mt-0">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-medium tracking-[0.28em] uppercase text-zinc-400">
                  Signature Stays
                </p>
                <p className="mt-1 text-sm text-zinc-100">Jakarta · Bandung · Yogyakarta</p>
              </div>
            </div>

            <div className="mt-4 relative overflow-hidden rounded-2xl border border-border-subtle/70 bg-zinc-900/80">
              <CanvasScrubber />
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-4 text-xs text-zinc-200">
                <p className="font-medium tracking-[0.22em] uppercase">
                  Golden Hour Lobby
                </p>
                <p className="mt-1 text-[11px] text-zinc-200/80">
                  A calm arrival ritual, framed by warm Indonesian light.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-300/80">
              <span>Concierge-led service</span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-emerald-300" />
                <span>2026 group enquiries</span>
              </span>
            </div>
          </aside>
        </AnimatedReveal>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-zinc-400">
          <span>Scroll to Discover</span>
          <span className="h-10 w-px bg-gradient-to-b from-zinc-500/60 via-zinc-300 to-transparent" />
        </div>
      </div>
    </section>
  );
}

