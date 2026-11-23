import type { Metadata } from 'next';

import { PageHero } from '@/components/page-hero';
import { TeamProfile } from '@/components/team-profile';

export const metadata: Metadata = {
  title: 'Meet the Team | WHYSO AI LLC',
  description: 'Meet Brandon Thompson, founder of WHYSO AI LLC.',
};

export default function TeamPage() {
  return (
    <div>
      <PageHero eyebrow="Meet the Team" title="The founder behind WHYSO AI" description="Select the photo to view the full résumé." />
      <TeamProfile />
    </div>
  );
}
