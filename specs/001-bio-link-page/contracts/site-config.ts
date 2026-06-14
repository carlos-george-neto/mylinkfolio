/**
 * MyLinkfolio — Public Configuration Contract
 *
 * This file is the authoritative type definition for `src/config.ts`.
 * It defines every shape that the page owner edits and every shape
 * that components consume. No other file may define these types.
 *
 * Source: specs/001-bio-link-page/data-model.md
 */

// ---------------------------------------------------------------------------
// Icon Registry
// ---------------------------------------------------------------------------

/**
 * Allowed icon names. Each name maps to a Lucide icon in src/utils/icons.ts.
 * Add new entries to ICON_MAP first; then extend this union type.
 */
export type LucideIconName =
  | 'github'
  | 'twitter'
  | 'instagram'
  | 'youtube'
  | 'tiktok'
  | 'spotify'
  | 'linkedin'
  | 'globe'
  | 'mail'
  | 'whatsapp'
  | 'shop'
  | 'book'
  | 'rss'
  | 'music'
  | 'video'
  | 'code'
  | 'link'
  | 'external';

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

/**
 * The page owner's public identity displayed at the top of the page.
 */
export interface Profile {
  /** Display name shown below the avatar. Max 80 characters. */
  name: string;
  /** Social handle rendered with @ prefix. Max 50 characters. */
  handle: string;
  /** Short bio. Max 160 characters. */
  bio: string;
  /**
   * URL of the profile photo. May be absolute (https://...) or
   * a relative path to a file in the project's public/ folder.
   * Falls back to /assets/avatar.jpg on load error.
   */
  avatarUrl: string;
}

// ---------------------------------------------------------------------------
// LinkItem
// ---------------------------------------------------------------------------

/**
 * A single navigable destination rendered as a prominent button
 * in the main links list.
 */
export interface LinkItem {
  /** Unique identifier within the links array. Used as React key. */
  id: string;
  /** Button label shown to visitors. Max 60 characters. */
  title: string;
  /**
   * Destination URL. Must be an absolute URL starting with
   * http:// or https://. Entries with invalid URLs are excluded
   * from the rendered page.
   */
  url: string;
  /**
   * Icon identifier. Must match a key in LucideIconName.
   * Unknown values fall back to the 'link' icon.
   */
  icon: LucideIconName;
  /**
   * When true, the button renders with primary-color styling
   * (gold background) instead of the default surface styling.
   * Use for the most important link (e.g., portfolio, main CTA).
   */
  highlighted?: boolean;
}

// ---------------------------------------------------------------------------
// SocialLink
// ---------------------------------------------------------------------------

/**
 * A compact social network icon shown in the SocialIcons row,
 * separate from the main link buttons.
 */
export interface SocialLink {
  /** Unique identifier within the socialLinks array. */
  id: string;
  /** Human-readable platform name used as the aria-label (e.g., "Instagram"). */
  platform: string;
  /** Absolute URL of the social profile. */
  url: string;
  /** Icon from LucideIconName registry. */
  icon: LucideIconName;
}

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------

/**
 * Visual overrides applied on top of the design-system.md defaults.
 * All fields are optional — omitting a field inherits the design-system default.
 *
 * Default palette (from design-system.md):
 *   backgroundColor : #080704  (near-black warm canvas)
 *   primaryColor    : #E8A020  (golden amber)
 *   onPrimaryColor  : #0f0d0a  (near-black)
 *   surfaceColor    : #110f0c  (surface-1)
 *   inkColor        : #f5f0e8  (warm white)
 */
export interface Theme {
  /** Page background color. */
  backgroundColor?: string;
  /** Primary accent color used on highlighted buttons and interactive elements. */
  primaryColor?: string;
  /** Hover state color for the primary accent. */
  primaryHoverColor?: string;
  /** Text color on top of the primary accent (must meet WCAG AA with primaryColor). */
  onPrimaryColor?: string;
  /** Background color of default (non-highlighted) link buttons. */
  surfaceColor?: string;
  /** Default text color on dark backgrounds. */
  inkColor?: string;
  /** Secondary/muted text color. */
  inkMutedColor?: string;
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

/**
 * SEO metadata and deployment configuration.
 * All values populate <head> tags. siteUrl also drives the canonical link
 * and JSON-LD structured data. basePath drives Vite's `base` option.
 */
export interface Meta {
  /** Page title for <title> and og:title. */
  title: string;
  /** Page description for <meta name="description"> and og:description. */
  description: string;
  /**
   * Canonical URL of the deployed page.
   * Example: "https://username.github.io/mylinkfolio/"
   * Used in <link rel="canonical"> and JSON-LD Person schema.
   */
  siteUrl: string;
  /**
   * Vite base path for subdirectory deployments.
   * Set to "/repo-name/" when deploying to a GitHub Pages project site.
   * Defaults to "/" for root deployments (Vercel, Netlify, custom domain).
   */
  basePath?: string;
  /**
   * Absolute URL of the Open Graph preview image.
   * Recommended: 1200×630px. Optional but strongly recommended.
   */
  ogImage?: string;
}

// ---------------------------------------------------------------------------
// SiteConfig — aggregate root
// ---------------------------------------------------------------------------

/**
 * The complete configuration for a MyLinkfolio page.
 * This is the type of the default export from src/config.ts.
 *
 * src/config.ts is the ONLY file a page owner needs to edit.
 * No URL, display name, color, or metadata may be hard-coded
 * inside any component or other source file.
 */
export interface SiteConfig {
  profile: Profile;
  /** Ordered list of main link buttons. */
  links: LinkItem[];
  /** Optional compact row of social network icons above/below the profile card. */
  socialLinks?: SocialLink[];
  /** Optional visual theme overrides. Inherits design-system defaults when absent. */
  theme?: Theme;
  meta: Meta;
}
