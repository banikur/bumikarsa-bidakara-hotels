"use client";

import { UniversalContent } from "@/types/cms.types";
import { ChangeEvent } from "react";

interface SectionFormProps {
  content: UniversalContent;
  onChange: (updated: UniversalContent) => void;
}

export function ContactSection({ content, onChange }: SectionFormProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({
      ...content,
      contact: {
        ...content.contact,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="mb-4">
        <h2 className="text-lg font-bold">Contact & Info</h2>
        <p className="text-sm text-muted-foreground">Information that displays in the enquiry form, footer, or map blocks.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Phone</label>
          <input
            type="text"
            name="phone"
            value={content.contact.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-background border rounded text-sm outline-none focus:border-primary"
            placeholder="e.g. +62 21 8379 3555"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Email</label>
          <input
            type="email"
            name="email"
            value={content.contact.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-background border rounded text-sm outline-none focus:border-primary"
            placeholder="e.g. reservation@bidakara.com"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Address</label>
        <textarea
          name="address"
          value={content.contact.address}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 bg-background border rounded-lg text-sm outline-none focus:border-primary resize-y"
          placeholder="Detailed offline address for Footer..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Google Maps Embed URL</label>
        <input
          type="url"
          name="maps_url"
          value={content.contact.maps_url}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-background border rounded text-sm outline-none focus:border-primary"
          placeholder="https://www.google.com/maps/embed?..."
        />
        <p className="text-[10px] text-muted-foreground mt-1">Make sure you paste the src URL inside the iframe embed code.</p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Footer Tagline/Story</label>
        <textarea
          name="footer_tagline"
          value={content.contact.footer_tagline}
          onChange={handleChange}
          rows={2}
          className="w-full px-4 py-3 bg-background border rounded-lg text-sm outline-none focus:border-primary resize-y"
          placeholder="A short story or slogan at the bottom of the page..."
        />
      </div>
    </div>
  );
}
