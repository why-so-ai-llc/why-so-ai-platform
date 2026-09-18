// @vitest-environment jsdom

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TodoDemo } from '../components/tool-demos';

describe('TodoDemo', () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(globalThis, 'crypto', {
      value: { randomUUID: () => 'todo-id-1' },
      configurable: true,
    });
    window.requestAnimationFrame = (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    };
    window.cancelAnimationFrame = vi.fn();
  });

  it('adds a todo item using crypto.randomUUID without submitting unexpectedly', async () => {
    render(<TodoDemo />);

    fireEvent.change(screen.getByPlaceholderText('Add a task'), { target: { value: 'Ship the route audit' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));

    expect(screen.getByText('Ship the route audit')).toBeTruthy();

    await waitFor(() => {
      expect(window.localStorage.getItem('todo-items')).toContain('todo-id-1');
    });
  });
});
