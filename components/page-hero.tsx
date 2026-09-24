import Image from 'next/image';
import { ReactNode } from 'react';

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-900/70">
      <Image
        src="/Screenshot_20260915-210613_Photos.png"
        alt="Modern workspace with creative lighting for AI planning sessions."
        fill
        className="pointer-events-none object-cover object-center opacity-20"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-slate-950/70" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-red-400">{eyebrow}</p> : null}
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">{description}</p>
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}
