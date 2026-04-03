"use client";

import { PropertyItem, UniversalContent } from "@/types/cms.types";
import { ListEditor } from "@/components/ui/list-editor";
import { ImageUrlInput } from "@/components/ui/image-url-input";
import { SectionTitle } from "@/components/ui/field-group";

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
    <div>
      <SectionTitle
        title="Featured Properties"
        description="Add the hotels and venues that will appear in the properties carousel or grid section."
      />

      <ListEditor
        items={content.properties}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onUpdate={handleUpdate}
        renderItem={(item, { onUpdate }) => (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A5652" }}>
                  Property Name
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => onUpdate(item.id, { name: e.target.value })}
                  className="cms-input"
                  placeholder="e.g. Hotel Bidakara Jakarta"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A5652" }}>
                  Location / Tag
                </label>
                <input
                  type="text"
                  value={item.location}
                  onChange={(e) => onUpdate(item.id, { location: e.target.value })}
                  className="cms-input"
                  placeholder="e.g. Pancoran, Jakarta Selatan"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5A5652" }}>
                Abstract / Short Description
              </label>
              <textarea
                value={item.abstract}
                onChange={(e) => onUpdate(item.id, { abstract: e.target.value })}
                rows={2}
                className="cms-input cms-textarea"
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
