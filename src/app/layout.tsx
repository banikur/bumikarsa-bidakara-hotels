import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { RootProviders } from "@/components/layout/root-providers";
import { ScrollProgressRing } from "@/components/scroll/scroll-progress-ring";
import { ScrollOverlayRoot } from "@/components/scroll/scroll-overlay-root";
import { Navbar } from "@/components/layout/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bumikarsa Bidakara Hotels | Soul of the Archipelago",
  description:
    "BUMIKARSA BIDAKARA HOTELS – soulful Indonesian hospitality with modern elegance. Discover curated stays, meetings, weddings, dining, and wellness across the archipelago.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} bg-background text-foreground antialiased`}
      >
        <RootProviders>
          <ScrollOverlayRoot />
          <Navbar />
          {children}
          <ScrollProgressRing />
        </RootProviders>
      </body>
    </html>
  );
}

