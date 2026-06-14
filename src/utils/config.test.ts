import { describe, it, expect } from 'vitest';
import { validateConfig } from './config';
import type { SiteConfig } from '../types';

const baseConfig: SiteConfig = {
  profile: { name: 'Test User', handle: 'testuser', bio: 'Hello', avatarUrl: '/avatar.jpg' },
  links: [
    { id: '1', title: 'Valid Link', url: 'https://example.com', icon: 'globe' },
    { id: '2', title: 'Invalid Link', url: 'not-a-url', icon: 'link' },
  ],
  socialLinks: [
    { id: 's1', platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
  ],
  theme: {},
  meta: {
    title: 'Test Title',
    description: 'Test description',
    siteUrl: 'https://example.com',
    basePath: '/',
  },
};

describe('validateConfig', () => {
  it('removes a LinkItem with an invalid URL', () => {
    const result = validateConfig(baseConfig);
    expect(result.links.find((l) => l.url === 'not-a-url')).toBeUndefined();
  });

  it('keeps a LinkItem with a valid https URL', () => {
    const result = validateConfig(baseConfig);
    expect(result.links.find((l) => l.url === 'https://example.com')).toBeDefined();
  });

  it('preserves the original order of valid links', () => {
    const config: SiteConfig = {
      ...baseConfig,
      links: [
        { id: 'a', title: 'A', url: 'https://a.com', icon: 'link' },
        { id: 'bad', title: 'Bad', url: 'ftp://bad', icon: 'link' },
        { id: 'b', title: 'B', url: 'https://b.com', icon: 'link' },
      ],
    };
    const result = validateConfig(config);
    expect(result.links.map((l) => l.id)).toEqual(['a', 'b']);
  });

  it('throws with field name when profile.name is empty', () => {
    const config: SiteConfig = { ...baseConfig, profile: { ...baseConfig.profile, name: '' } };
    expect(() => validateConfig(config)).toThrow('config.profile.name is required');
  });

  it('treats absent socialLinks as empty array', () => {
    const config: SiteConfig = { ...baseConfig, socialLinks: undefined };
    const result = validateConfig(config);
    expect(result.socialLinks).toEqual([]);
  });
});
