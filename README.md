# MyLinkfolio

A self-hosted, config-driven bio link page — a free Linktree alternative you deploy yourself.

Edit one file. Build. Deploy. Done.

---

## Features

- **Single config file** — edit only `src/config.ts`, never touch components
- **Static output** — no server, no database, no runtime costs
- **Mobile-first** — responsive from 320px, WCAG AA color contrast
- **Custom theme** — override any color token without touching component files
- **SEO-ready** — `<title>`, `<meta>`, Open Graph tags, and JSON-LD `Person` schema
- **Fast** — JS bundle under 100 KB gzip; all content visible in under 2 seconds on 3G
- **One-click deploy** — GitHub Pages, Vercel, or Netlify

## Tech Stack

| Layer | Tool |
|---|---|
| UI | React 18 + TypeScript 5 (strict) |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Icons | lucide-react (tree-shaken via `ICON_MAP`) |
| Build | Vite 5 |
| Tests | Vitest + React Testing Library |
| Deploy | `gh-pages` (or any static CDN) |

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+

### Install

```bash
git clone https://github.com/your-username/mylinkfolio.git
cd mylinkfolio
npm install
```

### Customize

Open **`src/config.ts`** — this is the only file you need to edit.

```typescript
// src/config.ts

profile: {
  name:      'Your Name',
  handle:    'yourhandle',         // displayed as @yourhandle
  bio:       'A short tagline.',
  avatarUrl: 'https://example.com/photo.jpg',
},

links: [
  {
    id:          'portfolio',
    title:       'My Portfolio',
    url:         'https://yoursite.com',
    icon:        'globe',
    highlighted: true,             // renders with gold/primary styling — use for your main CTA
  },
  {
    id:    'youtube',
    title: 'Watch on YouTube',
    url:   'https://youtube.com/@yourhandle',
    icon:  'youtube',
  },
],

socialLinks: [
  { id: 'ig', platform: 'Instagram', url: 'https://instagram.com/you', icon: 'instagram' },
  { id: 'gh', platform: 'GitHub',    url: 'https://github.com/you',   icon: 'github'    },
],

theme: {
  backgroundColor: '#080704',
  primaryColor:    '#E8A020',
},

meta: {
  title:       'Your Name | Links',
  description: 'All my links in one place.',
  siteUrl:     'https://yourusername.github.io/mylinkfolio/',
  basePath:    '/mylinkfolio/',
},
```

**Available icons:** `github` `twitter` `instagram` `youtube` `linkedin` `globe` `mail` `whatsapp` `shop` `book` `rss` `music` `video` `code` `link` `external`

### Run locally

```bash
npm run dev
```

Open `http://localhost:5173` to preview your page. Changes to `src/config.ts` reflect instantly.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server at `localhost:5173` |
| `npm run build` | Type-check + compile to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run deploy` | Build and push `dist/` to the `gh-pages` branch |
| `npm test` | Run unit tests with Vitest |

---

## Deployment

### GitHub Pages

1. Push the repo to GitHub.
2. Set `meta.basePath` in `config.ts` to `'/your-repo-name/'`.
3. Run `npm run deploy` — this builds and pushes `dist/` to the `gh-pages` branch.
4. In your repo: **Settings → Pages → Branch → `gh-pages` / `/ (root)` → Save**.
5. Your page is live at `https://yourusername.github.io/your-repo-name/`.

### Vercel

1. Import the repo at [vercel.com](https://vercel.com).
2. Build Command: `npm run build` | Output Directory: `dist`.
3. Set `meta.basePath` to `'/'` in `config.ts`.

### Netlify

1. Import the repo at [netlify.com](https://netlify.com).
2. Build Command: `npm run build` | Publish Directory: `dist`.
3. Set `meta.basePath` to `'/'` in `config.ts`.

---

## Project Structure

```
src/
├── config.ts              ← the only file you edit
├── types.ts               ← TypeScript interfaces
├── main.tsx               ← app entry point
├── App.tsx                ← root component, applies theme CSS vars
├── components/
│   ├── ProfileCard.tsx    ← avatar + name + handle + bio
│   ├── LinkButton.tsx     ← single link button
│   ├── LinkList.tsx       ← staggered list of link buttons
│   └── SocialIcons.tsx    ← compact social icon row
└── utils/
    ├── config.ts          ← validates config, applies defaults
    └── icons.ts           ← ICON_MAP registry + fallback resolver
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Profile photo not showing | Ensure `avatarUrl` is a valid public URL; place local files in `public/assets/` |
| A link button is missing | Verify the `url` starts with `http://` or `https://` |
| Page blank after GitHub Pages deploy | Check that `meta.basePath` matches the repo name exactly, including trailing slash |
| Icon not showing | Use only names from the Available icons list above; unknown names fall back to a generic icon |
| Build fails with TypeScript errors | Run `npm run build` and fix the type mismatch reported in `config.ts` |

---

## License

MIT
