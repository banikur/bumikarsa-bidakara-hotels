import Link from "next/link";
import { AnimatedReveal } from "@/components/motion/animated-reveal";

type MembershipSpotlightProps = {
  title: string;
  subtitle: string;
  bullets: string[];
  description: string;
};

export function MembershipSpotlight({
  title,
  subtitle,
  bullets,
  description,
}: MembershipSpotlightProps) {
  return (
    <AnimatedReveal>
      <section className="grid gap-6 rounded-3xl border border-border-subtle/80 bg-gradient-to-r from-black via-zinc-950/90 to-zinc-900/70 p-6 shadow-[0_32px_100px_rgba(0,0,0,0.9)] md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] md:p-8">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-400">
            Membership
          </p>
          <h3 className="font-serif text-2xl md:text-3xl text-foreground">
            {title}
          </h3>
          <p className="text-sm text-zinc-200/90 md:text-base">{subtitle}</p>
          <p className="text-xs text-zinc-300/80 md:text-sm">{description}</p>
        </div>
        <div className="space-y-3 rounded-2xl border border-border-subtle/80 bg-black/60 p-4 text-xs text-zinc-200">
          <p className="mb-1 text-[10px] uppercase tracking-[0.24em] text-zinc-400">
            Bumikarsa Member Circle 2.0
          </p>
          <ul className="space-y-2">
            {bullets.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-emerald-300" />
                <span className="leading-relaxed text-zinc-300">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px]">
            <Link
              href="/membership"
              className="inline-flex items-center justify-center rounded-full bg-accent-gold px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Join BMC 2.0
            </Link>
            <Link
              href="/membership"
              className="inline-flex items-center justify-center rounded-full border border-border-subtle/70 bg-black/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Explore Member Benefits
            </Link>
          </div>
        </div>
      </section>
    </AnimatedReveal>
  );
}

