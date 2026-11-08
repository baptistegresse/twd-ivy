import type { Metadata, Viewport } from "next";
import { Geist, Pixelify_Sans, Press_Start_2P } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* Only used by Ivy's theme, so they are not preloaded for everyone. */
const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  preload: false,
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "TWD · Baptiste & Ivy",
  description: "Our survival log: where each of us is in The Walking Dead.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#141414",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${pixelify.variable} ${pressStart.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
