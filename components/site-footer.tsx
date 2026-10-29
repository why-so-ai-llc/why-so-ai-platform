import Link from 'next/link';

import { navItems } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-white/60 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-white">Why So AI</p>
          <p>Coherent demo pages for services, tools, and AI workflow discovery.</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-lime-400">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
