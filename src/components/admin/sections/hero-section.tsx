"use client";

import { UniversalContent } from "@/types/cms.types";
import { ImageUrlInput } from "@/components/ui/image-url-input";
import { ChangeEvent } from "react";

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
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Headline / Main Title</label>
        <input
          type="text"
          name="headline"
          value={content.hero.headline}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-background border rounded-lg text-lg font-medium outline-none focus:border-primary"
          placeholder="e.g. Unforgettable Corporate Meetings"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Subtitle / Tagline</label>
        <input
          type="text"
          name="subtitle"
          value={content.hero.subtitle}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-background border rounded text-sm outline-none focus:border-primary"
          placeholder="e.g. Experience Bidakara Hospitality"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Description</label>
        <textarea
          name="description"
          value={content.hero.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-background border rounded-lg text-sm outline-none focus:border-primary resize-y"
          placeholder="Detailed hero text or welcome message..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Primary Button Text</label>
          <input
            type="text"
            name="cta_primary"
            value={content.hero.cta_primary}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-background border rounded text-sm outline-none focus:border-primary"
            placeholder="e.g. Book a Room"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Secondary Button Text</label>
          <input
            type="text"
            name="cta_secondary"
            value={content.hero.cta_secondary}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-background border rounded text-sm outline-none focus:border-primary"
            placeholder="e.g. View Offers"
          />
        </div>
      </div>

      <div className="mt-4 pt-6 border-t">
        <ImageUrlInput
          label="Hero Background Image URL"
          value={content.hero.background_image_url}
          onChange={handleImageChange}
          placeholder="https://images.unsplash.com/..."
        />
      </div>
    </div>
  );
}
