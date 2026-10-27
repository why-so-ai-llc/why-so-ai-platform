// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PageHero } from '../components/page-hero';

describe('PageHero', () => {
  it('renders a black section with lime accents and accessible text', () => {
    const { container } = render(<PageHero eyebrow="Eyebrow" title="Title" description="Description" />);
    const section = container.querySelector('section');

    expect(screen.getByRole('heading', { level: 1, name: 'Title' })).toBeTruthy();
    expect(screen.getByText('Description')).toBeTruthy();
    expect(screen.getByText('Eyebrow').className).toContain('text-lime-400');
    expect(section?.className).toContain('bg-black');
    expect(section?.className).toContain('overflow-hidden');
    expect(container.querySelector('img')).toBeNull();
  });
});
