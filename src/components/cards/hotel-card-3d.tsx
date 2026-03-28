"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export type HotelCardProps = {
  name: string;
  location: string;
  summary: string;
  tag?: string;
  href?: string;
};

export function HotelCard3D({
  name,
  location,
  summary,
  tag,
  href,
}: HotelCardProps) {
  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border-subtle/80 bg-gradient-to-b from-zinc-900/70 via-zinc-950 to-black/95 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.75)]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.23, 0.82, 0.25, 1] }}
      whileHover={{
        y: -8,
      }}
    >
      <div className="relative h-44 overflow-hidden rounded-2xl border border-border-subtle/70 bg-zinc-900/80 sm:h-48">
        <Image
          src="/next.svg"
          alt={name}
          fill
          className="object-cover opacity-80 mix-blend-screen transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2 text-[11px] text-zinc-200">
          {tag && (
            <span className="rounded-full bg-black/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-200 border border-emerald-400/40">
              {tag}
            </span>
          )}
        </div>
        <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-end justify-between text-xs text-zinc-200">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-300">
              {location}
            </p>
            <p className="mt-0.5 text-sm font-medium text-white">{name}</p>
          </div>
          <div className="hidden flex-col items-end text-[10px] text-zinc-300 md:flex">
            <span>Executive floors</span>
            <span>Ballroom &amp; MICE</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col justify-between gap-4">
        <p className="text-sm text-zinc-300 leading-relaxed">{summary}</p>
        <div className="flex items-center justify-between gap-2 text-[11px] text-zinc-400">
          {href ? (
            <Link
              href={href}
              className="inline-flex items-center gap-1 rounded-full bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-100 ring-1 ring-border-subtle/70 transition group-hover:bg-accent-gold group-hover:text-black group-hover:ring-accent-gold"
            >
              View Hotel
              <span className="translate-y-px text-xs">↗</span>
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-zinc-300 ring-1 ring-border-subtle/60">
              View Hotel
            </span>
          )}
          <span className="hidden text-right sm:inline">
            Complimentary late check-out for members*
          </span>
        </div>
      </div>
    </motion.article>
  );
}

