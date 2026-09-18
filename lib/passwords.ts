export type PasswordStrength = 'Weak' | 'Fair' | 'Good' | 'Strong' | 'Very Strong';

export type PasswordAnalysis = {
  strength: PasswordStrength;
  score: number;
  feedback: string[];
};

export type PasswordOptions = {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

const characterSets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
} satisfies Record<keyof PasswordOptions, string>;

function randomIndex(max: number) {
  if (typeof globalThis.crypto !== 'undefined' && typeof globalThis.crypto.getRandomValues === 'function') {
    const array = new Uint32Array(1);
    globalThis.crypto.getRandomValues(array);
    return array[0] % max;
  }

  return Math.floor(Math.random() * max);
}

export function createPassword(length: number, options: PasswordOptions) {
  const chars = Object.entries(options)
    .filter(([, enabled]) => enabled)
    .map(([key]) => characterSets[key as keyof PasswordOptions])
    .join('');

  if (!chars) {
    throw new Error('Please select at least one character type.');
  }

  return Array.from({ length }, () => chars.charAt(randomIndex(chars.length))).join('');
}

export function analyzePassword(password: string): PasswordAnalysis {
  let score = 0;
  const feedback: string[] = [];

  if (password.length >= 8) score += 20;
  else feedback.push('Use at least 8 characters.');

  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;
  if (/[a-z]/.test(password)) score += 15;
  else feedback.push('Add lowercase letters.');
  if (/[A-Z]/.test(password)) score += 15;
  else feedback.push('Add uppercase letters.');
  if (/[0-9]/.test(password)) score += 15;
  else feedback.push('Add numbers.');
  if (/[^A-Za-z0-9]/.test(password)) score += 25;
  else feedback.push('Add symbols.');
  if (!/(.)\1{2,}/.test(password)) score += 10;
  else feedback.push('Avoid repeating the same character many times.');

  if (score >= 80) return { strength: 'Very Strong', score, feedback: feedback.length ? feedback : ['Excellent password.'] };
  if (score >= 60) return { strength: 'Strong', score, feedback: feedback.length ? feedback : ['Good password.'] };
  if (score >= 40) return { strength: 'Good', score, feedback };
  if (score >= 20) return { strength: 'Fair', score, feedback };
  return { strength: 'Weak', score, feedback };
}

export function getStrengthColor(strength: PasswordStrength) {
  switch (strength) {
    case 'Very Strong':
      return 'bg-emerald-500';
    case 'Strong':
      return 'bg-sky-500';
    case 'Good':
      return 'bg-amber-500';
    case 'Fair':
      return 'bg-orange-500';
    default:
      return 'bg-red-500';
  }
}
