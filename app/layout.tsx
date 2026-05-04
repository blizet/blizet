import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Caveat, Permanent_Marker } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-hand" });
const marker = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--font-marker" });

export const metadata: Metadata = {
  title: "Anjali Jha · Software Developer",
  description:
    "where code meets craft. Building systems, designing experiences, and shaping ideas into something real.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable} ${marker.variable}`}>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
