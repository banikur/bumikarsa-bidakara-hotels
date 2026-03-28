"use client";

import { FormEvent, useState } from "react";
import type {
  InquiryKind,
  BaseInquiryPayload,
  HotelInquiryPayload,
  EventInquiryPayload,
} from "./inquiry-types";

type InquiryFormProps =
  | {
      kind: "general" | "membership";
      context?: Record<string, unknown>;
    }
  | {
      kind: "hotel";
      context?: { hotelSlug?: string };
    }
  | {
      kind: "meetings" | "weddings";
      context?: { hotelSlug?: string };
    };

type Status = "idle" | "submitting" | "success" | "error";

export function InquiryForm(props: InquiryFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    // Placeholder submit – integration point for email/API/CRM.
    setTimeout(() => {
      setStatus("success");
    }, 800);
  }

  const locale: "id" | "en" = "id";

  const baseLabels =
    locale === "id"
      ? {
          name: "Nama Lengkap",
          email: "Email",
          phone: "Nomor Telepon",
          message: "Pesan",
          submit: "Kirim Permintaan",
        }
      : {
          name: "Full Name",
          email: "Email",
          phone: "Phone Number",
          message: "Message",
          submit: "Send Enquiry",
        };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-border-subtle/70 bg-black/55 p-4 text-xs text-zinc-200 md:p-5"
      aria-live="polite"
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Field>
          <Label htmlFor="fullName">{baseLabels.name}</Label>
          <Input id="fullName" name="fullName" required />
        </Field>
        <Field>
          <Label htmlFor="email">{baseLabels.email}</Label>
          <Input id="email" name="email" type="email" required />
        </Field>
        <Field>
          <Label htmlFor="phone">{baseLabels.phone}</Label>
          <Input id="phone" name="phone" />
        </Field>
        {props.kind === "hotel" && (
          <>
            <Field>
              <Label htmlFor="checkIn">
                {locale === "id" ? "Check-in" : "Check-in"}
              </Label>
              <Input id="checkIn" name="checkIn" type="date" />
            </Field>
            <Field>
              <Label htmlFor="checkOut">
                {locale === "id" ? "Check-out" : "Check-out"}
              </Label>
              <Input id="checkOut" name="checkOut" type="date" />
            </Field>
          </>
        )}
        {(props.kind === "meetings" || props.kind === "weddings") && (
          <>
            <Field>
              <Label htmlFor="eventDate">
                {locale === "id" ? "Tanggal Acara" : "Event Date"}
              </Label>
              <Input id="eventDate" name="eventDate" type="date" />
            </Field>
            <Field>
              <Label htmlFor="attendees">
                {locale === "id" ? "Perkiraan Tamu" : "Estimated Guests"}
              </Label>
              <Input id="attendees" name="attendees" type="number" min={1} />
            </Field>
          </>
        )}
      </div>
      <Field>
        <Label htmlFor="message">{baseLabels.message}</Label>
        <Textarea id="message" name="message" rows={4} />
      </Field>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-accent-gold px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-black shadow-[0_12px_30px_rgba(0,0,0,0.6)] disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : baseLabels.submit}
        </button>
        {status === "success" && (
          <p className="text-[11px] text-emerald-300">
            {locale === "id"
              ? "Terima kasih. Tim kami akan menghubungi Anda segera."
              : "Thank you. Our team will be in touch shortly."}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1.5">{children}</div>;
}

function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      {...props}
      className="block text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400"
    />
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-full border border-border-subtle/70 bg-black/40 px-3 py-2 text-xs text-zinc-100 outline-none ring-0 focus-visible:border-accent-gold focus-visible:ring-1 focus-visible:ring-accent-gold/80"
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full rounded-2xl border border-border-subtle/70 bg-black/40 px-3 py-2 text-xs text-zinc-100 outline-none ring-0 focus-visible:border-accent-gold focus-visible:ring-1 focus-visible:ring-accent-gold/80"
    />
  );
}

