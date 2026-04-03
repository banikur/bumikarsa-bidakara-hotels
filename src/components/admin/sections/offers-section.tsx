"use client";

import { OfferItem, UniversalContent } from "@/types/cms.types";
import { ListEditor } from "@/components/ui/list-editor";
import { ImageUrlInput } from "@/components/ui/image-url-input";
import { SectionTitle } from "@/components/ui/field-group";

interface SectionFormProps {
  content: UniversalContent;
  onChange: (updated: UniversalContent) => void;
}

export function OffersSection({ content, onChange }: SectionFormProps) {
  const handleAdd = () => {
    const newItem: OfferItem = {
      id: crypto.randomUUID(),
      title: "",
      subtitle: "",
      badge: "",
      image_url: "",
    };
    onChange({ ...content, offers: [...content.offers, newItem] });
  };

  const handleUpdate = (id: string, updated: Partial<OfferItem>) => {
    onChange({
      ...content,
      offers: content.offers.map((f) => (f.id === id ? { ...f, ...updated } : f)),
    });
  };

  const handleRemove = (id: string) => {
    onChange({
      ...content,
      offers: content.offers.filter((f) => f.id !== id),
    });
  };

  return (
    <div>
      <SectionTitle
        title="Special Offers"
        description="Manage exclusive promotions, staycation deals, and early bird discounts shown in the Offers section."
      />

      <ListEditor
        items={content.offers}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onUpdate={handleUpdate}
        renderItem={(item, { onUpdate }) => (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 flex flex-col gap-1.5">
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A5652" }}>
                  Offer Title
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => onUpdate(item.id, { title: e.target.value })}
                  className="cms-input"
                  placeholder="e.g. Weekend Gateway"
                />
              </div>
              <div className="col-span-1 flex flex-col gap-1.5">
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A5652" }}>
                  Badge (Optional)
                </label>
                <input
                  type="text"
                  value={item.badge || ""}
                  onChange={(e) => onUpdate(item.id, { badge: e.target.value })}
                  className="cms-input"
                  placeholder="e.g. 20% OFF"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A5652" }}>
                Subtitle / Short Detail
              </label>
              <textarea
                value={item.subtitle}
                onChange={(e) => onUpdate(item.id, { subtitle: e.target.value })}
                rows={2}
                className="cms-input cms-textarea"
                placeholder="Includes breakfast for two and late checkout..."
              />
            </div>

            <ImageUrlInput
              label="Offer Image URL"
              value={item.image_url}
              onChange={(url) => onUpdate(item.id, { image_url: url })}
            />
          </div>
        )}
      />
    </div>
  );
}
