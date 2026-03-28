"use client";

import { ReactNode } from "react";
import { LocaleProvider } from "@/contexts/locale-context";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";

export function RootProviders({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </LocaleProvider>
  );
}

