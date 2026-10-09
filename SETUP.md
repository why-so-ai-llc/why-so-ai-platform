# Why So AI Platform Setup

## Requirements

- Node.js 20+
- npm 10+

## Local development

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`.

## Validation commands

Run these before shipping changes:

```bash
npm run lint
npm run test
npm run build
```

## Route overview

### Navigation routes

- `/services`
- `/pricing`
- `/case-studies`
- `/blog`
- `/tools`
- `/contact`

### Service routes

- `/services/ai-strategy-consulting`
- `/services/predictive-analytics`
- `/services/generative-ai-training`
- `/services/ai-workflow-automation`
- `/services/custom-ai-integration`

### Tool routes

- `/todo`
- `/notes`
- `/bookmarks`
- `/pomodoro`
- `/expense-tracker`
- `/weather`
- `/calculator`
- `/password-generator`
- `/joke-generator`

## Notes about the current implementation

- Tools that persist data do so in browser `localStorage` only.
- Weather and joke pages call public demo APIs and surface failures when the network or remote service is unavailable.
- The contact form prepares a local summary and a `mailto:` draft; it does not send data to a backend from this repository.

## Payments

Set these environment variables (e.g. in `.env.local` / Vercel):

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET` (for `/api/webhooks/stripe`)
- `NEXT_PUBLIC_VENMO_USERNAME=whysoai`

Plan prices are configured in `lib/subscription-plans.ts`.
