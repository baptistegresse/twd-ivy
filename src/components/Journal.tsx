import { getCurrentUser } from "@/lib/auth";
import { TVMAZE_CREDIT_URL } from "@/lib/catalog";
import { listEntries } from "@/lib/db";
import { themeCopy, themeFor, type Theme } from "@/lib/theme";
import { buildDashboard } from "@/lib/view";
import { USER_NAMES } from "@/lib/types";
import { LoginForm } from "./LoginForm";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { ProgressDuo, progressHeadline } from "./ProgressDuo";
import { ActivityRow } from "./ActivityRow";
import { SeasonBrowser } from "./SeasonBrowser";
import { Garden } from "./pixel/Garden";

function Footer({ theme }: { theme: Theme }) {
  const love = themeCopy(theme).footer;
  return (
    <footer className="space-y-3 pt-4 text-center text-xs text-muted/80">
      {love && <p className="font-title text-sm text-blood">{love}</p>}
      <p>
        Episode info &amp; images from{" "}
        <a href={TVMAZE_CREDIT_URL} className="underline underline-offset-2 hover:text-foreground">
          TVmaze
        </a>{" "}
        (CC BY-SA).
      </p>
    </footer>
  );
}

export async function Journal() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <LoginForm />
      </main>
    );
  }

  const theme = themeFor(user);
  const view = buildDashboard(await listEntries(), user);
  const names = { me: USER_NAMES[view.me.user], other: USER_NAMES[view.other.user] };

  return (
    <div data-theme={theme} className="flex flex-1 flex-col bg-background font-sans text-foreground">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-6 sm:py-10">
        <Header name={names.me} theme={theme} />
        <Hero
          upNext={view.upNext}
          headline={progressHeadline(view, names)}
          otherName={names.other}
          theme={theme}
        />
        <ProgressDuo view={view} names={names} />
        <ActivityRow items={view.activity} me={view.me.user} theme={theme} />
        <SeasonBrowser
          seasons={view.seasons}
          openSeason={view.openSeason}
          upNext={view.upNext}
          names={names}
          theme={theme}
        />
        <Footer theme={theme} />
      </main>
      {theme === "ivy" && <Garden className="px-2" />}
    </div>
  );
}
