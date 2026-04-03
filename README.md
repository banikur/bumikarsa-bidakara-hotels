# Bumikarsa Bidakara Hotels - Landing Page CMS

A production-ready, enterprise-grade landing page and CMS for Bumikarsa Bidakara Hotels, built with Next.js 16, React, and InsForge Database.

## Features

- **Five Premium Templates:** Warm Earthy, Cinematic Luxury, Membership Promo, MICE Professional, and Corporate — all seamlessly selectable via the CMS.
- **Integrated Admin Dashboard:** Password-protected CMS at `/admin` with sections for Hero, Properties, Features, Offers, Membership, Contact, Page Headers, and Template Switcher.
- **Universal Content Schema:** Strongly-typed `UniversalContent` structure powering all templates with a single source of truth.
- **Bilingual Support:** Indonesian (ID) and English (EN) translations managed in the same dashboard.
- **Template-Aware Sub-Pages:** All 9 sub-pages (`/contact`, `/our-hotels`, `/experiences`, `/offers`, `/membership`, `/stories`, and their dynamic routes) inherit the active template's visual style.
- **Incremental Static Regeneration (ISR):** Zero-millisecond load times, with cache invalidated on "Save Changes" via Server Actions.
- **Mobile-Responsive Navbar:** Shared navigation with hamburger menu for mobile devices.
- **Security:** Authenticated server actions, CSRF protection, RLS policies, error boundaries, and security headers.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion 12, GSAP 3
- **Database:** InsForge SDK / PostgreSQL (JSONB)
- **UI Components:** Radix UI primitives
- **i18n:** react-i18next

## Getting Started

### Prerequisites

- Node.js 20+
- InsForge database with `site_config` table

### Database Setup

```sql
CREATE TABLE IF NOT EXISTS site_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  active_template TEXT NOT NULL DEFAULT 'warm_earthy',
  locale TEXT NOT NULL DEFAULT 'id',
  content_id JSONB NOT NULL DEFAULT '{}'::jsonb,
  content_en JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON site_config FOR SELECT USING (true);
```

### Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_INSFORGE_URL=https://your-project.insforge.app
NEXT_PUBLIC_INSFORGE_KEY=your_anon_key
INSFORGE_API_KEY=your_api_key
ADMIN_PASSWORD=your_secure_password
```

### Seed Database

```bash
node scripts/seed-site-config.mjs
```

### Run Development Server

```bash
npm install
npm run dev
```

- Public site: http://localhost:3000
- Admin CMS: http://localhost:3000/admin

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── admin/              # CMS admin panel (password-protected)
│   ├── api/logout/         # Logout endpoint
│   ├── contact/            # Contact page (server component + CMS)
│   ├── experiences/        # Experiences page + [type] dynamic
│   ├── membership/         # Membership page (server component + CMS)
│   ├── offers/             # Offers page (server component + CMS)
│   ├── our-hotels/         # Hotels page + [slug] dynamic
│   ├── stories/            # Stories page + [slug] dynamic
│   ├── page.tsx            # Home page (template resolver)
│   ├── layout.tsx          # Root layout with shared navbar
│   ├── error.tsx           # Route-level error boundary
│   └── global-error.tsx    # Root-level error boundary
├── components/
│   ├── admin/              # CMS components (admin-panel, sections)
│   ├── templates/          # Template components + page layout wrapper
│   ├── layout/             # Shared navbar, container, page section
│   └── ui/                 # Base UI components
├── lib/
│   ├── insforge.ts         # InsForge client
│   ├── get-site-config.ts  # CMS data fetch with fallback
│   ├── get-active-template.ts  # Active template helper
│   └── default-content.ts  # Real fallback content
├── types/
│   └── cms.types.ts        # UniversalContent schema definitions
└── content/
    └── home.ts             # Static content shape (legacy reference)
```

## Content Schema

```typescript
UniversalContent {
  hero: { headline, subtitle, description, cta_primary, cta_secondary, background_image_url }
  properties: [{ id, name, location, abstract, image_url }]
  features: [{ id, title, description, capacity?, image_url }]
  offers: [{ id, title, subtitle, badge?, image_url }]
  membership: { headline, description, tiers: [{ id, name, benefits: [] }] }
  contact: { phone, email, address, maps_url, footer_tagline }
  pages: {
    ourHotels, experiences, offers, membership, stories, contact
    // Each: { title, description }
  }
}
```

## Admin Sections

| Section | Purpose |
|---------|---------|
| Hero | Main landing headline, subtitle, CTAs, background image |
| Properties | Hotel listings (name, location, abstract, image) |
| Features | Amenities/experiences (title, description, capacity, image) |
| Offers | Special packages (title, subtitle, badge, image) |
| Membership | Club tiers (headline, description, tier names + benefits) |
| Contact | Phone, email, address, maps URL, footer tagline |
| Page Headers | Sub-page titles and descriptions (bilingual) |
| Template | Switch active template (warm-earthy, cinematic, membership, mice, corporate) |

## Security

- Admin authentication via `ADMIN_PASSWORD` env var with HttpOnly cookie
- Server action authentication check on `updateSiteConfig`
- CSRF protection via `sameSite: "lax"` cookie attribute
- RLS policy allows public read only; writes controlled at application level
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, XSS-Protection, Permissions-Policy
- Error boundaries for graceful fallback

## Deployment

Optimized for Vercel:
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

---

*Developed for Bumikarsa Bidakara Hotels Management.*
