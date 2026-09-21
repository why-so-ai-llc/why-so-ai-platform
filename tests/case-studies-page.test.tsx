// @vitest-environment jsdom

import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import CaseStudiesPage from '../app/case-studies/page';
import { services } from '../lib/site';

describe('CaseStudiesPage', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders shared service titles and outcomes', () => {
    render(<CaseStudiesPage />);

    services.forEach((service) => {
      const heading = screen.getByRole('heading', { level: 2, name: service.name });
      const article = heading.closest('article');

      expect(article).not.toBeNull();
      const outcomes = within(article as HTMLElement)
        .getAllByRole('listitem')
        .map((item) => item.textContent?.replace('•', '').trim());

      service.outcomes.forEach((outcome) => {
        expect(outcomes).toContain(outcome);
      });
    });
  });
});
