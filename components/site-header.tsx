'use client';

import Link from 'next/link';
import { useState } from 'react';

import { navItems } from '@/lib/site';

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-400 text-lg font-bold text-black">
            W
          </span>
          <span className="font-accent text-lg font-semibold text-white">Why So AI</span>
        </Link>

        <nav aria-label="Primary site navigation" className="hidden items-center gap-1 text-sm font-medium text-white/80 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-lime-400">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-black hover:bg-lime-300 lg:inline-flex"
        >
          Get started
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white hover:border-lime-400 hover:text-lime-400 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true" className="text-xl leading-none">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Mobile site navigation" className="border-t border-white/10 bg-black px-4 pb-4 lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col py-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-white/90 hover:bg-white/10 hover:text-lime-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-lime-400 px-4 py-3 text-center font-semibold text-black hover:bg-lime-300"
              >
                Get started
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
