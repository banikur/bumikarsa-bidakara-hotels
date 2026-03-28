"use client";

export function AiConciergeEntry() {
  return (
    <button
      type="button"
      className="fixed bottom-6 left-4 z-40 inline-flex items-center gap-2 rounded-full border border-border-subtle/70 bg-black/80 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-zinc-200 shadow-[0_18px_40px_rgba(0,0,0,0.75)]"
    >
      <span className="h-2 w-2 rounded-full bg-emerald-400" />
      <span>AI Concierge (Soon)</span>
    </button>
  );
}

export function ProposalGeneratorPlaceholder() {
  return (
    <section className="rounded-3xl border border-border-subtle/70 bg-black/55 p-4 text-xs text-zinc-200 md:p-5">
      <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">
        Proposal Generator · Coming Soon
      </p>
      <p className="mt-2 max-w-xl text-xs text-zinc-300">
        This area will host the save-as-PDF proposal generator, synthesizing
        meeting or wedding requirements into branded documents.
      </p>
    </section>
  );
}

