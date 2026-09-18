import { PageHero } from '@/components/page-hero';
import { PomodoroDemo } from '@/components/tool-demos';

export default function PomodoroPage() {
  return (
    <div>
      <PageHero eyebrow="Tool" title="Pomodoro timer" description="A straightforward browser timer for short focus sessions." />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"><PomodoroDemo /></div>
    </div>
  );
}
