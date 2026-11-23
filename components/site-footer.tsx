import Link from 'next/link';

import { BrandLogo } from '@/components/brand-logo';
import { navItems } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-lime-400/25 bg-black">
      <div className="circuit-divider" aria-hidden="true" />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-brand-muted sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-4">
          <BrandLogo size={56} showWordmark />
          <p className="max-w-xs">Smarter solutions. Real impact.</p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-4 gap-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-lime-400">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
