"use client";

import { MembershipTier, UniversalContent } from "@/types/cms.types";
import { ListEditor } from "@/components/ui/list-editor";
import { ChangeEvent } from "react";

interface SectionFormProps {
  content: UniversalContent;
  onChange: (updated: UniversalContent) => void;
}

export function MembershipSection({ content, onChange }: SectionFormProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({
      ...content,
      membership: {
        ...content.membership,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleAddTier = () => {
    const newTier: MembershipTier = {
      id: crypto.randomUUID(),
      name: "",
      benefits: [],
    };
    onChange({
      ...content,
      membership: { ...content.membership, tiers: [...content.membership.tiers, newTier] },
    });
  };

  const handleUpdateTier = (id: string, updated: Partial<MembershipTier>) => {
    onChange({
      ...content,
      membership: {
        ...content.membership,
        tiers: content.membership.tiers.map((t) => (t.id === id ? { ...t, ...updated } : t)),
      },
    });
  };

  const handleRemoveTier = (id: string) => {
    onChange({
      ...content,
      membership: {
        ...content.membership,
        tiers: content.membership.tiers.filter((t) => t.id !== id),
      },
    });
  };

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div className="flex flex-col gap-6">
        <div className="mb-2">
          <h2 className="text-lg font-bold">Membership Intro</h2>
          <p className="text-sm text-muted-foreground">General details for the membership club teaser.</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Headline</label>
          <input
            type="text"
            name="headline"
            value={content.membership.headline}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-background border rounded text-sm outline-none focus:border-primary"
            placeholder="e.g. Join the Elite Club"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-foreground uppercase tracking-wider">Description</label>
          <textarea
            name="description"
            value={content.membership.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 bg-background border rounded text-sm outline-none focus:border-primary resize-y"
            placeholder="Experience bespoke luxury..."
          />
        </div>
      </div>

      <div className="border-t pt-8">
        <div className="mb-4">
          <h2 className="text-lg font-bold">Membership Tiers</h2>
          <p className="text-sm text-muted-foreground">Manage tier names and their exclusive benefits.</p>
        </div>

        <ListEditor
          items={content.membership.tiers || []}
          onAdd={handleAddTier}
          onRemove={handleRemoveTier}
          onUpdate={handleUpdateTier}
          renderItem={(item, { onUpdate }) => (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Tier Name</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => onUpdate(item.id, { name: e.target.value })}
                  className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:border-primary"
                  placeholder="e.g. Platinum"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Benefits (One per line)</label>
                <textarea
                  value={item.benefits.join("\n")}
                  onChange={(e) => onUpdate(item.id, { benefits: e.target.value.split("\n").filter(Boolean) })}
                  rows={4}
                  className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:border-primary resize-y leading-relaxed"
                  placeholder="Dedicated Butler&#10;Free Airport Transfer&#10;Late Checkout 4 PM"
                />
                <p className="text-[10px] text-muted-foreground">Press Enter for a new line to add another benefit.</p>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
