import Link from "next/link";
import { AnimatedReveal } from "@/components/motion/animated-reveal";

type StoryCardProps = {
  title: string;
  category: string;
  summary: string;
  href: string;
};

export function StoryCard({ title, category, summary, href }: StoryCardProps) {
  return (
    <AnimatedReveal>
      <article className="flex h-full flex-col justify-between gap-3 rounded-3xl border border-border-subtle/80 bg-zinc-950/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.85)]">
        <div>
          <p className="text-[10px] uppercase tracking-[0.26em] text-zinc-500">
            {category}
          </p>
          <h3 className="mt-1 font-serif text-lg text-foreground">{title}</h3>
        </div>
        <p className="text-xs leading-relaxed text-zinc-400">{summary}</p>
        <Link
          href={href}
          className="mt-1 inline-flex w-max items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-zinc-300"
        >
          Read Story
          <span aria-hidden="true" className="text-xs">
            ↗
          </span>
        </Link>
      </article>
    </AnimatedReveal>
  );
}


