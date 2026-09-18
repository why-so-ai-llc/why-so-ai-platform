import { PageHero } from '@/components/page-hero';
import { PasswordGeneratorDemo } from '@/components/tool-demos';

export default function PasswordGeneratorPage() {
  return (
    <div>
      <PageHero
        eyebrow="Tool"
        title="Password generator"
        description="Generate and score passwords locally in the browser, with guarded localStorage access and a graceful clipboard fallback."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <PasswordGeneratorDemo />
      </div>
    </div>
  );
}
