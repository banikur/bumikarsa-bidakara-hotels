# CMS Build Plan — Bumikarsa Bidakara Landing Page
**For:** AI Coding Agent Execution  
**Stack:** Next.js App Router · InsForge DB (demo) → MySQL (production)  
**Status:** MVP done. Code exists. CMS section needs to be built from scratch.

---

## Context & Constraints

- The landing page already has **4 visual templates** (Warm Earthy, Cinematic, Membership, MICE)
- All 4 templates consume the **same Universal Content Schema** — no per-template fields
- The DB currently has one table: `site_config` with a JSON content column
- The CMS is accessed by **non-technical clients** — no raw JSON editing
- Bilingual support: **Bahasa Indonesia** (`content_id`) and **English** (`content_en`)
- One template must **always be active** (`active_template`). Changing it auto-adapts the public landing page
- Image strategy: **URL string only** (no file upload). Client pastes image URLs

---

## Universal Content Schema (Source of Truth)

Define this first in `src/types/cms.types.ts`. All components, forms, and DB reads/writes must reference this type.

```typescript
// src/types/cms.types.ts

export type TemplateId = 'warm-earthy' | 'cinematic' | 'membership' | 'mice'

export interface HeroContent {
  headline: string
  subtitle: string
  description: string
  cta_primary: string
  cta_secondary: string
  background_image_url: string
}

export interface PropertyItem {
  id: string           // uuid or nanoid — required for list keying
  name: string
  location: string
  abstract: string
  image_url: string
}

export interface FeatureItem {
  id: string
  title: string
  description: string
  capacity?: number    // used by MICE template only
  image_url: string
}

export interface OfferItem {
  id: string
  title: string
  subtitle: string
  badge?: string
  image_url: string
}

export interface MembershipTier {
  id: string
  name: string
  benefits: string[]   // simple string array
}

export interface MembershipContent {
  headline: string
  description: string
  tiers: MembershipTier[]
}

export interface ContactContent {
  phone: string
  email: string
  address: string
  maps_url: string
  footer_tagline: string
}

export interface UniversalContent {
  hero: HeroContent
  properties: PropertyItem[]
  features: FeatureItem[]
  offers: OfferItem[]
  membership: MembershipContent
  contact: ContactContent
}

export interface SiteConfig {
  id: number
  active_template: TemplateId
  content_id: UniversalContent   // Bahasa Indonesia
  content_en: UniversalContent   // English
  updated_at: string
}
```

---

## DB Schema (site_config table)

The existing `site_config` table must have this structure. **Run migration if columns are missing.**

```sql
CREATE TABLE IF NOT EXISTS site_config (
  id            INT PRIMARY KEY DEFAULT 1,
  active_template VARCHAR(32) NOT NULL DEFAULT 'warm-earthy',
  content_id    JSON NOT NULL,
  content_en    JSON NOT NULL,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Enforce single-row constraint
-- Only row with id=1 is ever used
```

Default seed data must be inserted if the row does not exist. The agent must include a seed SQL file or a `ensureSiteConfig()` utility that inserts a default row on first load.

---

## File Structure to Create

Only create files listed here. Do not modify existing template files unless explicitly stated.

```
src/
├── types/
│   └── cms.types.ts                        ← Step 1: Define first
│
├── lib/
│   ├── db.ts                               ← DB connection (already exists or create)
│   ├── get-site-config.ts                  ← Server-side fetch utility
│   └── default-content.ts                  ← Default/fallback UniversalContent object
│
├── app/
│   ├── page.tsx                            ← Step 4: Refactor for dynamic hydration
│   └── actions/
│       └── update-site-config.ts           ← Step 3: Server Action
│
└── components/
    ├── admin/
    │   ├── admin-panel.tsx                 ← Step 2: Full refactor (main CMS UI)
    │   ├── cms-header.tsx                  ← Sticky header: lang toggle + save button
    │   └── sections/
    │       ├── hero-section.tsx
    │       ├── properties-section.tsx
    │       ├── features-section.tsx
    │       ├── offers-section.tsx
    │       ├── membership-section.tsx
    │       └── contact-section.tsx
    └── ui/
        ├── list-editor.tsx                 ← Reusable: Add/Edit/Remove items in an array
        ├── image-url-input.tsx             ← Input + live preview thumbnail
        └── toast.tsx                       ← Success/error notification
```

