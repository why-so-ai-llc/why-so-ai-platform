import Link from 'next/link';

import { navItems } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-slate-400 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-slate-200">Why So AI</p>
          <p>Coherent demo pages for services, tools, and AI workflow discovery.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-red-300">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
