import { describe, expect, it } from 'vitest';

import { PageHero } from '../components/page-hero';

describe('PageHero', () => {
  it('includes the shared public photo background with accessible text', () => {
    const hero = PageHero({ title: 'Title', description: 'Description' }) as {
      props: { children: Array<{ props: { src?: string; alt?: string } }> };
    };
    const [imageLayer] = hero.props.children;

    expect(imageLayer.props.src).toBe('/Screenshot_20260915-210613_Photos.png');
    expect(imageLayer.props.alt).toContain('workspace');
  });
});
