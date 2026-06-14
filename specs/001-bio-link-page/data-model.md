# Data Model: Bio Link Page

**Phase**: 1 | **Date**: 2026-06-13 | **Feature**: [spec.md](./spec.md)

---

## Entities

### Profile

Represents the page owner's public identity displayed at the top of the page.

| Field | Type | Required | Constraint |
|---|---|---|---|
| `name` | `string` | Yes | 1–80 characters |
| `handle` | `string` | Yes | 1–50 characters; rendered with `@` prefix |
| `bio` | `string` | Yes | 1–160 characters |
| `avatarUrl` | `string` | Yes | Valid URL or relative path; falls back to `/assets/avatar.jpg` on load error |

**Validation rules**:
- `name` and `handle` must be non-empty strings.
- `bio` is truncated at 160 characters in the UI (spec FR-001).
- `avatarUrl` load errors are handled silently with a fallback (spec FR-010).

---

### LinkItem

A single navigable destination rendered as a prominent button in the main links list.

| Field | Type | Required | Constraint |
|---|---|---|---|
| `id` | `string` | Yes | Unique within the `links` array; used as React key |
| `title` | `string` | Yes | 1–60 characters; button label |
| `url` | `string` | Yes | Must be a valid absolute URL (starts with `http://` or `https://`) |
| `icon` | `LucideIconName` | Yes | Must exist in `ICON_MAP`; falls back to `link` icon if unknown |
| `highlighted` | `boolean` | No | When `true`, the button renders with primary-color styling instead of default surface styling |

**Validation rules** (enforced in `src/utils/config.ts`):
- Links with a missing or invalid `url` are excluded from the rendered list (spec FR-011).
- Links with an unknown `icon` value fall back to the `link` icon — they are never excluded.
- The `id` field must be a non-empty unique string within the array.

---

### SocialLink

A compact social network icon displayed in the `SocialIcons` row (separate from main link buttons).

| Field | Type | Required | Constraint |
|---|---|---|---|
| `id` | `string` | Yes | Unique within the `socialLinks` array |
| `platform` | `string` | Yes | Human-readable label (e.g., `"Instagram"`) used as `aria-label` |
| `url` | `string` | Yes | Valid absolute URL |
| `icon` | `LucideIconName` | Yes | Must exist in `ICON_MAP` |

**Validation rules**:
- Same URL validation as `LinkItem` — invalid entries are excluded.
- If the entire `socialLinks` field is absent or empty, the `SocialIcons` component renders nothing.

---

### Theme

Visual design overrides applied on top of the design-system.md defaults.

| Field | Type | Required | Constraint |
|---|---|---|---|
| `backgroundColor` | `string` | No | CSS color value; defaults to `#080704` (design-system `canvas`) |
| `primaryColor` | `string` | No | CSS color value; defaults to `#E8A020` (design-system `primary`) |
| `primaryHoverColor` | `string` | No | CSS color value; defaults to `#F5BC4A` |
| `onPrimaryColor` | `string` | No | CSS color value; defaults to `#0f0d0a` |
| `surfaceColor` | `string` | No | CSS color value; defaults to `#110f0c` (design-system `surface-1`) |
| `inkColor` | `string` | No | CSS color value; defaults to `#f5f0e8` (design-system `ink`) |
| `inkMutedColor` | `string` | No | CSS color value; defaults to `#cec5b5` |

**How theme is applied**: `App.tsx` sets a `style` prop on the root wrapper that maps each `Theme` field to a CSS custom property (e.g., `--color-primary`). Tailwind classes reference those variables via the `tailwind.config.js` extension. Missing fields leave the CSS variable unset, inheriting from `globals.css` defaults.

---

### Meta

SEO metadata and deployment configuration. All values drive `<head>` tags and Vite's `base` path.

| Field | Type | Required | Constraint |
|---|---|---|---|
| `title` | `string` | Yes | `<title>` and `og:title` |
| `description` | `string` | Yes | `<meta name="description">` and `og:description` |
| `siteUrl` | `string` | Yes | Canonical URL (e.g., `https://username.github.io/mylinkfolio/`); used in `<link rel="canonical">` and JSON-LD |
| `basePath` | `string` | No | Vite `base` option (e.g., `'/mylinkfolio/'` for GitHub Pages project sites); defaults to `'/'` |
| `ogImage` | `string` | No | Absolute URL of Open Graph preview image |

---

### SiteConfig (aggregate root)

The single exported constant from `src/config.ts`. All other source files import exclusively from this type.

| Field | Type | Required |
|---|---|---|
| `profile` | `Profile` | Yes |
| `links` | `LinkItem[]` | Yes |
| `socialLinks` | `SocialLink[]` | No |
| `theme` | `Theme` | No |
| `meta` | `Meta` | Yes |

---

## Entity Relationships

```
SiteConfig
├── profile: Profile           (1:1, mandatory)
├── links: LinkItem[]          (1:many, mandatory, may be empty)
├── socialLinks: SocialLink[]  (1:many, optional)
├── theme: Theme               (1:1, optional — uses design-system defaults if absent)
└── meta: Meta                 (1:1, mandatory)
```

---

## Runtime Data Flow

```
src/config.ts (SiteConfig)
       │
       ▼
src/App.tsx
  ├── reads profile   → <ProfileCard>
  ├── reads links     → <LinkList> → [<LinkButton>, ...]
  ├── reads socialLinks → <SocialIcons> → [<a icon>, ...]
  ├── reads theme     → root style={{ '--color-*': theme.* }}
  └── reads meta      → <Helmet> / <head> tags + JSON-LD

src/utils/config.ts
  └── validateConfig(raw: SiteConfig): SiteConfig
      ├── filters out LinkItem entries with invalid URLs
      ├── filters out SocialLink entries with invalid URLs
      └── falls back to defaults for missing Theme fields

src/utils/icons.ts
  └── ICON_MAP: Record<LucideIconName, LucideIcon>
      └── resolveIcon(name: string): LucideIcon  (falls back to Link icon)
```

---

## Validation Rules Summary

| Rule | Source Requirement | Implementation |
|---|---|---|
| Links with missing/invalid URL are excluded | FR-011 | `validateConfig` filters `links` array |
| Profile photo load error shows fallback | FR-010 | `<img onError>` in `ProfileCard` |
| Empty `links` array renders gracefully | Edge Case | `LinkList` renders nothing (no error) |
| Invalid icon name falls back to `link` icon | Research Decision 5 | `resolveIcon` in `utils/icons.ts` |
| Missing/empty `socialLinks` renders nothing | Research Decision 8 | `SocialIcons` returns `null` |
| Missing `Theme` fields inherit from CSS defaults | FR-006 | CSS custom property defaults in `globals.css` |
