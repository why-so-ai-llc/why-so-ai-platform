# Why So AI Platform

Why So AI is a Next.js frontend for an AI services website with browser-based demo tools. This repository now builds and routes cleanly, but it is intentionally honest about what is **demo-only** versus what would require a backend or operational integration.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Vitest for lightweight smoke tests

## Commands

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm run start
```

## Brand and design system

The site uses the WHYSO AI LLC neon lime-on-black identity. Tokens live in `app/globals.css` (CSS variables) and `tailwind.config.ts` (`brand-*` colors, `font-tech`, `shadow-neon`; the Tailwind `lime` scale is remapped to the brand palette):

| Token | Value |
| --- | --- |
| Primary accent | `#A3FF12` |
| Secondary glow | `#39FF14` |
| Background | `#050505` |
| Surface | `#0B0D09` |
| Text / muted | `#F4F6F4` / `#A5ADA1` |

Shared classes: `.btn-primary`, `.btn-secondary`, `.card`, `.circuit-divider`, `.glow-text`; form controls and `:focus-visible` are styled globally and animations respect `prefers-reduced-motion`. Headings use Orbitron, body text uses Inter.

### Brand assets

Add these files to `public/` (the components fall back to a text wordmark / monogram until they exist):

- `public/brand/whyso-logo.png` — the square WHYSO AI LLC logo (used in the header, homepage, and footer)
- `public/team/brandon-thompson.jpg` — founder photo for `/team`

## Current routes

### Core pages

- `/`
- `/services`
- `/pricing`
- `/case-studies`
- `/blog`
- `/blog/future-of-business-automation`
- `/blog/custom-ai-integration-best-practices`
- `/blog/measuring-ai-roi`
- `/features`
- `/contact`
- `/dashboard`
- `/documentation`
- `/tools`
- `/team` (Meet the Team: founder photo that opens a résumé dialog)

### Service detail pages

- `/services/ai-strategy-consulting`
- `/services/predictive-analytics`
- `/services/generative-ai-training`
- `/services/ai-workflow-automation`
- `/services/custom-ai-integration`

### Tool pages

- `/todo`
- `/notes`
- `/bookmarks`
- `/pomodoro`
- `/expense-tracker`
- `/weather`
- `/calculator`
- `/password-generator`
- `/joke-generator`

## Demo boundaries

The repository currently includes:

- Consistent shared navigation and page layout
- Browser-local tools using guarded `localStorage` access where noted
- Public API demos for weather and jokes with explicit error handling
- A contact form that prepares a local summary instead of pretending to submit to a backend

The repository does **not** currently include:

- Authentication
- Payment processing
- CRM/email delivery backend
- Customer data APIs
- Production deployment configuration beyond local validation scripts and GitHub Actions checks

## Validation

The included GitHub Actions workflow and local scripts run:

- `npm run lint`
- `npm run test`
- `npm run build`

If you need deployment or backend integration, treat this repository as a polished frontend starting point rather than a fully integrated production system.
