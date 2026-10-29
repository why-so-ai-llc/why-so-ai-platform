'use client';

import Link from 'next/link';
import { useState } from 'react';

import { DemoDisclosure } from '@/components/tool-demos';
import { featuredToolSlugs, getToolBySlug, services, Service } from '@/lib/site';

export default function HomePage() {
  const [luckyService, setLuckyService] = useState<Service | null>(null);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-lime-400/15 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <p className="inline-flex rounded-full border border-lime-400/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-lime-400">Why So AI</p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            AI services and honest browser demos for <span className="text-lime-400">modern teams</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base text-white/75 sm:text-xl">
            Explore service offerings, estimate project scope, and try lightweight productivity tools without pretending this repository already has a backend.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/services" className="rounded-lg bg-lime-400 px-6 py-3 font-semibold text-black hover:bg-lime-300">Explore services</Link>
            <button
              onClick={() => setLuckyService(services[Math.floor(Math.random() * services.length)])}
              className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white hover:border-lime-400 hover:text-lime-400"
            >
              I&apos;m Feeling Lucky
            </button>
          </div>
          {luckyService ? (
            <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-lime-400/40 bg-white/5 p-6 text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-lime-400">Suggested service</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{luckyService.icon} {luckyService.name}</h2>
              <p className="mt-3 text-white/75">{luckyService.description}</p>
              <Link href={`/services/${luckyService.slug}`} className="mt-5 inline-flex rounded-lg bg-lime-400 px-4 py-2 font-semibold text-black hover:bg-lime-300">
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
          <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-lime-400/60">
            <p className="text-4xl">{service.icon}</p>
            <h2 className="mt-4 text-xl font-semibold text-white">{service.name}</h2>
            <p className="mt-3 text-white/60">{service.description}</p>
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
              <Link key={tool.slug} href={`/${tool.slug}`} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-lime-400/60">
                <p className="text-4xl">{tool.icon}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{tool.name}</h3>
                <p className="mt-3 text-white/60">{tool.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <DemoDisclosure />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-lime-400/40 bg-gradient-to-br from-lime-400/15 via-black to-black p-8 text-center sm:p-14">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to put AI to work?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">Tell us about your workflow and we will map out where automation can save the most time.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="rounded-lg bg-lime-400 px-6 py-3 font-semibold text-black hover:bg-lime-300">Contact us</Link>
            <Link href="/pricing" className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white hover:border-lime-400 hover:text-lime-400">View pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
