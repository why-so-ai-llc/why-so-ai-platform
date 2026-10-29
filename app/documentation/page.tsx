import Link from 'next/link';

import { PageHero } from '@/components/page-hero';
import { getAllKnownRoutes } from '@/lib/site';

export default function DocumentationPage() {
  const routes = getAllKnownRoutes();

  return (
    <div>
      <PageHero
        eyebrow="Documentation"
        title="Current routes and local commands"
        description="This page mirrors the repository's real, buildable frontend routes instead of overstating unsupported capabilities."
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <section className="rounded-2xl border border-white/15 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Routes</h2>
          <div className="mt-4 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
            {routes.map((route) => (
              <Link key={route} href={route} className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 hover:border-lime-400 hover:text-lime-300">
                {route}
              </Link>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-white/15 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Commands</h2>
          <div className="mt-4 space-y-3 text-sm text-white/80">
            <p><code className="rounded bg-black px-2 py-1 text-lime-300">npm install</code> installs the Next.js, TypeScript, Tailwind, lint, and test dependencies.</p>
            <p><code className="rounded bg-black px-2 py-1 text-lime-300">npm run dev</code> starts the app locally.</p>
            <p><code className="rounded bg-black px-2 py-1 text-lime-300">npm run lint</code>, <code className="rounded bg-black px-2 py-1 text-lime-300">npm run test</code>, and <code className="rounded bg-black px-2 py-1 text-lime-300">npm run build</code> validate the current frontend.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
