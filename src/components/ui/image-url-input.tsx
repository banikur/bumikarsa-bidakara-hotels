"use client";

import { ChangeEvent } from "react";

interface ImageUrlInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export function ImageUrlInput({
  value,
  onChange,
  label = "Image URL",
  placeholder = "https://example.com/image.jpg",
}: ImageUrlInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <label
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#3D3B38",
            display: "block",
            marginBottom: 6,
          }}
        >
          {label}
        </label>
        <input
          type="url"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          placeholder={placeholder}
          className="cms-input"
        />
      </div>

      {/* Preview */}
      <div
        style={{
          width: "100%",
          height: 180,
          borderRadius: 10,
          border: "1.5px dashed #D4C9B8",
          background: "rgba(255,255,255,0.5)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = "none";
              img.nextElementSibling?.setAttribute("style", "display: flex");
            }}
          />
        ) : null}
        <div
          style={{
            display: value ? "none" : "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            color: "#C4BDB1",
            userSelect: "none",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Image Preview
          </span>
          <span style={{ fontSize: 11, color: "#C4BDB1", opacity: 0.7 }}>
            Paste a URL above to preview
          </span>
        </div>
      </div>
    </div>
  );
}
