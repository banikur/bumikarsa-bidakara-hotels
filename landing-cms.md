# Landing Page CMS

## Goal
Build a `/admin` panel that lets the internal team switch between 4 completely different landing templates and edit all page copy — persisted to InsForge DB. The public site reads from InsForge instead of the static `home.ts` file.

---

## Architecture

```
InsForge DB: site_config (single row)
├── id              UUID PK
├── active_template "corporate" | "mice" | "cinematic" | "membership"
├── locale          "id" | "en"
├── content_id      JSONB  (mirrors home.ts shape)
├── content_en      JSONB  (mirrors home.ts shape)
└── updated_at      TIMESTAMPTZ

Auth gate: ADMIN_PASSWORD env var checked server-side in /admin layout
```

---

## Phase 1 — InsForge Schema

- [ ] **1.1** Verify linked project → `npx @insforge/cli whoami` + `npx @insforge/cli current`
- [ ] **1.2** Create `site_config` table:
  ```sql
  CREATE TABLE site_config (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    active_template TEXT NOT NULL DEFAULT 'corporate'
      CHECK (active_template IN ('corporate','mice','cinematic','membership')),
    locale TEXT NOT NULL DEFAULT 'id'
      CHECK (locale IN ('id','en')),
    content_id JSONB NOT NULL DEFAULT '{}',
    content_en JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT now()
  );
  ```
  → Verify: `npx @insforge/cli db tables` shows `site_config`
- [ ] **1.3** Seed one default row using content from `src/content/home.ts`
  → Verify: `npx @insforge/cli db query "SELECT id, active_template FROM site_config"` returns 1 row
- [ ] **1.4** Enable RLS + public read + anon write policies
  → Verify: `npx @insforge/cli db policies` shows 2 policies on `site_config`
- [ ] **1.5** Add `NEXT_PUBLIC_INSFORGE_URL` and `INSFORGE_API_KEY` to `.env.local`
  → Verify: `next dev` starts without env errors

---

## Phase 2 — Admin UI (/admin)

- [ ] **2.1** `src/app/admin/layout.tsx` — server-side password gate using `ADMIN_PASSWORD` env var + `HttpOnly` cookie via Server Action
  → Verify: `/admin` without cookie → login form; correct password → dashboard

- [ ] **2.2** `src/app/admin/page.tsx` — fetches `site_config` from InsForge, renders Template Switcher + Content Editor + Save button
  → Verify: page loads with 4 template cards, current template highlighted

- [ ] **2.3** `src/components/admin/template-switcher.tsx` — 4 visual cards (one per template), selected state with gold ring
  → Verify: clicking a card highlights it

- [ ] **2.4** `src/components/admin/content-editor.tsx` — accordion with all 7 content sections (Hero, Hotels, Experiences, Offers, Membership, Stories, Contact Teaser), controlled inputs
  → Verify: all fields editable, values update correctly

- [ ] **2.5** `POST /api/admin/save-config` route — updates `site_config` row in InsForge REST API, calls `revalidatePath('/')`
  → Verify: after save, `/` reflects new content within 1s

---

## Phase 3 — Template Components (heaviest phase)

- [ ] **3.1** `src/components/templates/template-corporate.tsx` — from `mockup/landing_corporate_standard.html`
  → Verify: visual match to mockup in browser

- [ ] **3.2** `src/components/templates/template-mice.tsx` — from `mockup/landing_professional_mice.html`
  → Verify: renders correctly

- [ ] **3.3** `src/components/templates/template-membership.tsx` — from `mockup/landing_membership_promotional.html`
  → Verify: renders correctly

- [ ] **3.4** `src/components/templates/template-cinematic.tsx` — from `mockup/landing_cinematic_luxury.html` (uses GSAP — already in package.json)
  → Verify: scroll animations work

- [ ] **3.5** `src/components/templates/index.ts` — export map { corporate, mice, membership, cinematic }
  → Verify: import resolves correctly in page.tsx

---

## Phase 4 — Public Site Hydration

- [ ] **4.1** `src/lib/insforge.ts` — `getSiteConfig()` helper fetching InsForge REST with `{ next: { revalidate: 60 } }`
  → Verify: returns valid `site_config` row

- [ ] **4.2** Refactor `src/app/page.tsx` — replace `homeCopy` static import with `getSiteConfig()`, resolve `TEMPLATES[config.active_template]` and render it
  → Verify: `/` shows the template + copy saved in DB

- [ ] **4.3** Document `ADMIN_PASSWORD` + InsForge env vars in `README.md`
  → Verify: README has setup section with all env vars listed

---

## Done When

- [ ] `/admin` is password-protected, shows all 4 templates and all content fields
- [ ] Saving in admin switches the live `/` to the chosen template + edited copy
- [ ] All 4 templates render as React components visually matching the HTML mockups
- [ ] InsForge `site_config` is the single source of truth
- [ ] `ADMIN_PASSWORD` env var is the only auth mechanism

---

## Notes

- **Conversion order**: `corporate` → `mice` → `membership` → `cinematic` (by complexity)
- **Cinematic GSAP**: already in `package.json` — use from mockup as-is
- **Content shape**: exactly mirrors `src/content/home.ts` — no new types needed, save/load as JSONB
- **InsForge write**: use native REST API with `api_key` as `apikey` header — no SDK needed for a single table
- **Admin UI**: keep it minimal/dark, functional — internal tool only
