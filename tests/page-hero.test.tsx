/* eslint-disable @next/next/no-img-element */
// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
    <img src={src} alt={alt} className={className} />
  ),
}));

import { PageHero } from '../components/page-hero';

describe('PageHero', () => {
  it('includes the shared public photo background with accessible text', () => {
    const { container } = render(<PageHero title="Title" description="Description" />);
    const image = screen.getByAltText('Modern workspace with creative lighting for AI planning sessions.');
    const overlay = container.querySelector('.absolute.inset-0');
    const section = container.querySelector('section');

    expect(image.getAttribute('src')).toBe('/Screenshot_20260915-210613_Photos.png');
    expect(overlay?.className).toContain('bg-slate-950/70');
    expect(section?.className).toContain('relative');
    expect(section?.className).toContain('overflow-hidden');
  });
});
