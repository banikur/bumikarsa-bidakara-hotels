"use client";

import { PropertyItem, UniversalContent } from "@/types/cms.types";
import { ListEditor } from "@/components/ui/list-editor";
import { ImageUrlInput } from "@/components/ui/image-url-input";
import { ChangeEvent } from "react";

interface SectionFormProps {
  content: UniversalContent;
  onChange: (updated: UniversalContent) => void;
}

export function PropertiesSection({ content, onChange }: SectionFormProps) {
  const handleAdd = () => {
    const newItem: PropertyItem = {
      id: crypto.randomUUID(),
      name: "",
      location: "",
      abstract: "",
      image_url: "",
    };
    onChange({ ...content, properties: [...content.properties, newItem] });
  };

  const handleUpdate = (id: string, updated: Partial<PropertyItem>) => {
    onChange({
      ...content,
      properties: content.properties.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    });
  };

  const handleRemove = (id: string) => {
    onChange({
      ...content,
      properties: content.properties.filter((p) => p.id !== id),
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="mb-4">
        <h2 className="text-lg font-bold">Featured Properties</h2>
        <p className="text-sm text-muted-foreground">Add or edit hotels and managed properties that will appear on the landing page slider or grid.</p>
      </div>

      <ListEditor
        items={content.properties}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onUpdate={handleUpdate}
        renderItem={(item, { onUpdate }) => (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Property Name</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => onUpdate(item.id, { name: e.target.value })}
                  className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:border-primary"
                  placeholder="e.g. Hotel Bidakara Jakarta"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Location / Tag</label>
                <input
                  type="text"
                  value={item.location}
                  onChange={(e) => onUpdate(item.id, { location: e.target.value })}
                  className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:border-primary"
                  placeholder="e.g. Pancoran, Jakarta Selatan"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Abstract / Short Description</label>
              <textarea
                value={item.abstract}
                onChange={(e) => onUpdate(item.id, { abstract: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 bg-background border rounded text-sm outline-none focus:border-primary resize-y"
                placeholder="Briefly describe the property's best selling points..."
              />
            </div>

            <ImageUrlInput
              label="Property Image URL"
              value={item.image_url}
              onChange={(url) => onUpdate(item.id, { image_url: url })}
            />
          </div>
        )}
      />
    </div>
  );
}
