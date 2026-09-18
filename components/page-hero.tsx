import { ReactNode } from 'react';

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="border-b border-slate-800 bg-slate-900/70">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-red-400">{eyebrow}</p> : null}
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-300">{description}</p>
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}
