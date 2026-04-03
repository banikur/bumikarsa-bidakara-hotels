"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h2 className="mb-4 font-display text-3xl">Something went wrong</h2>
        <p className="mb-8 text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="rounded bg-accent-gold px-6 py-3 text-sm font-medium uppercase tracking-wider text-black hover:bg-accent-gold/90"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
