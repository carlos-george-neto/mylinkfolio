# Research: Bio Link Page

**Phase**: 0 | **Date**: 2026-06-13 | **Feature**: [spec.md](./spec.md)

---

## Decision 1: Tailwind CSS Version

**Decision**: Use Tailwind CSS v3 (latest v3.x stable release).

**Rationale**: Tailwind v4 introduced a CSS-first configuration model that eliminates `tailwind.config.js` in favour of `@import "tailwindcss"` directives. While v4 is likely stable by June 2026, the ecosystem of Vite plugins and PostCSS integration layers is still maturing, and the design-system.md token-mapping workflow below was designed around the `theme.extend` pattern of v3. v3 continues to receive security and bug-fix releases and is the safer default for a new project starting today.

**Alternatives considered**:
- Tailwind v4: More ergonomic CSS-first setup, but breaking changes in plugin API and config file format increase ramp-up risk for the first iteration.

**Action**: Pin `tailwindcss` to `^3` in `package.json`. Revisit v4 migration after the initial deployment is live.

---

## Decision 2: Animations — Framer Motion vs Tailwind CSS

**Decision**: Remove Framer Motion. Use Tailwind CSS built-in transition/animation utilities and custom `@keyframes` in `globals.css`.

**Rationale**: The project constitution explicitly disallows animation libraries under Stack Constraints:
> "State management libraries, animation libraries, router packages, and HTTP clients are explicitly disallowed unless a principle is amended to permit them."

Framer Motion weighs ~30KB gzip (core). For a bio link page — a lightweight static asset — this is a significant bundle overhead. Tailwind's `transition-all`, `duration-200`, `ease-out` utilities, combined with `@keyframes fade-up` and `animate-fade-up` in `globals.css`, can reproduce every animation needed here (entry fade, button hover scale, focus ring) without any additional dependency.

**Alternatives considered**:
- Framer Motion: Excellent DX for complex sequences. Not needed for fade-in + scale-on-hover patterns.
- `@react-spring/web`: Same category (animation library), same constitution violation.
- CSS `@keyframes` + Tailwind `animate-*` plugin: Chosen. Zero extra dependencies.

**Implementation guide**:
```css
/* globals.css */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: fade-up 0.35s ease-out both;
}
.animate-fade-up-delay-1 { animation-delay: 0.05s; }
.animate-fade-up-delay-2 { animation-delay: 0.10s; }
/* ... one class per link stagger step */
```
Link buttons use `animation-delay` calculated from their index via an inline `style` prop — no Framer Motion needed.

**Action**: Remove Framer Motion from the user's proposed stack. Document this deviation in `plan.md` Complexity Tracking.

---

## Decision 3: Font Strategy

**Decision**: Load **Inter** via Google Fonts as the substitute for Linear Display and Linear Text. Use **JetBrains Mono** for any monospace contexts.

**Rationale**: The design-system.md acknowledges that Linear's custom typeface is not publicly distributed and recommends "Inter at weight 500/600/700" as "the closest free substitute". Inter is available via Google Fonts with a `<link>` in `index.html`, adding zero build-time dependencies. It supports the same weight range (400/500/600) used in the design system.

**Weights to load**: 400 (body), 500 (button/eyebrow/card-title), 600 (display headlines).
**Formats**: Request `woff2` with `display=swap` to avoid render-blocking.

**Tailwind config mapping**:
```js
fontFamily: {
  display: ['Inter', 'SF Pro Display', '-apple-system', 'system-ui', 'Segoe UI', 'sans-serif'],
  body:    ['Inter', '-apple-system', 'system-ui', 'Segoe UI', 'sans-serif'],
  mono:    ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
}
```

---

## Decision 4: Design System Token Mapping to Tailwind

**Decision**: Map all `design-system.md` color tokens to CSS custom properties in `globals.css`, then extend Tailwind's theme to reference them. The config's `theme` object overrides these CSS variables at runtime via inline `style` on the root `<div>`.

**Token mapping** (design-system.md frontmatter → CSS variable → Tailwind class):

| Design Token | CSS Variable | Hex | Tailwind |
|---|---|---|---|
| `colors.background` / `canvas` | `--color-canvas` | `#080704` | `bg-canvas` |
| `colors.primary` | `--color-primary` | `#E8A020` | `bg-primary`, `text-primary` |
| `colors.on-primary` | `--color-on-primary` | `#0f0d0a` | `text-on-primary` |
| `colors.primary-hover` | `--color-primary-hover` | `#F5BC4A` | `hover:bg-primary-hover` |
| `colors.primary-focus` | `--color-primary-focus` | `#C4870E` | `ring-primary-focus` |
| `colors.ink` | `--color-ink` | `#f5f0e8` | `text-ink` |
| `colors.ink-muted` | `--color-ink-muted` | `#cec5b5` | `text-ink-muted` |
| `colors.ink-subtle` | `--color-ink-subtle` | `#8a7f70` | `text-ink-subtle` |
| `colors.surface-1` | `--color-surface-1` | `#110f0c` | `bg-surface-1` |
| `colors.surface-2` | `--color-surface-2` | `#161310` | `bg-surface-2` |
| `colors.hairline` | `--color-hairline` | `#2a2520` | `border-hairline` |
| `colors.hairline-strong` | `--color-hairline-strong` | `#3d3628` | `border-hairline-strong` |

