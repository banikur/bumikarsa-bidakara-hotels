import Link from "next/link";
import { LanguageSwitcher } from "../shared/language-switcher";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-transparent bg-black/30 backdrop-blur-xl transition-colors duration-300 bk-scrolled:border-border-subtle/60 bk-scrolled:bg-black/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-sm font-medium tracking-[0.28em] uppercase text-zinc-300"
        >
          <span className="h-8 w-8 rounded-full border border-border-subtle/60 bg-zinc-900/60 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]" />
          <span>Bumikarsa Bidakara</span>
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] text-zinc-300 md:flex">
          <Link href="/our-hotels" className="hover:text-white transition-colors">
            Our Hotels
          </Link>
          <Link href="/experiences" className="hover:text-white transition-colors">
            Experiences
          </Link>
          <Link href="/offers" className="hover:text-white transition-colors">
            Offers
          </Link>
          <Link href="/membership" className="hover:text-white transition-colors">
            Membership
          </Link>
          <Link href="/stories" className="hover:text-white transition-colors">
            Stories
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button className="hidden rounded-full bg-accent-gold px-5 py-2 text-xs font-medium uppercase tracking-[0.22em] text-black shadow-[0_10px_40px_rgba(0,0,0,0.45)] md:inline-flex">
            Book Your Stay
          </button>
        </div>
      </div>
    </header>
  );
}

