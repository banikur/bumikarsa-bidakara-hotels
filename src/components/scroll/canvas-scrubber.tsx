"use client";

import { useEffect, useRef } from "react";

type CanvasScrubberProps = {
  width?: number;
  height?: number;
};

// Placeholder canvas-based visual, ready to be wired to real frame data.
export function CanvasScrubber({
  width = 480,
  height = 260,
}: CanvasScrubberProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const canvas = canvasEl;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    canvas.width = width;
    canvas.height = height;

    function render(progress: number) {
      const w = canvas.width;
      const h = canvas.height;
      context.clearRect(0, 0, w, h);

      const gradient = context.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "rgba(24, 178, 119, 0.16)");
      gradient.addColorStop(1, "rgba(212, 175, 119, 0.6)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, w, h);

      context.fillStyle = "rgba(0, 0, 0, 0.52)";
      context.fillRect(24, 24, w - 48, h - 48);

      const barWidth = (w - 80) * progress;
      context.fillStyle = "rgba(212, 175, 119, 0.9)";
      context.fillRect(40, h - 40, barWidth, 4);
    }

    function handleScroll() {
      const rect = canvas.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const visible = 1 - rect.top / viewportHeight;
      const clamped = Math.min(Math.max(visible, 0), 1);
      render(clamped);
    }

    render(0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="h-40 w-full rounded-2xl border border-border-subtle/70 bg-black/60 sm:h-48"
    />
  );
}

