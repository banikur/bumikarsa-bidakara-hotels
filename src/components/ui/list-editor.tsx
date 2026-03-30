"use client";

import { ReactNode } from "react";

interface ListEditorProps<T extends { id: string }> {
  items: T[];
  onAdd: () => void;
  onUpdate: (id: string, updated: Partial<T>) => void;
  onRemove: (id: string) => void;
  renderItem: (item: T, handlers: { onUpdate: (id: string, updated: Partial<T>) => void; onRemove: (id: string) => void; }) => ReactNode;
}

export function ListEditor<T extends { id: string }>({ items, onAdd, onUpdate, onRemove, renderItem }: ListEditorProps<T>) {
  return (
    <div className="flex flex-col gap-4">
      {items.length === 0 && (
        <div className="text-sm text-center py-6 border border-dashed rounded text-muted-foreground">
          No items yet. Click below to add one.
        </div>
      )}

      {items.map((item, index) => (
        <div key={item.id} className="p-4 border rounded bg-card relative group">
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => onRemove(item.id)}
              className="text-muted-foreground hover:text-red-500 bg-background/50 backdrop-blur-sm p-1.5 rounded"
              title="Remove Item"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
              {index + 1}
            </span>
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Item {index + 1}</span>
          </div>

          <div className="flex flex-col gap-4">
            {renderItem(item, { onUpdate, onRemove })}
          </div>
        </div>
      ))}

      <button
        onClick={onAdd}
        className="w-full py-3 rounded border border-dashed hover:border-primary hover:text-primary transition-colors text-sm font-medium flex items-center justify-center gap-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add New Item
      </button>
    </div>
  );
}
