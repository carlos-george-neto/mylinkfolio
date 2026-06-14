import type { SiteConfig, LinkItem, SocialLink } from '../types';

export function validateConfig(raw: SiteConfig): SiteConfig {
  if (!raw.profile.name) throw new Error('config.profile.name is required');
  if (!raw.profile.handle) throw new Error('config.profile.handle is required');
  if (!raw.meta.title) throw new Error('config.meta.title is required');
  if (!raw.meta.description) throw new Error('config.meta.description is required');
  if (!raw.meta.siteUrl) throw new Error('config.meta.siteUrl is required');

  const isAbsoluteUrl = (url: string) =>
    url.startsWith('http://') || url.startsWith('https://');

  const links: LinkItem[] = (raw.links ?? []).filter((l) => isAbsoluteUrl(l.url));
  const socialLinks: SocialLink[] = (raw.socialLinks ?? []).filter((l) =>
    isAbsoluteUrl(l.url)
  );

  return { ...raw, links, socialLinks };
}
