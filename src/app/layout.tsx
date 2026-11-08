import type { Metadata, Viewport } from "next";
import { Geist, Special_Elite } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const specialElite = Special_Elite({
  variable: "--font-special-elite",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TWD · Baptiste & Ivy",
  description: "Notre carnet de survie : où on en est dans The Walking Dead.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0d0f0c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${specialElite.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
