# Tasks: Bio Link Page

**Input**: Design documents from `specs/001-bio-link-page/`

**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/site-config.ts ✅

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story label — US1, US2, US3, US4
- Exact file paths are included in every description

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, dependency installation, and tooling configuration

- [X] T001 Initialize project: create `package.json` with name `mylinkfolio`, install runtime deps `react`, `react-dom`, `vite@^5`, `tailwindcss@^3`, `postcss`, `autoprefixer`, `lucide-react`
- [X] T002 [P] Configure TypeScript: create `tsconfig.json` with `compilerOptions.strict: true`, `target: "ES2020"`, `module: "ESNext"`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `include: ["src"]`
- [X] T003 [P] Configure PostCSS: create `postcss.config.js` with `tailwindcss` and `autoprefixer` plugins; create stub `tailwind.config.js` with `content: ["./index.html", "./src/**/*.{ts,tsx}"]`
- [X] T004 [P] Install devDependencies: `gh-pages`, `vitest`, `@testing-library/react`, `@testing-library/user-event`, `jsdom`, `@vitejs/plugin-react`, `@types/react`, `@types/react-dom`
- [X] T005 Create `index.html` Vite entry point with `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, Google Fonts preconnect + Inter (weights 400,500,600) stylesheet link, `<div id="root">`, and `<script type="module" src="/src/main.tsx">`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types, utilities, styling foundations, and build config that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Create `src/types.ts` that re-exports all types from `specs/001-bio-link-page/contracts/site-config.ts` (`LucideIconName`, `Profile`, `LinkItem`, `SocialLink`, `Theme`, `Meta`, `SiteConfig`)
- [X] T007 [P] Create `src/utils/icons.ts` with `ICON_MAP: Record<LucideIconName, LucideIcon>` importing all 16 named Lucide icons (Github, Twitter, Instagram, Youtube, Linkedin, Globe, Mail, MessageCircle, ShoppingCart, BookOpen, Rss, Music, Video, Code, Link, ExternalLink) and `resolveIcon(name: string): LucideIcon` returning `ICON_MAP[name] ?? Link`
- [X] T008 [P] Create `src/utils/config.ts` with `validateConfig(raw: SiteConfig): SiteConfig` that filters `links` and `socialLinks` entries whose `url` does not start with `http://` or `https://`, and throws a descriptive `Error` when `profile.name`, `profile.handle`, `meta.title`, `meta.description`, or `meta.siteUrl` are empty strings
- [X] T009 Create `src/styles/globals.css` with Tailwind `@tailwind base/components/utilities` directives, CSS `:root` block defining all 12 design-token custom properties (`--color-canvas: #080704`, `--color-primary: #E8A020`, `--color-on-primary: #0f0d0a`, `--color-primary-hover: #F5BC4A`, `--color-primary-focus: #C4870E`, `--color-ink: #f5f0e8`, `--color-ink-muted: #cec5b5`, `--color-ink-subtle: #8a7f70`, `--color-surface-1: #110f0c`, `--color-surface-2: #161310`, `--color-hairline: #2a2520`, `--color-hairline-strong: #3d3628`), and `@keyframes fade-up { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }` with `.animate-fade-up { animation: fade-up 0.35s ease-out both }`
- [X] T010 [P] Add a default fallback avatar to `src/assets/avatar.jpg` (any 200×200px square photo or placeholder image)
- [X] T011 Extend `tailwind.config.js` with `theme.extend.colors` mapping all 12 tokens to their CSS vars (`canvas: 'var(--color-canvas)'`, `primary: 'var(--color-primary)'`, etc.) and `theme.extend.fontFamily` with `display`, `body` (Inter stack), and `mono` (JetBrains Mono stack) per research.md Decision 3 and Decision 4
- [X] T012 Create `vite.config.ts` importing `@vitejs/plugin-react` and `SiteConfig` from `src/config.ts`, setting `plugins: [react()]` and `base: config.meta.basePath ?? '/'`

**Checkpoint**: Foundation ready — user story implementation can begin

---

## Phase 3: User Story 1 — Visitor Views Profile and Clicks Links (Priority: P1) 🎯 MVP

**Goal**: A visitor lands on the page and sees the owner's profile photo, name, @handle, and bio. Below that is a vertical list of icon+label link buttons that open destinations in a new tab. Optional social icon row is also shown. Page is fully usable at 320px width.

**Independent Test**: Open `http://localhost:5173` on a 320px mobile viewport. Verify: profile photo, display name, @handle, and bio appear at the top. A vertical list of buttons with icons and labels is visible. Tapping a button opens the linked URL in a new tab without closing the bio page. No horizontal scrolling occurs.

