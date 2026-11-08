/**
 * Tiny pixel-art sprites. Each row is a string; each character maps to a colour
 * in the sprite's palette ("." is transparent, "c" is currentColor).
 */
export interface Sprite {
  rows: readonly string[];
  palette: Readonly<Record<string, string>>;
}

const LEAF = "#5bbf7a";
const LEAF_DARK = "#3f9a5c";

export const HEART: Sprite = {
  rows: [".cc.cc.", "cwccccc", "ccccccc", ".ccccc.", "..ccc..", "...c..."],
  palette: { c: "currentColor", w: "#ffffff" },
};

export const ROSE: Sprite = {
  rows: [
    "..rrr..",
    ".rRrRr.",
    "rRrrrRr",
    ".rRRRr.",
    "..rrr..",
    "...g...",
    ".GGg...",
    "...gg..",
    "...g...",
  ],
  palette: { r: "#ff5c9d", R: "#d63a7a", g: LEAF, G: LEAF_DARK },
};

export const TULIP: Sprite = {
  rows: [
    ".t.t.t.",
    ".ttttt.",
    ".tTtTt.",
    "..ttt..",
    "...g...",
    "g..g..g",
    ".ggggg.",
    "...g...",
  ],
  palette: { t: "#ff9ec7", T: "#ff6fae", g: LEAF },
};

export const DAISY: Sprite = {
  rows: [
    "..w.w..",
    ".wwwww.",
    "wwwywww",
    ".wwwww.",
    "..w.w..",
    "...g...",
    "..gg...",
    "...g...",
  ],
  palette: { w: "#ffffff", y: "#ffd24a", g: LEAF_DARK },
};

export const BLOSSOM: Sprite = {
  rows: [".p.p.", "ppppp", ".pyp.", "ppppp", ".p.p."],
  palette: { p: "#ffb6d5", y: "#ffd24a" },
};

export const GARDEN: readonly Sprite[] = [ROSE, TULIP, DAISY, TULIP, ROSE, DAISY];
