"use client";

import { useLocale } from "@/contexts/locale-context";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border-subtle/60 bg-black/40 px-1 py-0.5 text-[11px] font-medium text-zinc-300">
      {(["id", "en"] as const).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={`px-2.5 py-1 rounded-full transition-colors ${
              active
                ? "bg-white text-black"
                : "text-zinc-400 hover:text-white"
            }`}
            aria-pressed={active}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

