"use client";

import { FilterChip } from "./filter-chip";

export type FilterOption = {
  id: string;
  label: string;
};

type FilterBarProps = {
  label: string;
  options: FilterOption[];
  activeIds?: string[];
};

export function FilterBar({ label, options, activeIds = [] }: FilterBarProps) {
  return (
    <section
      aria-label={label}
      className="flex flex-wrap items-center gap-2 rounded-full border border-border-subtle/70 bg-black/40 px-3 py-2 text-[11px] text-zinc-300"
    >
      <span className="mr-1 text-[10px] uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </span>
      {options.map((opt) => (
        <FilterChip
          key={opt.id}
          label={opt.label}
          active={activeIds.includes(opt.id)}
        />
      ))}
    </section>
  );
}