---

## Step-by-Step Execution

### Step 0 — Types & Default Content

**0a.** Create `src/types/cms.types.ts` with the exact schema above.

**0b.** Create `src/lib/default-content.ts`:
- Export a `DEFAULT_CONTENT: UniversalContent` object
- All string fields default to empty string `""`
- All array fields default to `[]`
- This is used as fallback if DB row is missing or fields are null

---

### Step 1 — Reusable UI Primitives

Build these before the CMS sections. Sections depend on them.

**1a. `src/components/ui/list-editor.tsx`**

Props interface:
```typescript
interface ListEditorProps<T extends { id: string }> {
  items: T[]
  onAdd: () => void        // adds a blank item with generated id
  onUpdate: (id: string, updated: Partial<T>) => void
  onRemove: (id: string) => void
  renderItem: (item: T, handlers: { onUpdate, onRemove }) => React.ReactNode
}
```
- Renders items in order
- "Add Item" button at bottom
- No drag-drop needed for v1

**1b. `src/components/ui/image-url-input.tsx`**

Props: `{ value: string, onChange: (url: string) => void, label?: string }`
- Standard text input for the URL
- Below the input, render `<img src={value} />` as a small preview (max-height: 80px)
- If URL is empty or invalid, show a grey placeholder box instead

**1c. `src/components/ui/toast.tsx`**

Props: `{ message: string, type: 'success' | 'error', onDismiss: () => void }`
- Fixed position: bottom-right
- Auto-dismiss after 3 seconds
- Green for success, red for error

---

### Step 2 — CMS Admin Panel Refactor

**2a. `src/components/admin/cms-header.tsx`**

- Sticky top bar (position: fixed or sticky, z-index high)
- Left side: App name / logo text
- Right side:
  - Language toggle: Two buttons `[ID]` `[EN]`, one active at a time. Active = filled style, inactive = outline.
  - "Save Changes" button:
    - Default state: grey/disabled appearance, label "Saved"
    - When `hasUnsavedChanges === true`: blue/primary appearance, label "Save Changes"
    - On click: calls the save handler passed via props

Props:
```typescript
interface CmsHeaderProps {
  language: 'id' | 'en'
  onLanguageChange: (lang: 'id' | 'en') => void
  hasUnsavedChanges: boolean
  onSave: () => void
  isSaving: boolean
}
```

**2b. `src/components/admin/admin-panel.tsx`** — Full refactor

This is the main CMS shell. Replace existing recursive JSON tree editor entirely.

State to manage:
```typescript
const [language, setLanguage] = useState<'id' | 'en'>('id')
const [activeSection, setActiveSection] = useState<string>('hero')
const [activeTemplate, setActiveTemplate] = useState<TemplateId>(initialConfig.active_template)
const [contentId, setContentId] = useState<UniversalContent>(initialConfig.content_id)
const [contentEn, setContentEn] = useState<UniversalContent>(initialConfig.content_en)
const [savedSnapshot, setSavedSnapshot] = useState<string>(JSON.stringify(initialConfig))
const [isSaving, setIsSaving] = useState(false)
const [toast, setToast] = useState<{ message: string, type: 'success'|'error' } | null>(null)
```

`hasUnsavedChanges` is derived:
```typescript
const hasUnsavedChanges = JSON.stringify({ activeTemplate, contentId, contentEn }) !== savedSnapshot
```

Current content (whichever lang is active):
```typescript
const currentContent = language === 'id' ? contentId : contentEn
const setCurrentContent = language === 'id' ? setContentId : setContentEn
```

Layout:
- Left sidebar: vertical nav list of section names
  - `Hero`, `Properties`, `Features`, `Offers`, `Membership`, `Contact`
  - Separator, then: `Template` (template switcher section)
- Right main area: renders the active section form
- `<CmsHeader />` pinned at top

**2c. Template Switcher (inside admin-panel, section = "template")**

