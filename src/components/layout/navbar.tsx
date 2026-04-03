"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "../shared/language-switcher";
import { PRIMARY_NAV, SERVICE_SUBLINKS } from "./section-nav";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-black/40 backdrop-blur-xl transition-colors duration-300 bk-scrolled:border-border-subtle/60 bk-scrolled:bg-black/75">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-sm font-medium tracking-[0.28em] uppercase text-zinc-200">
          <span className="h-8 w-8 rounded-full border border-border-subtle/60 bg-zinc-900/60 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]" />
          <span>Bumikarsa Bidakara</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-zinc-200 md:flex">
          {PRIMARY_NAV.map((item) =>
            item.id === "services" ? (
              <div key={item.id} className="relative group">
                <button type="button" className="flex items-center gap-1 hover:text-white transition-colors">
                  {item.label}
                  <span className="text-xs">▾</span>
                </button>
                <div className="absolute left-0 top-full z-20 mt-2 hidden min-w-[180px] rounded border border-border-subtle/60 bg-black/90 p-2 shadow-lg group-hover:block">
                  {SERVICE_SUBLINKS.map((sub) => (
                    <Link key={sub.id} href={sub.href} className="block rounded px-3 py-2 text-sm hover:bg-zinc-800 hover:text-white">
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.id} href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button className="hidden rounded-full bg-accent-gold px-5 py-2 text-xs font-medium uppercase tracking-[0.22em] text-black shadow-[0_10px_40px_rgba(0,0,0,0.45)] md:inline-flex">
            Book Your Stay
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-zinc-100 shadow-lg md:hidden"
            aria-label={`${mobileOpen ? "Close" : "Open"} menu`}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="text-lg">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-opacity ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!mobileOpen}
        onClick={closeMenu}
      >
        <div className="absolute inset-0 bg-black/60" />
        <aside
          className={`absolute right-0 top-0 h-full w-[86vw] max-w-xs bg-black p-6 shadow-2xl transition-transform ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-widest text-zinc-100">Menu</span>
            <button type="button" className="text-zinc-100" onClick={closeMenu} aria-label="Close menu">
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-3 text-sm text-zinc-100">
            {PRIMARY_NAV.map((item) => {
              if (item.id === "services") {
                return (
                  <div key={item.id} className="rounded border border-white/10 p-2">
                    <Link href={item.href} onClick={closeMenu} className="block rounded px-3 py-2 font-semibold hover:bg-zinc-800">
                      {item.label}
                    </Link>
                    <div className="mt-2 space-y-1 border-t border-white/10 pt-2">
                      {SERVICE_SUBLINKS.map((sub) => (
                        <Link key={sub.id} href={sub.href} onClick={closeMenu} className="block rounded px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link key={item.id} href={item.href} onClick={closeMenu} className="block rounded px-3 py-2 hover:bg-zinc-800">
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
      </div>
    </header>
  );
}

