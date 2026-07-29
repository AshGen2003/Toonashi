# Toonashi

An anime discovery and tracking platform.

## Structure

- `frontend/` — Next.js 15 + React 19 app. Anime data via the Jikan API (MyAnimeList), auth via Clerk, own DB via Drizzle ORM.
- `backend/` — Laravel API. Currently handles Clerk user sync/webhooks; most other functionality lives in `frontend/`.

## Getting started

### Frontend
```bash
cd frontend
bun install
cp .env.example .env.local   # fill in Clerk keys + DB credentials
bun dev
```

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```
