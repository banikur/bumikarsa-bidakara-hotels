"use client";

import { FeatureItem, UniversalContent } from "@/types/cms.types";
import { ListEditor } from "@/components/ui/list-editor";
import { ImageUrlInput } from "@/components/ui/image-url-input";
import { SectionTitle } from "@/components/ui/field-group";

interface SectionFormProps {
  content: UniversalContent;
  onChange: (updated: UniversalContent) => void;
}

export function FeaturesSection({ content, onChange }: SectionFormProps) {
  const handleAdd = () => {
    const newItem: FeatureItem = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      capacity: undefined,
      image_url: "",
    };
    onChange({ ...content, features: [...content.features, newItem] });
  };

  const handleUpdate = (id: string, updated: Partial<FeatureItem>) => {
    onChange({
      ...content,
      features: content.features.map((f) => (f.id === id ? { ...f, ...updated } : f)),
    });
  };

  const handleRemove = (id: string) => {
    onChange({
      ...content,
      features: content.features.filter((f) => f.id !== id),
    });
  };

  return (
    <div>
      <SectionTitle
        title="Experiences & Venues"
        description="Depending on the active template, these render as Spa/Dining experiences or as MICE venue specifications."
      />

      <ListEditor
        items={content.features}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onUpdate={handleUpdate}
        renderItem={(item, { onUpdate }) => (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 flex flex-col gap-1.5">
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A5652" }}>
                  Feature Title / Venue Name
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => onUpdate(item.id, { title: e.target.value })}
                  className="cms-input"
                  placeholder="e.g. Birawa Assembly Hall"
                />
              </div>
              <div className="col-span-1 flex flex-col gap-1.5">
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A5652" }}>
                  Capacity (Pax)
                </label>
                <input
                  type="number"
                  value={item.capacity || ""}
                  onChange={(e) => onUpdate(item.id, { capacity: e.target.value ? parseInt(e.target.value, 10) : undefined })}
                  className="cms-input"
                  placeholder="e.g. 3000"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A5652" }}>
                Description
              </label>
              <textarea
                value={item.description}
                onChange={(e) => onUpdate(item.id, { description: e.target.value })}
                rows={2}
                className="cms-input cms-textarea"
                placeholder="Column-free Grand Ballroom..."
              />
            </div>

            <ImageUrlInput
              label="Feature Image URL"
              value={item.image_url}
              onChange={(url) => onUpdate(item.id, { image_url: url })}
            />
          </div>
        )}
      />
    </div>
  );
}
