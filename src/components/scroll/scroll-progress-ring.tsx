"use client";

import { useEffect, useState } from "react";

type ScrollProgressRingProps = {
  size?: number;
  strokeWidth?: number;
};

export function ScrollProgressRing({
  size = 40,
  strokeWidth = 3,
}: ScrollProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const value = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(Math.max(value, 0), 1));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const offset = circumference - progress * circumference;

  return (
    <button
      type="button"
      aria-label="Scroll progress"
      className="fixed bottom-6 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle/70 bg-black/70 backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:right-6"
    >
      <svg width={size} height={size}>
        <circle
          stroke="rgba(148, 163, 184, 0.35)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="rgba(212, 175, 119, 0.95)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
    </button>
  );
}

