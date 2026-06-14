/**
 * MyLinkfolio Configuration
 *
 * This is the ONLY file you need to edit to customize your link page.
 * Edit the values below, save the file, and your page will update automatically
 * when running `npm run dev`, or after running `npm run build`.
 *
 * ──────────────────────────────────────────────────────────────
 *  HOW TO EDIT:
 *  1. Change any value between the quotes " "
 *  2. Save the file (Ctrl+S / Cmd+S)
 *  3. Open http://localhost:5173 in your browser to preview
 * ──────────────────────────────────────────────────────────────
 */

import type { SiteConfig } from './types';

const config: SiteConfig = {
  // ────────────────────────────────────────────────────────────
  // PROFILE — shown at the top of your page
  // ────────────────────────────────────────────────────────────
  profile: {
    /** Your display name. Max 80 characters. */
    name: 'Casal Matuto Por Aí',

    /**
     * Your social handle (without the @ symbol). Max 50 characters.
     * Shown as "@yourhandle" below your name.
     */
    handle: 'CasalMatutoPorAi',

    /**
     * A short bio or tagline. Max 160 characters.
     * Keep it concise — one or two sentences work best.
     */
    bio: 'Welcome to my link page! Find all my important links here.',

    /**
     * URL of your profile photo.
     * Options:
     *   - An absolute URL: 'https://example.com/photo.jpg'
     *   - A file in the public/ folder: '/my-photo.jpg'
     *   - Leave as '/assets/avatar.jpg' to use the default placeholder
     * Falls back to the default avatar if the image fails to load.
     */
    avatarUrl: '/assets/CasalMatutoPorAi.JPG',
  },

  // ────────────────────────────────────────────────────────────
  // LINKS — the main buttons on your page (ordered top to bottom)
  // ────────────────────────────────────────────────────────────
  /**
   * Each link appears as a button. Add, remove, or reorder entries freely.
   *
   * Fields:
   *   id          — unique identifier (no spaces, e.g. 'my-portfolio')
   *   title       — button label shown to visitors. Max 60 characters.
   *   url         — destination URL. MUST start with https:// or http://
   *                 Links with invalid URLs are silently excluded from the page.
   *   icon        — icon name. Valid values:
   *                 'github' | 'twitter' | 'instagram' | 'youtube' | 'linkedin' |
   *                 'globe'  | 'mail'    | 'whatsapp'  | 'shop'    | 'book'     |
   *                 'rss'    | 'music'   | 'video'     | 'code'    | 'link'     | 'external'
   *                 Unknown values fall back to the generic 'link' icon.
   *   highlighted — (optional) set to true for your most important link.
   *                 Renders with a gold background. Use for only one link.
   */
  links: [
     {
      id: 'youtube',
      title: 'Vídeos Completos no YouTube',
      url: 'https://www.youtube.com/@CasalMatutoPorAi',
      icon: 'youtube',
      highlighted: true,
    },
    {
      id: 'instagram',
      title: 'Casal Matuto Por Aí no Instagram',
      url: 'https://www.instagram.com/casalmatutoporai',
      icon: 'instagram'
    },
    {
      id: 'tiktok',
      title: 'Casal Matuto Por Aí no TikTok',
      url: 'https://www.tiktok.com/@casalmatutoporai',
      icon: 'tiktok',
    },
    {
      id: 'spotify',
      title: 'Playlist para sua aventura',
      url: 'https://open.spotify.com/playlist/5XH7mDn4LkqZG9gIre5mHN?si=WROW_674QEOvBcpPu3GNlw',
      icon: 'spotify',
    }
  ],

  // ────────────────────────────────────────────────────────────
  // SOCIAL ICONS — compact icon row (optional)
  // ────────────────────────────────────────────────────────────
  /**
   * Small icon-only links shown above the main link buttons.
   * Great for social profiles you want visible but not as prominent as main links.
   * Remove this entire section (set to []) to hide the social icons row.
   *
   * Fields:
   *   id       — unique identifier
   *   platform — human-readable name used for accessibility (e.g. 'Twitter')
   *   url      — must start with https:// or http://
   *   icon     — same valid values as links[].icon above
   */
  socialLinks: [
    {
      id: 'instagram',
      platform: 'Instagram',
      url: 'https://www.instagram.com/casalmatutoporai',
      icon: 'instagram',
    },
    {
      id: 'youtube',
      platform: 'YouTube',
      url: 'https://www.youtube.com/@CasalMatutoPorAi',
      icon: 'youtube',
    },
    {
      id: 'tiktok',
      platform: 'TikTok',
      url: 'https://www.tiktok.com/@casalmatutoporai',
      icon: 'tiktok',
    },
     {
      id: 'spotify',
      platform: 'Spotify',
      url: 'https://open.spotify.com/playlist/5XH7mDn4LkqZG9gIre5mHN?si=WROW_674QEOvBcpPu3GNlw',
      icon: 'spotify',
    }
  ],

  // ────────────────────────────────────────────────────────────
  // THEME — override the default color scheme (optional)
  // ────────────────────────────────────────────────────────────
  /**
   * All fields are optional. Omit any field to keep the design-system default.
   *
   * Default palette:
   *   backgroundColor : #080704  (near-black warm canvas)
   *   primaryColor    : #E8A020  (golden amber — highlighted button)
   *   onPrimaryColor  : #0f0d0a  (text on highlighted button)
   *   surfaceColor    : #110f0c  (default button background)
   *   inkColor        : #f5f0e8  (main text color)
   *
   * All values must be valid CSS color strings: '#3B82F6', 'rgb(59,130,246)', etc.
   *
   * Example — blue theme:
   *   primaryColor: '#3B82F6',
   *   backgroundColor: '#0F172A',
   */
  theme: {},

  // ────────────────────────────────────────────────────────────
  // META — SEO and deployment settings
  // ────────────────────────────────────────────────────────────
  meta: {
    /**
     * Page title shown in browser tabs and search engine results. Max 60 characters.
     * Format: 'Your Name | Links' works well.
     */
    title: 'Casal Matuto Por Aí | Links',

    /**
     * Short description for search engines and social previews. Max 160 characters.
     */
    description: 'Find all my important links in one place.',

    /**
     * The full URL of your deployed page (no trailing slash for root, include for subdirs).
     * Used for the canonical link tag and structured data.
     * Example: 'https://yourname.github.io/mylinkfolio/'
     */
    siteUrl: 'http://localhost:5173',

    /**
     * Vite base path — only change this if deploying to a GitHub Pages project site.
     * GitHub Pages project site: set to '/your-repo-name/'
     * Root deployments (Vercel, Netlify, custom domain): keep as '/'
     */
    basePath: '/',

    /**
     * (Optional) URL of your Open Graph preview image (shown when sharing on social media).
     * Recommended size: 1200×630px.
     * Example: 'https://example.com/og-image.jpg'
     */
    // ogImage: 'https://example.com/og-image.jpg',
  },
};

export default config;
