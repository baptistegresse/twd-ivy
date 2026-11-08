# TWD · Baptiste & Ivy

A shared survival log for watching *The Walking Dead* apart: see where the other one is,
rate each episode out of 5 and leave a short note (30 characters max).

- **Netflix-style**: an “Up next” hero, episode stills, titles and synopses for all 177 episodes (snapshot from [TVmaze](https://www.tvmaze.com/api), refresh with `pnpm episodes:sync`).
- **Spoiler shield**: the other person's ratings stay hidden until you reach that episode.
- **Access**: one shared secret code (`APP_PASSCODE`), then pick who you are. Signed session (`SESSION_SECRET`) lasts a year.

## Stack

Next.js 16 (App Router, Server Actions) · Tailwind 4 · Neon Postgres (Vercel integration) · Zod · Vitest.

## Dev

```bash
vercel env pull .env.local   # DATABASE_URL, APP_PASSCODE, SESSION_SECRET
pnpm install
pnpm db:migrate              # creates the `entries` table if needed
pnpm dev
```

```bash
pnpm test        # unit tests
pnpm coverage    # coverage (80% threshold)
```

Deploys: every push to `main` goes to production on Vercel (team `agence-bcg`, project `twd-ivy`).