### Implementation for User Story 1

- [X] T013 [P] [US1] Create `src/components/ProfileCard.tsx` — functional component accepting `profile: Profile`; renders circular `<img>` (classes: `rounded-full w-24 h-24 object-cover`) with `src={profile.avatarUrl}`, `alt={profile.name + ' profile photo'}`, `onError` swapping src to imported default avatar; `<h1>` with display name; `<p>` with `@` prefix + handle; `<p>` with bio text (truncated at 160 chars in the class if needed)
- [X] T014 [P] [US1] Create `src/components/LinkButton.tsx` — functional component accepting `link: LinkItem`; renders `<a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.title}>` containing the icon component from `resolveIcon(link.icon)` and a `<span>` with `link.title`; when `link.highlighted` is true, applies primary-color Tailwind classes (`bg-primary text-on-primary`); default state uses surface classes (`bg-surface-1 text-ink`)
- [X] T015 [US1] Create `src/components/LinkList.tsx` — functional component accepting `links: LinkItem[]`; returns an ordered `<ul>` mapping each link to `<LinkButton>` wrapped in `<li>`; each item gets `className="animate-fade-up"` and `style={{ animationDelay: \`${index * 0.05}s\` }}` for stagger effect; returns `null` when `links` is empty
- [X] T016 [P] [US1] Create `src/components/SocialIcons.tsx` — functional component accepting `socialLinks?: SocialLink[]`; returns `null` when the array is absent or empty; otherwise renders a `<div>` with `flex gap-4` containing icon-only `<a>` elements each with `href={link.url}`, `target="_blank"`, `rel="noopener noreferrer"`, `aria-label={link.platform}`, and icon from `resolveIcon(link.icon)` at a smaller size (e.g., `w-5 h-5`)
- [X] T017 [US1] Create `src/App.tsx` — imports `config` from `src/config.ts`, calls `validateConfig(config)` and assigns result; builds a `themeStyle` object mapping each defined `Theme` field to its CSS custom property key; renders a root `<div style={themeStyle} className="min-h-screen bg-canvas text-ink flex flex-col items-center px-4 py-10">` containing `<ProfileCard>`, `<SocialIcons>`, and `<LinkList>`; uses `useEffect` to set `document.title`, `document.querySelector('meta[name="description"]')?.setAttribute('content', ...)`, og meta tags, and canonical link from `config.meta`
- [X] T018 [US1] Create `src/main.tsx` — imports `React`, `ReactDOM`, `App`, and `src/styles/globals.css`; calls `ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)`
- [X] T019 [US1] Create `src/config.ts` — exports a `SiteConfig` constant with sample profile (name, handle, bio, avatarUrl pointing to `/assets/avatar.jpg`), 3 `LinkItem` entries (first with `highlighted: true`), 2 `SocialLink` entries, an empty `theme: {}` object, and `meta` with `title`, `description`, `siteUrl: 'http://localhost:5173'`, `basePath: '/'`

**Checkpoint**: Run `npm run dev` — the full page should render in a browser with profile, link buttons, and social icons. Test at 320px viewport width.

---

## Phase 4: User Story 2 — Owner Customizes Profile and Links via Config (Priority: P2)

**Goal**: A non-technical owner edits only `src/config.ts` to change their profile info, add/remove links, and update social accounts. After rebuilding, every change is reflected on the live page.

**Independent Test**: Modify `src/config.ts`: change `profile.name` to a new value, add a fourth `LinkItem`, remove one existing `LinkItem`. Run `npm run build`. Open `dist/index.html` and verify: new name appears, new button is present, removed button is gone, all other content is intact.

### Implementation for User Story 2

- [X] T020 [US2] Rewrite `src/config.ts` with comprehensive inline JSDoc-style comments on every field — document character limits (name ≤80, handle ≤50, bio ≤160, title ≤60), valid URL format (`https://...`), `highlighted` usage note, `LucideIconName` list with all 16 valid values, theme color format (CSS color string), and `basePath` deploy instructions; the file must be self-explanatory so a non-technical owner can update it within 10 minutes without reading any other source file
- [X] T021 [P] [US2] Update `src/utils/config.ts` to surface validation errors with field-specific messages (e.g., `'config.profile.name is required'`) so the build fails with actionable output; add handling for the case where `config.links` is undefined (treat as empty array) and `config.socialLinks` is undefined (treat as empty array)
- [X] T022 [US2] Smoke test config customization with `npm run dev`: change `profile.name`, add one new `LinkItem` (with a valid URL and `icon: 'github'`), remove one existing link — confirm Vite HMR reflects all three changes in the browser without a full reload error

