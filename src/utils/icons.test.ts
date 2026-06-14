import { describe, it, expect } from 'vitest';
import { resolveIcon, ICON_MAP } from './icons';
import { Github, Link } from 'lucide-react';

describe('resolveIcon', () => {
  it('returns the Github component for "github"', () => {
    expect(resolveIcon('github')).toBe(Github);
  });

  it('returns the Link fallback for an unknown icon name', () => {
    expect(resolveIcon('unknown-icon')).toBe(Link);
  });

  it('returns the Link fallback for an empty string', () => {
    expect(resolveIcon('')).toBe(Link);
  });
});

describe('ICON_MAP', () => {
  it('contains all 16 registered icons', () => {
    expect(Object.keys(ICON_MAP)).toHaveLength(18);
  });
});
