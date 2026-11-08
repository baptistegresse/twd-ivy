export const NOTE_MAX_LENGTH = 30;

/** Counts user-perceived characters, so an emoji counts as one. */
export function noteLength(note: string): number {
  return [...new Intl.Segmenter("fr", { granularity: "grapheme" }).segment(note)].length;
}
