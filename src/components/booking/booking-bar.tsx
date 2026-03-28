"use client";

import { BookingAction, BookingContext } from "@/types/booking";
import { BookingCta } from "./booking-cta";

type BookingBarProps = {
  primaryAction: BookingAction;
  secondaryAction?: BookingAction;
  context?: BookingContext;
  label?: string;
};

export function BookingBar({
  primaryAction,
  secondaryAction,
  context,
  label,
}: BookingBarProps) {
  return (
    <section
      aria-label={label ?? "Booking"}
      className="flex flex-col gap-3 rounded-3xl border border-border-subtle/70 bg-black/60 p-4 text-[11px] text-zinc-200 md:flex-row md:items-center md:justify-between md:gap-4"
    >
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-[0.26em] text-zinc-400">
          {label ?? "Booking & Enquiries"}
        </p>
        <p className="max-w-md text-xs text-zinc-300">
          {/* Copy ini bisa di-i18n atau diambil dari CMS */}
          Real-time availability, group quotations, dan proposal terkurasi
          akan dihubungkan ke mesin pemesanan resmi Bumikarsa Bidakara.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <BookingCta action={primaryAction} context={context} />
        {secondaryAction && (
          <BookingCta
            action={secondaryAction}
            context={context}
            variant="outline"
          />
        )}
      </div>
    </section>
  );
}

