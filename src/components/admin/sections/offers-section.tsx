"use client";

import { OfferItem, UniversalContent } from "@/types/cms.types";
import { ListEditor } from "@/components/ui/list-editor";
import { ImageUrlInput } from "@/components/ui/image-url-input";

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
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="mb-4">
        <h2 className="text-lg font-bold">Special Offers</h2>
        <p className="text-sm text-muted-foreground">Manage exclusive promotions, staycation deals, and early bird discounts.</p>
      </div>

      <ListEditor
        items={content.offers}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onUpdate={handleUpdate}
        renderItem={(item, { onUpdate }) => (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 flex flex-col gap-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Offer Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => onUpdate(item.id, { title: e.target.value })}
                  className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:border-primary"
                  placeholder="e.g. Weekend Gateway"
                />
              </div>
              <div className="col-span-1 flex flex-col gap-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Badge (Optional)</label>
                <input
                  type="text"
                  value={item.badge || ""}
                  onChange={(e) => onUpdate(item.id, { badge: e.target.value })}
                  className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:border-primary"
                  placeholder="e.g. 20% OFF"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Subtitle / Short Detail</label>
              <textarea
                value={item.subtitle}
                onChange={(e) => onUpdate(item.id, { subtitle: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:border-primary resize-y"
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
