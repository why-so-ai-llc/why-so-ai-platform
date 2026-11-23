'use client';

import Link from 'next/link';
import { useState } from 'react';

import { BrandLogo } from '@/components/brand-logo';
import { DemoDisclosure } from '@/components/tool-demos';
import { featuredToolSlugs, getToolBySlug, services, Service } from '@/lib/site';

export default function HomePage() {
  const [luckyService, setLuckyService] = useState<Service | null>(null);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-lime-400/15 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <BrandLogo size={160} priority className="mx-auto drop-shadow-[0_0_28px_rgba(57,255,20,0.35)]" />
          <p className="mt-4 inline-flex rounded-full border border-lime-400/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">Smarter solutions. Real impact.</p>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-brand-text sm:text-5xl lg:text-6xl">
            AI services and honest browser demos for <span className="glow-text text-lime-400">modern teams</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base text-brand-muted sm:text-xl">
            Explore service offerings, estimate project scope, and try lightweight productivity tools without pretending this repository already has a backend.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/services" className="btn-primary">Explore services</Link>
            <button
              onClick={() => setLuckyService(services[Math.floor(Math.random() * services.length)])}
              className="btn-secondary"
            >
              I&apos;m Feeling Lucky
            </button>
          </div>
          {luckyService ? (
            <div className="mx-auto mt-10 max-w-xl card border-lime-400/40 p-6 text-left shadow-neon">
              <p className="text-sm uppercase tracking-[0.2em] text-lime-400">Suggested service</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{luckyService.icon} {luckyService.name}</h2>
              <p className="mt-3 text-brand-muted">{luckyService.description}</p>
              <Link href={`/services/${luckyService.slug}`} className="btn-primary mt-5 !px-4 !py-2">
                Learn more
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-400">Features</p>
        <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">What we build</h2>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 pb-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        {services.map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}`} className="card p-6">
            <p className="text-4xl">{service.icon}</p>
            <h2 className="mt-4 text-xl font-semibold text-white">{service.name}</h2>
            <p className="mt-3 text-brand-muted">{service.description}</p>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-400">Featured tools</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Browser demos you can try now</h2>
          </div>
          <Link href="/tools" className="text-sm font-semibold text-lime-400 hover:text-lime-300">See all tools →</Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {featuredToolSlugs.map((slug) => {
            const tool = getToolBySlug(slug);
            if (!tool) return null;

            return (
              <Link key={tool.slug} href={`/${tool.slug}`} className="card p-6">
                <p className="text-4xl">{tool.icon}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{tool.name}</h3>
                <p className="mt-3 text-brand-muted">{tool.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <DemoDisclosure />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-lime-400/40 bg-gradient-to-br from-lime-400/15 via-brand-surface to-brand-bg shadow-neon p-8 text-center sm:p-14">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to put AI to work?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-brand-muted">Tell us about your workflow and we will map out where automation can save the most time.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">Contact us</Link>
            <Link href="/pricing" className="btn-secondary">View pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
