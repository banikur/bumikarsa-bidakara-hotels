"use client";

import { UniversalContent } from "@/types/cms.types";
import { ImageUrlInput } from "@/components/ui/image-url-input";
import { ChangeEvent } from "react";
import { FieldGroup, SectionTitle } from "@/components/ui/field-group";

interface SectionFormProps {
  content: UniversalContent;
  onChange: (updated: UniversalContent) => void;
}

export function HeroSection({ content, onChange }: SectionFormProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({
      ...content,
      hero: {
        ...content.hero,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleImageChange = (url: string) => {
    onChange({
      ...content,
      hero: { ...content.hero, background_image_url: url },
    });
  };

  return (
    <div>
      <SectionTitle
        title="Hero Section"
        description="The first thing visitors see. Make it count — this sets the tone for the entire experience."
      />

      <div className="flex flex-col gap-6">
        <FieldGroup label="Headline / Main Title" hint="The primary statement — bold and aspirational.">
          <input
            type="text"
            name="headline"
            value={content.hero.headline}
            onChange={handleChange}
            className="cms-input cms-input-lg"
            placeholder="e.g. Unforgettable Corporate Meetings"
          />
        </FieldGroup>

        <FieldGroup label="Subtitle / Tagline" hint="Supports the headline with context or tone.">
          <input
            type="text"
            name="subtitle"
            value={content.hero.subtitle}
            onChange={handleChange}
            className="cms-input"
            placeholder="e.g. Experience Bidakara Hospitality"
          />
        </FieldGroup>

        <FieldGroup label="Description" hint="A 1–2 sentence supporting description shown below the tagline.">
          <textarea
            name="description"
            value={content.hero.description}
            onChange={handleChange}
            rows={4}
            className="cms-input cms-textarea"
            placeholder="Detailed hero text or welcome message..."
          />
        </FieldGroup>

        <div className="grid grid-cols-2 gap-4">
          <FieldGroup label="Primary Button" hint="Main CTA — book, explore, etc.">
            <input
              type="text"
              name="cta_primary"
              value={content.hero.cta_primary}
              onChange={handleChange}
              className="cms-input"
              placeholder="e.g. Book a Room"
            />
          </FieldGroup>
          <FieldGroup label="Secondary Button" hint="Optional secondary action link.">
            <input
              type="text"
              name="cta_secondary"
              value={content.hero.cta_secondary}
              onChange={handleChange}
              className="cms-input"
              placeholder="e.g. View Offers"
            />
          </FieldGroup>
        </div>

        <div style={{ borderTop: "1px solid #E5E1DB", paddingTop: 24, marginTop: 4 }}>
          <ImageUrlInput
            label="Hero Background Image"
            value={content.hero.background_image_url}
            onChange={handleImageChange}
            placeholder="https://images.unsplash.com/..."
          />
        </div>
      </div>
    </div>
  );
}
