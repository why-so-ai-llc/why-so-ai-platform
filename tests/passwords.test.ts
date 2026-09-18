import { afterEach, describe, expect, it, vi } from 'vitest';

import { analyzePassword, createPassword } from '../lib/passwords';

describe('password utilities', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('flags weak passwords', () => {
    const analysis = analyzePassword('aaa');
    expect(analysis.strength).toBe('Weak');
    expect(analysis.feedback.length).toBeGreaterThan(0);
  });

  it('rewards longer mixed passwords', () => {
    const analysis = analyzePassword('Abcdef1234!@#$5678');
    expect(analysis.score).toBeGreaterThanOrEqual(80);
    expect(['Strong', 'Very Strong']).toContain(analysis.strength);
  });

  it('uses crypto.getRandomValues when available', () => {
    Object.defineProperty(globalThis, 'crypto', {
      value: {
        getRandomValues: (array: Uint32Array) => {
          array[0] = 1;
          return array;
        },
      },
      configurable: true,
    });

    const password = createPassword(4, {
      uppercase: true,
      lowercase: false,
      numbers: false,
      symbols: false,
    });

    expect(password).toBe('BBBB');
  });

  it('falls back to Math.random when crypto is unavailable', () => {
    Object.defineProperty(globalThis, 'crypto', {
      value: undefined,
      configurable: true,
    });
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const password = createPassword(4, {
      uppercase: false,
      lowercase: true,
      numbers: false,
      symbols: false,
    });

    expect(password).toBe('aaaa');
  });

  it('rejects empty option sets', () => {
    expect(() => createPassword(12, {
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: false,
    })).toThrow(/character type/i);
  });
});
