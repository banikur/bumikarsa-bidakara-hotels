"use client";

import { UniversalContent } from "@/types/cms.types";

interface SectionFormProps {
  content: UniversalContent;
  onChange: (updated: UniversalContent) => void;
}

const PAGES = [
  { key: "ourHotels", label: "Our Hotels" },
  { key: "experiences", label: "Experiences" },
  { key: "offers", label: "Offers" },
  { key: "membership", label: "Membership" },
  { key: "stories", label: "Stories" },
  { key: "contact", label: "Contact" },
] as const;

export function PageHeadersSection({ content, onChange }: SectionFormProps) {
  const pages = content.pages || {
    ourHotels: { title: "", description: "" },
    experiences: { title: "", description: "" },
    offers: { title: "", description: "" },
    membership: { title: "", description: "" },
    stories: { title: "", description: "" },
    contact: { title: "", description: "" },
  };

  const updatePage = (key: string, field: "title" | "description", value: string) => {
    onChange({
      ...content,
      pages: {
        ...pages,
        [key]: { ...pages[key as keyof typeof pages], [field]: value },
      },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-foreground">Page Headers</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Edit title and description for each sub-page.
        </p>
      </div>

      {PAGES.map(({ key, label }) => (
        <div key={key} className="rounded-lg border border-border/50 bg-background p-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">{label}</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Title</label>
              <input
                type="text"
                value={pages[key as keyof typeof pages]?.title || ""}
                onChange={(e) => updatePage(key, "title", e.target.value)}
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary transition-colors"
                placeholder={`${label} page title`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Description</label>
              <textarea
                value={pages[key as keyof typeof pages]?.description || ""}
                onChange={(e) => updatePage(key, "description", e.target.value)}
                rows={3}
                className="w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary transition-colors resize-none"
                placeholder={`${label} page description`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
