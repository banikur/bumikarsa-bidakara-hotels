"use client";

import { useScrollOverlay } from "@/components/scroll/use-scroll-overlay";

export function ScrollOverlayRoot() {
  useScrollOverlay(80);
  return null;
}

