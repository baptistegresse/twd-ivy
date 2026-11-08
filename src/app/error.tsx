"use client";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-display text-2xl">La radio grésille…</p>
      <p className="text-muted">Impossible de charger le carnet pour l&apos;instant.</p>
      <button
        onClick={reset}
        className="rounded-md bg-blood px-4 py-2 text-sm font-medium hover:bg-blood-soft"
      >
        Réessayer
      </button>
    </main>
  );
}
