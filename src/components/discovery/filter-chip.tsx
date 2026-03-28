"use client";

type FilterChipProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] transition ${
        active
          ? "border-accent-gold bg-accent-gold text-black"
          : "border-border-subtle/70 bg-black/40 text-zinc-300 hover:border-zinc-500"
      }`}
    >
      {label}
    </button>
  );
}