CSS variables enable the `theme` object from `config.ts` to override any token at runtime by setting `style={{ '--color-primary': theme.primaryColor }}` on the root element.

**Tailwind `tailwind.config.js` pattern**:
```js
theme: {
  extend: {
    colors: {
      canvas:          'var(--color-canvas)',
      primary:         'var(--color-primary)',
      'on-primary':    'var(--color-on-primary)',
      'primary-hover': 'var(--color-primary-hover)',
      'primary-focus': 'var(--color-primary-focus)',
      ink:             'var(--color-ink)',
      'ink-muted':     'var(--color-ink-muted)',
      'ink-subtle':    'var(--color-ink-subtle)',
      'surface-1':     'var(--color-surface-1)',
      'surface-2':     'var(--color-surface-2)',
      hairline:        'var(--color-hairline)',
      'hairline-strong': 'var(--color-hairline-strong)',
    },
  }
}
```

---

## Decision 5: Icon Approach — lucide-react Tree-Shaking

**Decision**: Use a curated `ICON_MAP` registry in `src/utils/icons.ts` instead of dynamically indexing all Lucide icons. This preserves tree-shaking while supporting string-based icon names in config.ts.

**Rationale**: If icons were resolved via `import * as Icons from 'lucide-react'` + dynamic key access, the entire lucide-react package (~1MB) would be bundled. The curated map pattern imports only the icons actually used; Vite's rollup can tree-shake the rest.

**Pattern**:
```typescript
// src/utils/icons.ts
import {
  Github, Twitter, Instagram, Youtube, Linkedin,
  Globe, Mail, MessageCircle, ShoppingCart, BookOpen,
  Rss, Music, Video, Code, Link, ExternalLink,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  github: Github, twitter: Twitter, instagram: Instagram,
  youtube: Youtube, linkedin: Linkedin, globe: Globe,
  mail: Mail, whatsapp: MessageCircle, shop: ShoppingCart,
  book: BookOpen, rss: Rss, music: Music, video: Video,
  code: Code, link: Link, external: ExternalLink,
};

export type LucideIconName = keyof typeof ICON_MAP;
```

Config validation (in `src/utils/config.ts`) checks that each `link.icon` value exists in `ICON_MAP`; unknown icons fall back to `Link`.

---

## Decision 6: Deployment Script

**Decision**: Use the `gh-pages` npm package for GitHub Pages deployment. Install as devDependency.

**package.json scripts**:
```json
{
  "scripts": {
    "dev":     "vite",
    "build":   "tsc && vite build",
    "preview": "vite preview",
    "deploy":  "npm run build && gh-pages -d dist"
  }
}
```

**GitHub Pages base path**: The `base` option in `vite.config.ts` reads from `config.meta.basePath`. Default is `'/'`; set to `'/repo-name/'` when deploying to a GitHub Pages project site.

**Vercel / Netlify**: Just deploy the `dist/` folder — no additional config needed; base path stays `'/'`.

**Rationale**: `gh-pages` is a single devDependency that handles the `dist/` → `gh-pages` branch push automatically. It is a deploy tooling package, not a runtime dependency, so it does not violate Stack Constraints (which govern runtime deps only).

---

## Decision 7: Avatar Fallback Strategy

**Decision**: Use the `onError` event on `<img>` to swap the `src` to the bundled default avatar (`/assets/avatar.jpg`) when the configured `avatarUrl` fails to load.

**Rationale**: Pure HTML/React — no extra dependency. The fallback avatar ships in the build output so it is always available, even offline.

**Pattern**:
```tsx
<img
  src={profile.avatarUrl || defaultAvatar}
  onError={(e) => { (e.target as HTMLImageElement).src = defaultAvatar; }}
  alt={`${profile.name} profile photo`}
  className="rounded-full w-24 h-24 object-cover"
/>
```

---

## Decision 8: SocialIcons Component Data Source

**Decision**: Add an optional `socialLinks` field to `SiteConfig`. When present, `SocialIcons.tsx` renders them as a compact row of icon-only buttons above or below the profile card. When absent, the component renders nothing.

**Rationale**: The user's component architecture includes `SocialIcons.tsx` as a distinct component separate from `LinkList.tsx`. This requires its own data. A separate field is cleaner than filtering `links` by icon name or adding a `type` discriminant to `LinkItem`.

---

## Decision 9: Testing

**Decision**: Add **Vitest** + **React Testing Library** as devDependencies for unit-testing utility functions in `src/utils/`.

**Scope**: Tests are optional for the initial delivery but the `src/utils/` module (config validation, icon lookup, URL filtering) is the primary candidate for unit tests. Components are not tested at this stage.

**Rationale**: No testing framework was specified by the user. Vitest integrates with Vite's config natively (shared transform pipeline) and adds minimal overhead. It does not appear in the Stack Constraints list, but it is a dev-only tool and doesn't affect the production bundle.
