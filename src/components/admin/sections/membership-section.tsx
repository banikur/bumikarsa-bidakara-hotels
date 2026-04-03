"use client";

import { MembershipTier, UniversalContent } from "@/types/cms.types";
import { ListEditor } from "@/components/ui/list-editor";
import { ChangeEvent } from "react";
import { FieldGroup, SectionTitle } from "@/components/ui/field-group";

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
    <div className="flex flex-col gap-10">
      {/* Intro block */}
      <div>
        <SectionTitle
          title="Membership Club"
          description="Set the headline and description for the loyalty membership teaser section."
        />

        <div className="flex flex-col gap-6">
          <FieldGroup label="Headline" hint="The main hook for the membership program.">
            <input
              type="text"
              name="headline"
              value={content.membership.headline}
              onChange={handleChange}
              className="cms-input cms-input-lg"
              placeholder="e.g. Join the Elite Club"
            />
          </FieldGroup>

          <FieldGroup label="Description" hint="A 2–3 sentence intro to the membership benefits.">
            <textarea
              name="description"
              value={content.membership.description}
              onChange={handleChange}
              rows={3}
              className="cms-input cms-textarea"
              placeholder="Experience bespoke services, exclusive rewards, and privileges reserved for our members..."
            />
          </FieldGroup>
        </div>
      </div>

      {/* Tiers block */}
      <div style={{ borderTop: "1px solid #E5E1DB", paddingTop: 32 }}>
        <SectionTitle
          title="Membership Tiers"
          description="Manage tier names and their exclusive benefits. Each benefit is one line."
        />

        <ListEditor
          items={content.membership.tiers || []}
          onAdd={handleAddTier}
          onRemove={handleRemoveTier}
          onUpdate={handleUpdateTier}
          renderItem={(item, { onUpdate }) => (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A5652" }}>
                  Tier Name
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => onUpdate(item.id, { name: e.target.value })}
                  className="cms-input"
                  placeholder="e.g. Platinum"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A5652" }}>
                  Benefits (one per line)
                </label>
                <textarea
                  value={item.benefits.join("\n")}
                  onChange={(e) => onUpdate(item.id, { benefits: e.target.value.split("\n").filter(Boolean) })}
                  rows={4}
                  className="cms-input cms-textarea"
                  placeholder={"Dedicated Butler\nFree Airport Transfer\nLate Checkout 4 PM"}
                />
                <span style={{ fontSize: 11, color: "#b0a898" }}>Press Enter for a new line to add another benefit.</span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
