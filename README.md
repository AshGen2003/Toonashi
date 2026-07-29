# Toonashi

An anime discovery and tracking platform.

Next.js 15 + React 19. Anime data via the Jikan API (MyAnimeList), auth via
Clerk, own MySQL DB accessed directly (`src/lib/db.ts`). User records are
kept in sync via a Clerk webhook (`src/app/api/webhooks/clerk/route.ts`) —
no separate backend service.

## Getting started

```bash
cd frontend
bun install
cp .env.example .env.local   # fill in Clerk keys, DB credentials, CLERK_WEBHOOK_SECRET
mysql < src/lib/schema.sql   # create the users table
bun dev
```

In the Clerk dashboard, add a webhook endpoint pointing at `/api/webhooks/clerk`
(for local dev, tunnel with ngrok or similar so Clerk can reach it) and copy
its signing secret into `CLERK_WEBHOOK_SECRET`.
