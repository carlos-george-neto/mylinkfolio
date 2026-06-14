# Quickstart: Bio Link Page

**Date**: 2026-06-13 | **Branch**: `001-bio-link-page`

---

## Prerequisites

- Node.js 18+ and npm 9+
- A free account on GitHub, Vercel, or Netlify (for deployment)

---

## 1. Install dependencies

```bash
npm install
```

---

## 2. Customize your page

Open **`src/config.ts`** — this is the only file you need to edit.

### Profile

```typescript
profile: {
  name:      'Your Name',
  handle:    'yourhandle',          // shown as @yourhandle
  bio:       'A short bio about you. Max 160 characters.',
  avatarUrl: 'https://your-photo-url.com/photo.jpg',
  // Or use a local file: avatarUrl: '/assets/avatar.jpg'
},
```

### Links

Each link renders as a button. Order matters — top to bottom.

```typescript
links: [
  {
    id:          'portfolio',
    title:       'My Portfolio',
    url:         'https://yoursite.com',
    icon:        'globe',
    highlighted: true,   // renders with gold/primary styling — use for your main CTA
  },
  {
    id:    'youtube',
    title: 'Watch on YouTube',
    url:   'https://youtube.com/@yourhandle',
    icon:  'youtube',
  },
  {
    id:    'course',
    title: 'My Online Course',
    url:   'https://yourplatform.com/course',
    icon:  'book',
  },
],
```

**Available icons**: `github`, `twitter`, `instagram`, `youtube`, `linkedin`, `globe`, `mail`, `whatsapp`, `shop`, `book`, `rss`, `music`, `video`, `code`, `link`, `external`

### Social icons (optional)

A compact row of icon-only buttons shown near the profile card:

```typescript
socialLinks: [
  { id: 'ig',  platform: 'Instagram', url: 'https://instagram.com/you', icon: 'instagram' },
  { id: 'gh',  platform: 'GitHub',    url: 'https://github.com/you',    icon: 'github'    },
  { id: 'li',  platform: 'LinkedIn',  url: 'https://linkedin.com/in/you', icon: 'linkedin' },
],
```

Omit `socialLinks` entirely to hide this row.

### Theme colors (optional)

Override any design-system color. Omit to use the default dark gold theme.

```typescript
theme: {
  backgroundColor: '#080704',   // page background
  primaryColor:    '#E8A020',   // highlighted button + accents
  onPrimaryColor:  '#0f0d0a',   // text on highlighted button
  surfaceColor:    '#110f0c',   // default button background
  inkColor:        '#f5f0e8',   // primary text color
},
```

### SEO + deployment metadata

```typescript
meta: {
  title:       'Your Name | Links',
  description: 'All my links in one place.',
  siteUrl:     'https://yourusername.github.io/mylinkfolio/',
  basePath:    '/mylinkfolio/',  // set to '/' for Vercel/Netlify/custom domain
  ogImage:     'https://yoursite.com/og-image.jpg',  // optional, 1200×630px
},
```

---

## 3. Run the dev server

```bash
npm run dev
```

Open `http://localhost:5173` to preview your page.

---

## 4. Build for production

```bash
npm run build
```

The production bundle is output to `dist/`. Check it locally with:

```bash
npm run preview
```

---

## 5. Deploy

### GitHub Pages (recommended)

1. Push your repo to GitHub.
2. Ensure `meta.basePath` in `config.ts` matches your repo name: `'/repo-name/'`
3. Run:
   ```bash
   npm run deploy
   ```
   This builds the project and pushes `dist/` to the `gh-pages` branch automatically.
4. In your GitHub repo: **Settings → Pages → Branch → `gh-pages` / `/ (root)`** → Save.
5. Your page is live at `https://yourusername.github.io/repo-name/`.

### Vercel

1. Import the repo at vercel.com.
2. Set Build Command: `npm run build` | Output Directory: `dist`.
3. Set `meta.basePath` to `'/'` in `config.ts`.
4. Deploy — Vercel auto-deploys on every push to `main`.

### Netlify

1. Import the repo at netlify.com.
2. Set Build Command: `npm run build` | Publish Directory: `dist`.
3. Set `meta.basePath` to `'/'` in `config.ts`.
4. Deploy — Netlify auto-deploys on every push.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Profile photo not showing | Check that `avatarUrl` is a valid public URL. Place local files in `public/assets/`. |
| A link button is missing | Check that the `url` field starts with `http://` or `https://`. |
| Page not loading after GitHub Pages deploy | Verify `meta.basePath` matches the repo name exactly, including trailing slash. |
| Icons not recognized | Use only icon names from the Available Icons list above. |
| Build fails with TypeScript errors | Run `npm run build` and check the error output; most errors indicate a type mismatch in `config.ts`. |
