"use client";

import { useEffect } from "react";

export function useScrollOverlay(threshold: number = 80) {
  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY > threshold;
      document.documentElement.classList.toggle("bk-scrolled", scrolled);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
}

