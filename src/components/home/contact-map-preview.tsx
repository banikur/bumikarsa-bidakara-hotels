import Link from "next/link";
import { AnimatedReveal } from "@/components/motion/animated-reveal";

type ContactMapPreviewProps = {
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
};

export function ContactMapPreview({
  title,
  description,
  primaryCta,
  secondaryCta,
}: ContactMapPreviewProps) {
  return (
    <AnimatedReveal>
      <section className="grid gap-6 rounded-3xl border border-border-subtle/80 bg-gradient-to-r from-zinc-950 via-black to-zinc-950 p-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.6fr)] md:p-8">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-400">
            Contact & Locations
          </p>
          <h3 className="font-serif text-2xl md:text-3xl text-foreground">
            {title}
          </h3>
          <p className="text-xs text-zinc-300/80 md:text-sm">{description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px]">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-accent-gold px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {primaryCta}
            </Link>
            <Link
              href="/our-hotels"
              className="inline-flex items-center justify-center rounded-full border border-border-subtle/70 bg-black/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {secondaryCta}
            </Link>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="relative overflow-hidden rounded-2xl border border-border-subtle/80 bg-zinc-900/80"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#444857_0,#101118_55%,#050509_100%)]" />
          <div className="relative z-10 flex h-48 flex-col justify-between p-4 text-xs text-zinc-200 md:h-56">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.26em] text-zinc-400">
                  Key Cities
                </p>
                <p className="mt-1 text-sm">Jakarta · Bandung · Yogyakarta</p>
              </div>
              <div className="flex flex-col items-end text-[10px] text-zinc-300/80">
                <span>+62 (21) 0000 000</span>
                <span>reservations@bumikarsa.co.id</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] text-zinc-300">
              <div className="rounded-lg bg-black/55 p-2">
                <p className="text-[9px] uppercase tracking-[0.22em] text-zinc-400/80">
                  Jakarta
                </p>
                <p className="mt-1">
                  Business & MICE hub with direct toll access.
                </p>
              </div>
              <div className="rounded-lg bg-black/55 p-2">
                <p className="text-[9px] uppercase tracking-[0.22em] text-zinc-400/80">
                  Bandung
                </p>
                <p className="mt-1">Elevated retreat for strategy & reset.</p>
              </div>
              <div className="rounded-lg bg-black/55 p-2">
                <p className="text-[9px] uppercase tracking-[0.22em] text-zinc-400/80">
                  Yogyakarta
                </p>
                <p className="mt-1">
                  Cultural axis connecting heritage & modernity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedReveal>
  );
}

