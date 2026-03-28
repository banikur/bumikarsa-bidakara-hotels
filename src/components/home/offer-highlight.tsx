import Link from "next/link";
import { AnimatedReveal } from "@/components/motion/animated-reveal";

type OfferHighlightProps = {
  title: string;
  label: string;
  description: string;
  href?: string;
};

export function OfferHighlight({
  title,
  label,
  description,
  href,
}: OfferHighlightProps) {
  const baseClasses =
    "flex h-full flex-col justify-between gap-3 rounded-3xl border border-border-subtle/80 bg-gradient-to-b from-zinc-900/60 via-black to-black/95 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.85)] transition hover:-translate-y-1";

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.26em] text-zinc-400">
            {label}
          </p>
          <h3 className="mt-1 font-serif text-lg text-foreground">{title}</h3>
        </div>
        <span className="inline-flex h-8 items-center rounded-full border border-border-subtle/70 bg-black/60 px-3 text-[10px] uppercase tracking-[0.2em] text-emerald-200">
          Limited
        </span>
      </div>
      <p className="text-xs leading-relaxed text-zinc-400">{description}</p>
    </>
  );

  return (
    <AnimatedReveal>
      {href ? (
        <Link
          href={href}
          className={`${baseClasses} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black`}
        >
          {content}
        </Link>
      ) : (
        <article className={baseClasses}>{content}</article>
      )}
    </AnimatedReveal>
  );
}


