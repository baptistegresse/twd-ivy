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

const IMAGE_SIZES: Readonly<Record<ImageSlot, string>> = {
  hero: "(min-width: 1024px) 1024px, 100vw",
  card: "256px",
  thumb: "(min-width: 640px) 192px, 144px",
};

export function imageSizes(slot: ImageSlot): string {
  return IMAGE_SIZES[slot];
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
