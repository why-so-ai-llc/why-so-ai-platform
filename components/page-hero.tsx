import { ReactNode } from 'react';

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/15 bg-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-lime-400/15 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">{eyebrow}</p> : null}
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-white/80">{description}</p>
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}
