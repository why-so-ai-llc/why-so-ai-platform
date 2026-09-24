import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { PageHero } from '../components/page-hero';

describe('PageHero', () => {
  it('includes the shared public photo background with accessible text', () => {
    const html = renderToStaticMarkup(<PageHero title="Title" description="Description" />);
    expect(html).toContain('Screenshot_20260915-210613_Photos.png');
    expect(html).toContain('workspace');
  });
});
