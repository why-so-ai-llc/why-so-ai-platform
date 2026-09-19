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
