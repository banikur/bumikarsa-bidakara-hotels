"use client";

import { ChangeEvent } from "react";

interface ImageUrlInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export function ImageUrlInput({ value, onChange, label = "Image URL", placeholder = "https://example.com/image.jpg" }: ImageUrlInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-foreground uppercase tracking-wider">{label}</label>
      <input
        type="url"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-background border rounded text-sm outline-none focus:border-primary transition-colors"
      />
      <div className="mt-2 w-full h-20 border border-dashed rounded bg-muted/30 flex items-center justify-center overflow-hidden">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="Preview"
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="%239ca3af"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
            }}
          />
        ) : (
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            No Image Provided
          </span>
        )}
      </div>
    </div>
  );
}
