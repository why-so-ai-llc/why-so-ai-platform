// @vitest-environment jsdom

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import OpsXRayPage from '../app/tools/ops-xray/page';

describe('Ops X-Ray page', () => {
  it('shows the audit inputs and a helpful empty state', () => {
    render(<OpsXRayPage />);

    expect(screen.getByRole('heading', { name: /AI Ops X-Ray/i })).toBeTruthy();
    expect(screen.getByLabelText('Business Website URL')).toBeTruthy();
    expect(screen.getByLabelText(/What's your biggest time-waster/i)).toBeTruthy();
    expect(screen.getByText('Your audit starts here')).toBeTruthy();
  });

  it('validates the SOP upload extension', () => {
    render(<OpsXRayPage />);
    const upload = screen.getByLabelText(/SOP \/ Employee Handbook/) as HTMLInputElement;

    fireEvent.change(upload, {
      target: { files: [new File(['not a handbook'], 'handbook.exe')] },
    });

    expect(screen.getByRole('alert').textContent).toContain('Choose a PDF, TXT, or DOCX file.');
  });
});
