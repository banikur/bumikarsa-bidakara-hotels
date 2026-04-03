import { ReactNode } from "react";

interface FieldGroupProps {
  label: string;
  hint?: string;
  children: ReactNode;
}

export function FieldGroup({ label, hint, children }: FieldGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-0.5">
        <label
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#3D3B38",
          }}
        >
          {label}
        </label>
        {hint && (
          <span style={{ fontSize: 12, color: "#999", lineHeight: 1.5 }}>{hint}</span>
        )}
      </div>
      {children}
    </div>
  );
}

interface SectionTitleProps {
  title: string;
  description?: string;
}

export function SectionTitle({ title, description }: SectionTitleProps) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#111",
          letterSpacing: "-0.02em",
          margin: 0,
          marginBottom: 8,
        }}
      >
        {title}
      </h2>
      {description && (
        <p style={{ fontSize: 14, color: "#777", lineHeight: 1.65, maxWidth: 520, margin: 0 }}>
          {description}
        </p>
      )}
    </div>
  );
}
