// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { BrandLogo } from '../components/brand-logo';
import { TeamProfile } from '../components/team-profile';

afterEach(cleanup);

describe('TeamProfile', () => {
  it('opens the résumé dialog from the photo and closes with Escape', () => {
    render(<TeamProfile />);
    expect(screen.queryByRole('dialog')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /view résumé/i }));
    const dialog = screen.getByRole('dialog');
    expect(dialog.textContent).toContain('Brandon Thompson');
    expect(dialog.textContent).toContain('Why So AI LLC');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});

describe('BrandLogo', () => {
  it('renders the logo with equal width and height', () => {
    const { container } = render(<BrandLogo size={64} />);
    const img = container.querySelector('img');
    expect(img?.getAttribute('width')).toBe('64');
    expect(img?.getAttribute('height')).toBe('64');
  });
});
