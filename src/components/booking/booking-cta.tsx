"use client";

import { ReactNode } from "react";
import { BookingAction, BookingContext } from "@/types/booking";

type BookingCtaProps = {
  action: BookingAction;
  context?: BookingContext;
  variant?: "primary" | "outline" | "ghost";
  children?: ReactNode;
};

const actionLabel: Record<BookingAction, { id: string; en: string }> = {
  "book-stay": {
    id: "Pesan Kamar",
    en: "Book Now",
  },
  "check-availability": {
    id: "Cek Ketersediaan",
    en: "Check Availability",
  },
  "plan-event": {
    id: "Rencanakan Acara",
    en: "Plan Your Event",
  },
  "request-proposal": {
    id: "Minta Proposal",
    en: "Request Proposal",
  },
};

export function BookingCta({
  action,
  context,
  variant = "primary",
  children,
}: BookingCtaProps) {
  // Locale selection will later come from a central i18n hook; for now default to ID.
  const locale: "id" | "en" = "id";
  const label = locale === "id" ? actionLabel[action].id : actionLabel[action].en;

  const base =
    "inline-flex items-center justify-center rounded-full text-[10px] uppercase tracking-[0.22em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  const styles =
    variant === "primary"
      ? "bg-accent-gold px-5 py-2 font-semibold text-black shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
      : variant === "outline"
      ? "border border-border-subtle/70 bg-black/40 px-4 py-2 text-zinc-200"
      : "px-3 py-1.5 text-zinc-300";

  return (
    <button
      type="button"
      className={`${base} ${styles}`}
      aria-label={label}
      data-booking-action={action}
      data-booking-context={JSON.stringify(context ?? {})}
    >
      {children ?? label}
    </button>
  );
}

