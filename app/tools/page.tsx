import Link from 'next/link';

import { PageHero } from '@/components/page-hero';
import { DemoDisclosure } from '@/components/tool-demos';
import { tools } from '@/lib/site';

export default function ToolsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Tools"
        title="Browser-based utilities and API demos"
        description="Every tool linked here resolves, and each page explains whether it stores data locally or depends on a public demo API."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/${tool.slug}`} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 hover:border-red-500/40">
              <p className="text-4xl">{tool.icon}</p>
              <h2 className="mt-4 text-xl font-semibold text-white">{tool.name}</h2>
              <p className="mt-3 text-slate-400">{tool.description}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-red-300">{tool.category}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <DemoDisclosure />
        </div>
      </div>
    </div>
  );
}
