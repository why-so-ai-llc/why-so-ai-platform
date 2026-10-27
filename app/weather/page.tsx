import { PageHero } from '@/components/page-hero';
import { WeatherDemo } from '@/components/tool-demos';

export default function WeatherPage() {
  return (
    <div>
      <PageHero eyebrow="Tool" title="Weather snapshot" description="Public API demo with visible network dependency and graceful failure handling." actions={<a href="https://open-meteo.com/" target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 px-5 py-3 font-semibold text-white hover:border-lime-400 hover:text-lime-300">Open-Meteo</a>} />
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"><WeatherDemo /></div>
    </div>
  );
}