- Label: "Active Template"
- Render 4 cards (one per template): `warm-earthy`, `cinematic`, `membership`, `mice`
- Each card shows the template name and a short description
- Selected card has a visible border/highlight
- Changing selection updates `activeTemplate` state immediately (does not save to DB until Save is clicked)

**2d. Section Forms** — one file per section

Each section form receives:
```typescript
interface SectionFormProps {
  content: UniversalContent  // full content object for active language
  onChange: (updated: UniversalContent) => void
}
```

Each form updates only its relevant slice and calls `onChange` with the full updated object.

`hero-section.tsx` — fields: headline, subtitle, description, cta_primary, cta_secondary, background_image_url (use ImageUrlInput)

`properties-section.tsx` — ListEditor of PropertyItem. Each item: name, location, abstract, image_url

`features-section.tsx` — ListEditor of FeatureItem. Each item: title, description, capacity (number input, optional), image_url

`offers-section.tsx` — ListEditor of OfferItem. Each item: title, subtitle, badge (optional), image_url

`membership-section.tsx`:
- Top fields: headline, description (both plain text inputs)
- ListEditor of MembershipTier
- Each tier: name (text input) + benefits (a textarea, newline-separated, split on save to string[])

`contact-section.tsx` — fields: phone, email, address, maps_url, footer_tagline

---

### Step 3 — Server Action

**`src/app/actions/update-site-config.ts`**

```typescript
'use server'
import { revalidatePath } from 'next/cache'

export async function updateSiteConfig(payload: {
  active_template: TemplateId
  content_id: UniversalContent
  content_en: UniversalContent
}): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Validate payload is not empty / malformed
    // 2. UPDATE site_config SET ... WHERE id = 1
    // 3. revalidatePath('/') — invalidate public landing page cache
    // 4. Return { success: true }
  } catch (err) {
    return { success: false, error: String(err) }
  }
}
```

The admin panel calls this on Save. On success: update `savedSnapshot`, show success toast. On error: show error toast, do not update snapshot.

---

### Step 4 — Public Page Hydration

**`src/app/page.tsx`** — refactor to async server component

```typescript
// Add ISR revalidation
export const revalidate = false // Only rebuild on-demand via revalidatePath

export default async function HomePage() {
  const config = await getSiteConfig()  // fetch from DB
  const content = config.content_id     // default to ID language

  const TEMPLATE_MAP: Record<TemplateId, React.ComponentType<{ copy: UniversalContent }>> = {
    'warm-earthy': TemplateWarmEarthy,
    'cinematic':   TemplateCinematic,
    'membership':  TemplateMembership,
    'mice':        TemplateMice,
  }

  const ActiveTemplate = TEMPLATE_MAP[config.active_template]
  return <ActiveTemplate copy={content} />
}
```

`src/lib/get-site-config.ts`:
- Fetches row `WHERE id = 1` from `site_config`
- If row not found: insert default row using `DEFAULT_CONTENT` and return it
- Parse `content_id` and `content_en` JSON columns
- Return typed `SiteConfig` object

---

### Step 5 — End-to-End Testing Checklist

The agent must verify each item manually or via console log before marking done:

- [ ] Admin panel loads without crash when DB fields are empty/null
- [ ] Switching language toggle changes form values (not just label)
- [ ] Adding/removing items in ListEditor updates state correctly
- [ ] Template switcher highlights selected template
- [ ] Save button is grey when no changes, blue when there are changes
- [ ] Clicking Save calls server action and shows toast
- [ ] After Save, public `page.tsx` reflects new content (ISR revalidated)
- [ ] Changing `active_template` in CMS and saving changes the rendered template on the public page

---

## Rules for the Agent

1. **Never modify existing template component files** unless a prop signature change is explicitly required by Step 4
2. **Always use `UniversalContent` type** — never use `any` or raw `object` for content
3. **All array items must have an `id` field** — use `crypto.randomUUID()` or `nanoid()` when creating new items
4. **Forms must not crash on empty/null data** — always merge with `DEFAULT_CONTENT` before rendering
5. **No file upload logic** — images are URL strings only
6. **No authentication** — out of scope for this build phase
7. Complete steps in order: 0 → 1 → 2 → 3 → 4 → 5. Do not skip ahead.