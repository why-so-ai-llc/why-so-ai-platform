import { PageHero } from '@/components/page-hero';
import { JokeDemo } from '@/components/tool-demos';

export default function JokeGeneratorPage() {
  return (
    <div>
      <PageHero eyebrow="Tool" title="Joke generator" description="Public API demo with request timeout and explicit error feedback." actions={<a href="https://official-joke-api.appspot.com/" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 hover:border-red-400 hover:text-red-300">Official Joke API</a>} />
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"><JokeDemo /></div>
    </div>
  );
}
