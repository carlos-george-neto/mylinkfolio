import { useEffect, CSSProperties } from 'react';
import rawConfig from './config';
import { validateConfig } from './utils/config';
import ProfileCard from './components/ProfileCard';
import SocialIcons from './components/SocialIcons';
import LinkList from './components/LinkList';
import type { Theme } from './types';

const config = validateConfig(rawConfig);

const THEME_VAR_MAP: Record<keyof Theme, string> = {
  backgroundColor: '--color-canvas',
  primaryColor: '--color-primary',
  primaryHoverColor: '--color-primary-hover',
  onPrimaryColor: '--color-on-primary',
  surfaceColor: '--color-surface-1',
  inkColor: '--color-ink',
  inkMutedColor: '--color-ink-muted',
};

function buildThemeStyle(theme?: Theme): CSSProperties {
  if (!theme) return {};
  const style: Record<string, string> = {};
  for (const [key, cssVar] of Object.entries(THEME_VAR_MAP) as [keyof Theme, string][]) {
    const value = theme[key];
    if (value !== undefined) {
      style[cssVar] = value;
    }
  }
  return style as CSSProperties;
}

export default function App() {
  const { profile, links, socialLinks, theme, meta } = config;

  useEffect(() => {
    document.title = meta.title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setOg = (property: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', meta.description);
    setOg('og:title', meta.title);
    setOg('og:description', meta.description);
    setOg('og:url', meta.siteUrl);
    if (meta.ogImage) setOg('og:image', meta.ogImage);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', meta.siteUrl);

    const ldJson = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      url: meta.siteUrl,
      image: profile.avatarUrl,
    };
    let script = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(ldJson);
  }, [meta, profile]);

  return (
    <div
      style={buildThemeStyle(theme)}
      className="min-h-screen bg-canvas text-ink flex flex-col items-center px-4 py-10"
    >
      <div className="w-full max-w-sm flex flex-col gap-6">
        <ProfileCard profile={profile} />
        <SocialIcons socialLinks={socialLinks} />
        <LinkList links={links} />
      </div>
    </div>
  );
}
