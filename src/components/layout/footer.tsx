import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle/60 bg-black/60 pt-10 pb-6 mt-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:px-6 lg:px-8 md:flex-row md:justify-between">
        <div className="space-y-3 text-sm text-zinc-300">
          <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Bumikarsa Bidakara Hotels
          </p>
          <p className="max-w-sm text-xs text-zinc-400">
            Soulful Indonesian hospitality across business districts and
            heritage-rich destinations of the archipelago.
          </p>
          <p className="text-[11px] text-zinc-500">
            © {new Date().getFullYear()} Bumikarsa Bidakara. All rights
            reserved.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-[11px] text-zinc-400 md:grid-cols-3">
          <div className="space-y-2">
            <p className="font-medium uppercase tracking-[0.22em] text-zinc-500">
              Hotels
            </p>
            <ul className="space-y-1.5">
              <li>Hotel Bidakara Jakarta</li>
              <li>Hotel Bumikarsa Bandung</li>
              <li>BIDAKARA Heritage Yogyakarta</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-medium uppercase tracking-[0.22em] text-zinc-500">
              Experiences
            </p>
            <ul className="space-y-1.5">
              <li>Meetings &amp; Events</li>
              <li>Weddings</li>
              <li>Dining</li>
              <li>Wellness</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-medium uppercase tracking-[0.22em] text-zinc-500">
              Connect
            </p>
            <ul className="space-y-1.5">
              <li>
                <Link href="/contact">Contact &amp; Locations</Link>
              </li>
              <li>
                <Link href="/membership">BMC 2.0 Membership</Link>
              </li>
              <li>
                <Link href="/stories">Stories &amp; Journal</Link>
              </li>
              <li>Privacy &amp; Accessibility</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

