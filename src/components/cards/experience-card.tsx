"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export type ExperienceType = "meetings" | "weddings" | "dining" | "wellness";

export type ExperienceCardProps = {
  type: ExperienceType;
  title: string;
  description: string;
};

const typeLabelMap: Record<ExperienceType, string> = {
  meetings: "Meetings & Events",
  weddings: "Weddings",
  dining: "Dining",
  wellness: "Wellness",
};

export function ExperienceCard({
  type,
  title,
  description,
}: ExperienceCardProps) {
  return (
    <motion.article
      className="group relative flex min-w-[240px] max-w-xs flex-col justify-between rounded-3xl border border-border-subtle/80 bg-zinc-950/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.85)] sm:min-w-[260px]"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.23, 0.82, 0.25, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] tracking-[0.26em] uppercase text-zinc-400">
            {typeLabelMap[type]}
          </p>
          <h3 className="mt-1 font-serif text-lg text-foreground">
            {title}
          </h3>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 ring-1 ring-border-subtle/70">
          <span
            aria-hidden="true"
            className="h-5 w-5 rounded-full bg-gradient-to-br from-emerald-400 to-amber-300 opacity-80"
          />
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-zinc-400">
        {description}
      </p>
      <div className="mt-4 flex items-center justify-between text-[10px] text-zinc-400">
        <span>Tailored proposals in under 24 hours.</span>
        <Link
          href={`/experiences/${type}`}
          className="inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-zinc-100 ring-1 ring-border-subtle/70 transition group-hover:bg-accent-gold group-hover:text-black group-hover:ring-accent-gold"
        >
          Discover
          <span aria-hidden="true" className="text-xs">
            →
          </span>
        </Link>
      </div>
    </motion.article>
  );
}

