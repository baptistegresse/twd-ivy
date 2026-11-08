import type { UserId } from "./types";

export type Theme = "classic" | "ivy";

export type ImageSlot = "hero" | "card" | "thumb";

export interface ThemeCopy {
  title: string;
  upNext: string;
  watchedButton: string;
  footer: string | null;
}

export function themeFor(user: UserId): Theme {
  return user === "ivy" ? "ivy" : "classic";
}

const CLASSIC_SIZES: Readonly<Record<ImageSlot, string>> = {
  hero: "(min-width: 1024px) 1024px, 100vw",
  card: "256px",
  thumb: "(min-width: 640px) 192px, 144px",
};

/**
 * Width (px) of the tiny rendition the pixel theme loads on purpose: upscaled
 * with `image-rendering: pixelated`, it turns into chunky pixel art.
 * Must be one of next/image's allowed widths (imageSizes / deviceSizes).
 */
const PIXEL_WIDTHS: Readonly<Record<ImageSlot, number>> = {
  hero: 128,
  card: 64,
  thumb: 64,
};

export interface StillSizing {
  sizes: string;
  pixelWidth: number | null;
}

export function stillSizing(theme: Theme, slot: ImageSlot): StillSizing {
  return {
    sizes: CLASSIC_SIZES[slot],
    pixelWidth: theme === "ivy" ? PIXEL_WIDTHS[slot] : null,
  };
}

const COPY: Readonly<Record<Theme, ThemeCopy>> = {
  classic: {
    title: "The Walking Dead",
    upNext: "Up next for you",
    watchedButton: "▶ I watched it",
    footer: null,
  },
  ivy: {
    title: "Ivy's Garden",
    upNext: "Up next, Ivy 🌷",
    watchedButton: "♥ I watched it",
    footer: "Made with love for my Ivy of love — B.",
  },
};

export function themeCopy(theme: Theme): ThemeCopy {
  return COPY[theme];
}
