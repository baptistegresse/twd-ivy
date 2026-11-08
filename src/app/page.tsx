import { Suspense } from "react";
import { Journal } from "@/components/Journal";

function JournalFallback() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <p className="animate-pulse font-display text-xl text-muted">Searching the log…</p>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<JournalFallback />}>
      <Journal />
    </Suspense>
  );
}
