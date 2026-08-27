import { describe, it, expect } from 'vitest';
import { passwordsMatch, isValidEmail, isStrongEnough } from './validators';

describe('passwordsMatch', () => {
  it('returns true when passwords match', () => {
    expect(passwordsMatch('abc123', 'abc123')).toBe(true);
  });

  it('returns false when passwords differ', () => {
    expect(passwordsMatch('abc123', 'xyz789')).toBe(false);
  });
});

describe('isValidEmail', () => {
  it('accepts a valid email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('rejects an invalid email', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
  });
});

describe('isStrongEnough', () => {
  it('accepts passwords at or above the minimum length', () => {
    expect(isStrongEnough('abcdef')).toBe(true);
  });

  it('rejects passwords below the minimum length', () => {
    expect(isStrongEnough('abc')).toBe(false);
  });
});
