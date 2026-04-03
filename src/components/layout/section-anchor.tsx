"use client";

import { ReactNode, CSSProperties } from "react";

export interface SectionAnchorProps {
  id: string;
  offset?: string; // e.g. "96px"
}

// Small helper to normalize anchor targets across all templates.
// Adds scroll-margin-top to avoid fixed header overlap and keeps id centralized.
export function SectionAnchor({ id, offset = "96px" }: SectionAnchorProps) {
  return <div id={id} style={{ position: "relative", top: "-1px", height: 0, minHeight: 0, scrollMarginTop: offset }} />;
}

export interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  offset?: string;
}

export function Section({ id, children, className = "", style = {}, offset = "96px" }: SectionProps) {
  return (
    <section id={id} className={className} style={{ ...style, scrollMarginTop: offset }}>
      {children}
    </section>
  );
}
