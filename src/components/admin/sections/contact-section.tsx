"use client";

import { UniversalContent } from "@/types/cms.types";
import { ChangeEvent } from "react";
import { FieldGroup, SectionTitle } from "@/components/ui/field-group";

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
    <div>
      <SectionTitle
        title="Contact & Information"
        description="Phone numbers, email, address, and map embed for the footer and enquiry sections."
      />

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <FieldGroup label="Phone Number" hint="Primary contact shown in the site header and contact block.">
            <input
              type="text"
              name="phone"
              value={content.contact.phone}
              onChange={handleChange}
              className="cms-input"
              placeholder="e.g. +62 21 8379 3555"
            />
          </FieldGroup>
          <FieldGroup label="Email Address" hint="Reservation and enquiry email address.">
            <input
              type="email"
              name="email"
              value={content.contact.email}
              onChange={handleChange}
              className="cms-input"
              placeholder="e.g. reservation@bidakara.com"
            />
          </FieldGroup>
        </div>

        <FieldGroup label="Full Address" hint="Street address shown in the footer or map block.">
          <textarea
            name="address"
            value={content.contact.address}
            onChange={handleChange}
            rows={3}
            className="cms-input cms-textarea"
            placeholder="Jl. Jend. Gatot Subroto Kav. 71-73, Jakarta..."
          />
        </FieldGroup>

        <FieldGroup label="Google Maps Embed URL" hint="Paste the src URL found inside the Google Maps iframe embed code.">
          <input
            type="url"
            name="maps_url"
            value={content.contact.maps_url}
            onChange={handleChange}
            className="cms-input"
            placeholder="https://www.google.com/maps/embed?pb=..."
          />
        </FieldGroup>

        <FieldGroup label="Footer Tagline / Story" hint="A short sentence or slogan shown at the very bottom of the page.">
          <textarea
            name="footer_tagline"
            value={content.contact.footer_tagline}
            onChange={handleChange}
            rows={2}
            className="cms-input cms-textarea"
            placeholder="A short story or slogan..."
          />
        </FieldGroup>
      </div>
    </div>
  );
}
