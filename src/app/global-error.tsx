"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
          <div className="text-center">
            <h2 className="mb-4 font-display text-3xl">Application Error</h2>
            <p className="mb-8 text-muted-foreground">
              A critical error occurred. Please refresh the page or try again later.
            </p>
            <button
              onClick={reset}
              className="rounded bg-accent-gold px-6 py-3 text-sm font-medium uppercase tracking-wider text-black hover:bg-accent-gold/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
