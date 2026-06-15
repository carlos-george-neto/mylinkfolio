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
git clone https://github.com/carlos-george-neto/mylinkfolio.git
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
  siteUrl:     'https://carlos-george-neto.github.io/mylinkfolio/',
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

**Pré-requisito:** o repositório precisa estar no GitHub e você precisa ter o `git` configurado localmente.

**Passo 1 — Repositório no GitHub**

O repositório já está disponível em: [github.com/carlos-george-neto/mylinkfolio](https://github.com/carlos-george-neto/mylinkfolio)

Se ainda não tiver o remote configurado localmente:

```bash
git remote add origin https://github.com/carlos-george-neto/mylinkfolio.git
git push -u origin main
```

**Passo 2 — Configure o `basePath` em `src/config.ts`**

Abra `src/config.ts` e verifique que os campos `meta.basePath` e `meta.siteUrl` estão assim:

```typescript
meta: {
  basePath: '/mylinkfolio/',
  siteUrl:  'https://carlos-george-neto.github.io/mylinkfolio/',
  // ...
},
```

> Errar o `basePath` (nome do repositório ou ausência das barras) causa página em branco após o deploy.

**Passo 4 — Execute o deploy**

```bash
npm run deploy
```

Esse comando executa `npm run build` e em seguida envia o conteúdo de `dist/` para a branch `gh-pages` automaticamente via `gh-pages`.

**Passo 5 — Ative o GitHub Pages no repositório**

1. Abra o repositório no GitHub.
2. Vá em **Settings → Pages**.
3. Em **Branch**, selecione `gh-pages` e a pasta `/ (root)`.
4. Clique em **Save**.

Aguarde cerca de 1 minuto. Sua página estará disponível em:

```
https://carlos-george-neto.github.io/mylinkfolio/
```

**Atualizações futuras**

Para publicar uma nova versão após alterar `src/config.ts` ou qualquer outro arquivo, basta rodar novamente:

```bash
npm run deploy
```

---

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
