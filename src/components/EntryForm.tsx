"use client";

import { useActionState, useState, useTransition } from "react";
import { removeEntry, saveEntry, type ActionState } from "@/app/actions";
import { NOTE_MAX_LENGTH, noteLength } from "@/lib/note";
import type { EpisodeView } from "@/lib/view";
import { PixelSprite } from "./pixel/PixelSprite";
import { HEART } from "./pixel/sprites";

const RATINGS = [1, 2, 3, 4, 5] as const;
const INITIAL_STATE: ActionState = { error: null };

interface EntryFormProps {
  episode: EpisodeView;
  onDone: () => void;
}

export function EntryForm({ episode, onDone }: EntryFormProps) {
  const [rating, setRating] = useState(episode.mine?.rating ?? 0);
  const [note, setNote] = useState(episode.mine?.note ?? "");
  const [removeError, setRemoveError] = useState<string | null>(null);
  const [isRemoving, startRemoving] = useTransition();

  const [state, formAction, isSaving] = useActionState(
    async (prev: ActionState, form: FormData) => {
      const result = await saveEntry(prev, form);
      if (result.ok) onDone();
      return result;
    },
    INITIAL_STATE,
  );

  const length = noteLength(note);
  const isTooLong = length > NOTE_MAX_LENGTH;
  const error = state.error ?? removeError;

  const handleRemove = () =>
    startRemoving(async () => {
      const result = await removeEntry(episode.season, episode.episode);
      if (result.ok) onDone();
      else setRemoveError(result.error);
    });

  return (
    <form action={formAction} className="mt-3 space-y-3 rounded-lg bg-surface-2 p-3">
      <input type="hidden" name="season" value={episode.season} />
      <input type="hidden" name="episode" value={episode.episode} />

      <fieldset className="flex items-center gap-1">
        <legend className="sr-only">Rating out of 5</legend>
        {RATINGS.map((value) => (
          <label key={value} className="cursor-pointer text-2xl leading-none">
            <input
              type="radio"
              name="rating"
              value={value}
              checked={rating === value}
              onChange={() => setRating(value)}
              className="peer sr-only"
              required
            />
            <span
              className={`rounded peer-focus-visible:ring-2 peer-focus-visible:ring-gold ${value <= rating ? "text-gold" : "text-border hover:text-gold/60"}`}
              aria-hidden
            >
              <span className="classic-only">★</span>
              <PixelSprite sprite={HEART} scale={4} className="ivy-only" />
            </span>
            <span className="sr-only">{value} out of 5</span>
          </label>
        ))}
      </fieldset>

      <label className="block">
        <span className="sr-only">Short note</span>
        <div className="flex items-center gap-2">
          <input
            name="note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="A short note (optional)"
            autoComplete="off"
            className={`flex-1 rounded-md border bg-background px-3 py-2 outline-none ${isTooLong ? "border-blood-soft" : "border-border focus:border-gold"}`}
          />
          <span className={`w-12 text-right text-xs ${isTooLong ? "text-blood-soft" : "text-muted"}`}>
            {length}/{NOTE_MAX_LENGTH}
          </span>
        </div>
      </label>

      {error && (
        <p role="alert" className="text-xs text-blood-soft">
          {error}
        </p>
      )}

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={isSaving || isTooLong || rating === 0}
          className="rounded-md bg-blood px-3 py-1.5 font-medium hover:bg-blood-soft disabled:opacity-50"
        >
          {isSaving ? "…" : "Save"}
        </button>
        <button type="button" onClick={onDone} className="px-2 py-1.5 text-muted hover:text-foreground">
          Cancel
        </button>
        {episode.mine && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={isRemoving}
            className="ml-auto px-2 py-1.5 text-xs text-muted hover:text-blood-soft"
          >
            {isRemoving ? "…" : "Not watched after all"}
          </button>
        )}
      </div>
    </form>
  );
}
