import Link from 'next/link';

import { navItems } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-lg font-bold text-white shadow-lg shadow-red-500/20">
            W
          </span>
          <span>
            <span className="block text-lg font-semibold text-white font-accent">Why So AI</span>
            <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">Automation & AI systems</span>
          </span>
        </Link>
        <nav aria-label="Primary site navigation" className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-300">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 hover:bg-slate-800 hover:text-red-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
