# TWD · Baptiste & Ivy

Carnet de survie partagé pour suivre *The Walking Dead* chacun de son côté :
où en est l'autre, une note sur 5 et un petit mot (30 caractères max) par épisode.

- **Bouclier anti-spoiler** : les notes de l'autre restent cachées tant que tu n'as pas atteint l'épisode.
- **Accès** : un code secret commun (`APP_PASSCODE`), puis on choisit qui on est. Session signée (`SESSION_SECRET`) valable un an.

## Stack

Next.js 16 (App Router, Server Actions) · Tailwind 4 · Neon Postgres (intégration Vercel) · Zod · Vitest.

## Dev

```bash
vercel env pull .env.local   # DATABASE_URL, APP_PASSCODE, SESSION_SECRET
pnpm install
pnpm db:migrate              # crée la table `entries` si besoin
pnpm dev
```

```bash
pnpm test        # tests unitaires
pnpm coverage    # couverture (seuil 80 %)
```

Déploiement : chaque push sur `main` part en prod sur Vercel (équipe `agence-bcg`, projet `twd-ivy`).
