'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { DemoDisclosure } from '@/components/tool-demos';
import { featuredToolSlugs, getToolBySlug, navItems, services, Service } from '@/lib/site';

export default function HomePage() {
  const [luckyService, setLuckyService] = useState<Service | null>(null);

  return (
    <div>
      <section className="border-b border-slate-800 bg-slate-950/50">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-red-600 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-400">Why So AI</p>
        <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-7xl">
          Dark-mode AI services and honest browser demos for modern teams.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300 sm:text-xl">
          Explore service offerings, estimate project scope, and try lightweight productivity tools without pretending this repository already has a backend.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/services" className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-500">Explore services</Link>
          <button
            onClick={() => setLuckyService(services[Math.floor(Math.random() * services.length)])}
            className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-200 hover:border-red-400 hover:text-red-300"
          >
            I&apos;m Feeling Lucky
          </button>
        </div>
        {luckyService ? (
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-red-500/30 bg-slate-900/80 p-6 text-left shadow-2xl shadow-red-500/10">
            <p className="text-sm uppercase tracking-[0.2em] text-red-400">Suggested service</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{luckyService.icon} {luckyService.name}</h2>
            <p className="mt-3 text-slate-300">{luckyService.description}</p>
            <Link href={`/services/${luckyService.slug}`} className="mt-5 inline-flex rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500">
              Learn more
            </Link>
          </div>
        ) : null}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative min-h-64 overflow-hidden rounded-2xl border border-slate-800">
            <Image
              src="/Screenshot_20260916-005656_Photos.png"
              alt="Team collaboration board with sticky notes and planning artifacts."
              fill
              className="object-cover object-center"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="relative min-h-64 overflow-hidden rounded-2xl border border-slate-800">
            <Image
              src="/Screenshot_20260915-210613_Photos.png"
              alt="Focused work setup used to design AI workflows and demos."
              fill
              className="object-cover object-center"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        {services.map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/10">
            <p className="text-4xl">{service.icon}</p>
            <h2 className="mt-4 text-xl font-semibold text-white">{service.name}</h2>
            <p className="mt-3 text-slate-400">{service.description}</p>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Featured tools</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Browser demos you can try now</h2>
          </div>
          <Link href="/tools" className="text-sm font-semibold text-red-300 hover:text-red-200">See all tools →</Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {featuredToolSlugs.map((slug) => {
            const tool = getToolBySlug(slug);
            if (!tool) return null;

            return (
              <Link key={tool.slug} href={`/${tool.slug}`} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 hover:border-red-500/40">
                <p className="text-4xl">{tool.icon}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{tool.name}</h3>
                <p className="mt-3 text-slate-400">{tool.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <DemoDisclosure />
      </section>
    </div>
  );
}