**Checkpoint**: Config changes flow through to rendered output correctly. Owner can complete a customization cycle without touching component files.

---

## Phase 5: User Story 3 — Owner Customizes Theme Colors via Config (Priority: P3)

**Goal**: The owner sets `theme` color values in `src/config.ts` and rebuilds to get a page with a custom color scheme on background, buttons, and accents.

**Independent Test**: Set `theme.primaryColor: '#3B82F6'` and `theme.backgroundColor: '#0F172A'` in `config.ts`. Run `npm run build`. Open `dist/index.html` and verify: page background is dark blue, highlighted link button has blue background, non-highlighted buttons remain unchanged by the primary color.

### Implementation for User Story 3

- [X] T023 [US3] Update `src/App.tsx` theme style mapping to cover all 7 `Theme` fields: `backgroundColor → --color-canvas`, `primaryColor → --color-primary`, `primaryHoverColor → --color-primary-hover`, `onPrimaryColor → --color-on-primary`, `surfaceColor → --color-surface-1`, `inkColor → --color-ink`, `inkMutedColor → --color-ink-muted`; skip any field that is `undefined` so CSS var inherits from `globals.css` default
- [X] T024 [P] [US3] Add stagger delay helper classes to `src/styles/globals.css` for link animation: `.animate-fade-up-delay-1` through `.animate-fade-up-delay-8` with `animation-delay` values `0.05s` through `0.40s` in 0.05s steps
- [X] T025 [US3] Smoke test theme override with `npm run dev`: set `theme.primaryColor: '#3B82F6'` and `theme.backgroundColor: '#0F172A'` in `config.ts`, verify the page background and highlighted button color update immediately in the browser; reset to default amber theme afterward

**Checkpoint**: Theme CSS vars are correctly injected from config. Default values in `globals.css` are used when `theme` fields are absent.

---

## Phase 6: User Story 4 — Owner Deploys to Free Static Hosting (Priority: P4)

**Goal**: The owner runs `npm run build` to get a self-contained `dist/` folder, then deploys to GitHub Pages, Vercel, or Netlify with no server configuration.

**Independent Test**: Run `npm run build`. Verify `dist/index.html` exists along with all referenced assets. Upload `dist/` to Vercel or Netlify drop UI. Confirm the page loads publicly and link buttons work.

### Implementation for User Story 4

- [X] T026 [US4] Finalize `package.json` scripts: `"dev": "vite"`, `"build": "tsc && vite build"`, `"preview": "vite preview"`, `"deploy": "npm run build && gh-pages -d dist"` per research.md Decision 6; confirm `gh-pages` is listed in `devDependencies`
- [X] T027 [P] [US4] Add `public/favicon.ico` (any valid 32×32 `.ico` file) and `public/og-image.jpg` (placeholder 1200×630px image) to `public/` so they are copied to `dist/` root by Vite
- [X] T028 [US4] Run `npm run build`: confirm `dist/` is generated, TypeScript emits no errors, `dist/index.html` references only relative asset paths, and all linked assets exist in `dist/assets/`
- [X] T029 [US4] Measure bundle size: run `npx vite build --reporter verbose` or inspect `dist/assets/*.js` with `gzip` to confirm the main JS chunk is under 100KB gzip; if over, audit `src/utils/icons.ts` imports to ensure Lucide tree-shaking is active (each icon imported by name, not via `import * as Icons`)

**Checkpoint**: `npm run build` succeeds with no errors and `dist/` is self-contained. `npm run preview` serves the page correctly at `http://localhost:4173`.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Utility tests, complete SEO head, accessibility audit, and final build validation

