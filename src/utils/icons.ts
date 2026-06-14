import {
  Github,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Globe,
  Mail,
  MessageCircle,
  ShoppingCart,
  BookOpen,
  Rss,
  Music,
  Video,
  Code,
  Link,
  ExternalLink,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { LucideIconName } from '../types';
import { TikTokIcon } from './TikTokIcon';
import { SpotifyIcon } from './SpotifyIcon';

export const ICON_MAP: Record<LucideIconName, LucideIcon> = {
  github: Github,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: TikTokIcon as unknown as LucideIcon,
  spotify: SpotifyIcon as unknown as LucideIcon,
  linkedin: Linkedin,
  globe: Globe,
  mail: Mail,
  whatsapp: MessageCircle,
  shop: ShoppingCart,
  book: BookOpen,
  rss: Rss,
  music: Music,
  video: Video,
  code: Code,
  link: Link,
  external: ExternalLink,
};

export function resolveIcon(name: string): LucideIcon {
  return (ICON_MAP as Record<string, LucideIcon>)[name] ?? Link;
}
