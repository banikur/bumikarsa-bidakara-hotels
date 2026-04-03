"use client";

import { useState } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "../shared/language-switcher";

const navLinks = [
  { href: "/our-hotels", label: "Our Hotels" },
  { href: "/experiences", label: "Experiences" },
  { href: "/offers", label: "Offers" },
  { href: "/membership", label: "Membership" },
  { href: "/stories", label: "Stories" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-transparent bg-black/30 backdrop-blur-xl transition-colors duration-300 bk-scrolled:border-border-subtle/60 bk-scrolled:bg-black/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm font-medium tracking-[0.28em] uppercase text-zinc-300"
          >
            <span className="h-8 w-8 rounded-full border border-border-subtle/60 bg-zinc-900/60 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]" />
            <span>Bumikarsa Bidakara</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 text-[13px] text-zinc-300 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button className="hidden rounded-full bg-accent-gold px-5 py-2 text-xs font-medium uppercase tracking-[0.22em] text-black shadow-[0_10px_40px_rgba(0,0,0,0.45)] md:inline-flex">
              Book Your Stay
            </button>
            
            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-zinc-300 hover:text-white transition-colors p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-medium text-zinc-300 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button className="mt-4 rounded-full bg-accent-gold px-8 py-3 text-sm font-medium uppercase tracking-[0.22em] text-black shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
              Book Your Stay
            </button>
          </div>
        </div>
      )}
    </>
  );
}

