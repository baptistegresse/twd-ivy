"use client";

import { useActionState } from "react";
import { login, type ActionState } from "@/app/actions";
import { USERS, USER_NAMES } from "@/lib/types";

const INITIAL_STATE: ActionState = { error: null };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, INITIAL_STATE);

  return (
    <form
      action={formAction}
      className="w-full max-w-sm space-y-6 rounded-xl border border-border bg-surface p-6 shadow-2xl"
    >
      <div className="space-y-1 text-center">
        <h1 className="font-display text-3xl">Survival Log</h1>
        <p className="text-sm text-muted">The Walking Dead · Baptiste & Ivy</p>
      </div>

      <fieldset className="space-y-2">
        <legend className="mb-2 text-sm text-muted">Who are you?</legend>
        <div className="grid grid-cols-2 gap-3">
          {USERS.map((user, index) => (
            <label key={user} className="cursor-pointer">
              <input
                type="radio"
                name="user"
                value={user}
                defaultChecked={index === 0}
                className="peer sr-only"
              />
              <span className="block rounded-lg border border-border bg-surface-2 py-3 text-center font-medium transition peer-checked:border-blood peer-checked:bg-blood/20 peer-focus-visible:ring-2 peer-focus-visible:ring-blood-soft">
                {USER_NAMES[user]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block space-y-2">
        <span className="text-sm text-muted">Secret code</span>
        <input
          type="password"
          name="passcode"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 outline-none focus:border-blood-soft"
        />
      </label>

      {state.error && (
        <p role="alert" className="text-sm text-blood-soft">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-blood py-2.5 font-medium transition hover:bg-blood-soft disabled:opacity-60"
      >
        {isPending ? "Opening the gate…" : "Enter"}
      </button>
    </form>
  );
}