- [X] T030 [P] Write `src/utils/config.test.ts` with Vitest: test `validateConfig()` — (1) removes a `LinkItem` with `url: 'not-a-url'`, (2) keeps a `LinkItem` with `url: 'https://example.com'`, (3) preserves original order of valid links, (4) throws with field name when `profile.name` is `''`, (5) treats absent `socialLinks` as empty array
- [X] T031 [P] Write `src/utils/icons.test.ts` with Vitest: test `resolveIcon()` — (1) `resolveIcon('github')` returns the `Github` component, (2) `resolveIcon('unknown-icon')` returns the `Link` component fallback, (3) `resolveIcon('')` returns the `Link` component fallback
- [X] T032 Update `src/App.tsx` `useEffect` to set the full SEO head: `document.title = config.meta.title`, `description` meta tag, `og:title`, `og:description`, `og:image` (if `config.meta.ogImage` is set), `og:url`, `<link rel="canonical">`, and a `<script type="application/ld+json">` tag injecting a JSON-LD `Person` schema with `name`, `url`, and `image` from `config.profile` and `config.meta`
- [X] T033 [P] Add `public/robots.txt` allowing all crawlers (`User-agent: * / Allow: /`) and a `public/sitemap.xml` with a single `<loc>` entry pointing to `config.meta.siteUrl` (can be a hardcoded placeholder matching the default config value)
- [X] T034 Mobile and accessibility audit: open `npm run preview` in Chrome DevTools at 320px viewport width — verify (1) no horizontal scrollbar, (2) all `<a>` elements have `aria-label`, (3) avatar `<img>` has a non-empty `alt`, (4) all interactive elements have a visible focus ring, (5) touch target size is at least 44×44px for link buttons
- [X] T035 [P] Color contrast check: using Chrome DevTools accessibility panel or an online contrast checker, verify `#E8A020` (primary) on `#0f0d0a` (on-primary) achieves ≥4.5:1 ratio for normal text; verify `#f5f0e8` (ink) on `#080704` (canvas) achieves ≥4.5:1 ratio
- [X] T036 Final end-to-end smoke test: run `npm run build && npm run preview`; in a browser, verify the full page renders correctly at 320px and 768px — profile shows, link buttons are clickable, a highlighted button has gold/primary styling, theme CSS vars are applied, `<title>` matches `config.meta.title`, and `npm run deploy` dry-run shows `gh-pages -d dist` in the script

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — **BLOCKS all user stories**
- **US1 (Phase 3)**: Depends on Foundational — the first independently shippable increment
- **US2 (Phase 4)**: Depends on Phase 3 (config.ts exists and components are rendering)
- **US3 (Phase 5)**: Depends on Phase 3 (App.tsx theme style prop is in place)
- **US4 (Phase 6)**: Depends on Phase 3 (build must produce a working page)
- **Polish (Phase 7)**: Depends on Phases 3–6 being functionally complete

### User Story Dependencies

- **US1 (P1)**: Can start after Foundational — no dependency on other stories
- **US2 (P2)**: Depends on US1 (config.ts and components exist); adds documentation only
- **US3 (P3)**: Depends on US1 (App.tsx theme wiring exists); limited to 3 tasks
- **US4 (P4)**: Depends on US1 (a working page to build); adds build scripts

### Within Each User Story

- Models/types before components
- Components before App.tsx integration
- App.tsx before main.tsx
- Core implementation before smoke-test tasks

### Parallel Opportunities

- T002, T003, T004 can run in parallel (different config files)
- T007, T008 can run in parallel (different util files)
- T010 can run at any time during Phase 2
- T013, T014, T016 can run in parallel (independent component files)
- T021 can run in parallel during Phase 4 (different file from T020)
- T024 can run in parallel during Phase 5 (globals.css, independent of App.tsx)
- T030, T031 can run in parallel (different test files)
- T033, T035 can run in parallel (independent tasks)

---

## Parallel Example: Phase 2 Foundational

```
# Run these tasks simultaneously (independent files):
T007 → src/utils/icons.ts
T008 → src/utils/config.ts
T010 → src/assets/avatar.jpg
```

## Parallel Example: Phase 3 User Story 1

```
# Run these component tasks simultaneously (independent files):
T013 → src/components/ProfileCard.tsx
T014 → src/components/LinkButton.tsx
T016 → src/components/SocialIcons.tsx

# Then, once components exist:
T015 → src/components/LinkList.tsx  (uses LinkButton)
T017 → src/App.tsx                  (uses all components)
T018 → src/main.tsx                 (uses App)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Open the page on a mobile device — profile, links, and social icons all work
5. Optional deploy or demo at this point

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. **US1** → visitor experience works → **MVP, can demo**
3. **US2** → owner can customize config → page is personalized
4. **US3** → owner can set custom colors → full differentiation from hosted Linktree
5. **US4** → owner can deploy → product is live
6. **Polish** → tests, SEO, accessibility hardened

---

## Notes

- `[P]` tasks touch independent files — safe to implement concurrently
- `[USn]` label maps each task to its user story for traceability
- Tests are scoped to `src/utils/` only (Decision 9 in research.md)
- No test tasks in US1–US4 phases — Vitest tests are in Phase 7 (Polish)
- `src/config.ts` is the **only** file a page owner ever edits
- Commit after each task or logical group before moving to the next
- Stop at each phase checkpoint to validate the story independently
