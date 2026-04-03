# Bumikarsa Bidakara Hotels - Project Context

## Project Overview

A **Next.js 16** hotel management website for Bumikarsa Bidakara Hotels, featuring a multi-template landing page system with CMS capabilities powered by **InsForge DB**. The project showcases Indonesian hospitality with a focus on business travel, MICE (Meetings, Incentives, Conferences, Exhibitions), weddings, dining, and wellness experiences across three locations: Jakarta, Bandung, and Yogyakarta.

### Core Features

- **Multi-template landing system**: 4 interchangeable landing page templates (Warm Earthy, Cinematic, Membership, MICE)
- **CMS Admin Panel**: Password-protected `/admin` route for template switching and content editing
- **Bilingual support**: Indonesian (id) and English (en) locales via custom context
- **Dynamic content**: Site content persisted to InsForge DB with on-demand revalidation
- **Premium UI**: Dark luxury theme with gold/emerald accents, smooth scroll animations, and responsive design

### Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16.1.6 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19.2.3 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion 12, GSAP 3 |
| CMS/DB | InsForge (PostgreSQL with JSONB) |
| i18n | react-i18next, next-i18next |
| UI Components | Radix UI primitives |
| Linting | ESLint 9 with Next.js configs |

---

## Project Structure

```
bumikarsa-bidakara-hotels/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/              # CMS admin panel (password-protected)
│   │   ├── contact/            # Contact page
│   │   ├── experiences/        # Experiences section
│   │   ├── membership/         # Membership program
│   │   ├── offers/             # Special offers
│   │   ├── our-hotels/         # Hotel listings
│   │   ├── stories/            # Blog/journal stories
│   │   ├── globals.css         # Global styles & Tailwind
│   │   ├── layout.tsx          # Root layout with providers
│   │   └── page.tsx            # Home page (template resolver)
│   ├── components/
│   │   ├── admin/              # Admin panel components
│   │   ├── booking/            # Booking-related components
│   │   ├── cards/              # Card components (HotelCard3D, ExperienceCard, etc.)
│   │   ├── discovery/          # Discovery UI components
│   │   ├── forms/              # Form components
│   │   ├── home/               # Home page sections
│   │   ├── layout/             # Layout components (Navbar, Footer, Container)
│   │   ├── motion/             # Animation wrappers (AnimatedReveal, etc.)
│   │   ├── scroll/             # Scroll effects (ScrollProgressRing, ScrollOverlayRoot)
│   │   ├── shared/             # Shared UI components
│   │   ├── templates/          # Landing page templates
│   │   │   ├── template-warm-earthy.tsx
│   │   │   ├── template-cinematic.tsx   # Uses GSAP animations
│   │   │   ├── template-membership.tsx
│   │   │   ├── template-mice.tsx
│   │   │   └── index.ts        # Template export map
│   │   └── ui/                 # Base UI components
│   ├── content/
│   │   └── home.ts             # Static content shape & bilingual copy
│   ├── contexts/
│   │   └── locale-context.tsx  # Locale provider & hook
│   ├── lib/
│   │   └── insforge.ts         # InsForge client initialization
│   └── types/                  # TypeScript type definitions
├── mockup/                     # HTML mockups for template reference
├── public/                     # Static assets
├── scripts/
│   └── seed-site-config.mjs    # Database seeding script
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── eslint.config.mjs
```

---

## Building and Running

### Prerequisites

- Node.js 20+
- InsForge project credentials

### Environment Variables

Create `.env.local`:

```env
# InsForge CMS
NEXT_PUBLIC_INSFORGE_URL=https://your-project.insforge.app
NEXT_PUBLIC_INSFORGE_KEY=your_anon_key
INSFORGE_API_KEY=your_api_key

# Admin Authentication
ADMIN_PASSWORD=your_secure_password
```

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Production

```bash
# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

### Database Seeding

```bash
# Seed initial site_config to InsForge
node scripts/seed-site-config.mjs
```

---

## Key Architecture Patterns

### Template System

The home page dynamically resolves templates based on `active_template` from InsForge:

```typescript
// src/components/templates/index.ts
export const TEMPLATE_MAP: Record<TemplateId, ComponentType<{ copy: HomeCopy }>> = {
  warm_earthy: TemplateWarmEarthy,
  cinematic: TemplateCinematic,
  membership: TemplateMembership,
  mice: TemplateMice,
  corporate: TemplateWarmEarthy, // Fallback
};
```

### InsForge Database Schema

```sql
CREATE TABLE site_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  active_template TEXT NOT NULL DEFAULT 'warm_earthy'
    CHECK (active_template IN ('warm_earthy','cinematic','membership','mice','corporate')),
  locale TEXT NOT NULL DEFAULT 'id'
    CHECK (locale IN ('id','en')),
  content_id JSONB NOT NULL DEFAULT '{}',
  content_en JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### Content Shape

All templates receive a `copy` prop matching this structure:

```typescript
type HomeCopy = {
  hero: { title: string; subtitle: string; description: string; localeLabel: string };
  hotels: { heading: string; description: string; items: HotelContent[] };
  experiences: { heading: string; description: string; items: ExperienceContent[] };
  offers: { heading: string; description: string; highlights: OfferContent[] };
  membership: { heading: string; description: string; content: MembershipContent };
  stories: { heading: string; description: string; items: StoryContent[] };
  contactTeaser: { title: string; description: string; primaryCta: string; secondaryCta: string };
};
```

### Admin Authentication

The `/admin` route uses HttpOnly cookies with server-side password verification:

```typescript
// src/app/admin/page.tsx
if (pw === process.env.ADMIN_PASSWORD) {
  const cs = await cookies();
  cs.set("admin_session", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
}
```

---

## Development Conventions

### Code Style

- **TypeScript**: Strict mode enabled, no implicit any
- **ESLint**: Next.js recommended config with TypeScript extensions
- **Formatting**: Follow existing patterns (2-space indentation, semicolons, double quotes)
- **Component naming**: PascalCase for components, kebab-case for files

### Component Patterns

1. **Server vs Client Components**: 
   - Use `"use client"` directive only when hooks/event listeners are needed
   - Admin page is server component; templates are client components

2. **Styling**:
   - Tailwind CSS v4 with inline `@theme` declarations
   - Custom CSS variables for theme colors in `globals.css`
   - Inline styles for dynamic values in templates

3. **Animations**:
   - Framer Motion for standard animations
   - GSAP for cinematic template scroll effects
   - Custom scroll listeners for navbar transitions

### Testing Practices

- No test framework currently configured
- Manual verification via template visual match to HTML mockups
- Admin panel tested via password gate and save functionality

---

## Important Files Reference

| File | Purpose |
|------|---------|
| `src/content/home.ts` | Bilingual content definitions (id/en) |
| `src/components/templates/index.ts` | Template registry and type definitions |
| `src/lib/insforge.ts` | InsForge database client |
| `src/app/admin/page.tsx` | Admin panel with auth gate |
| `scripts/seed-site-config.mjs` | Initial database seeding |
| `landing-cms.md` | CMS implementation roadmap |

---

## Common Tasks

### Adding a New Template

1. Create `src/components/templates/template-{name}.tsx`
2. Export component with `{ copy: HomeCopy }` prop signature
3. Add to `TEMPLATE_MAP` in `src/components/templates/index.ts`
4. Add template ID to `TemplateId` type
5. Update InsForge schema CHECK constraint

### Editing Content

1. Access `/admin` with `ADMIN_PASSWORD`
2. Use content editor accordion to modify fields
3. Save triggers `revalidatePath('/')` for instant update

### Changing Active Template

1. Navigate to `/admin`
2. Click desired template card in Template Switcher
3. Click Save to persist to InsForge

---

## Notes

- **Cinematic template** uses GSAP - ensure `gsap` package is available
- **Template images** loaded from Unsplash URLs (hotlinking)
- **Footer** is shared across all templates via main layout
- **Navbar** is fixed with scroll-based background transition
- **Locale context** defaults to Indonesian (`id`)
- **InsForge SDK** used for database operations with REST API fallback

## Qwen Added Memories
- Bumikarsa Bidakara Hotels is a Next.js 16 hotel management website with multi-template landing system (Warm Earthy, Cinematic, Membership, MICE, Corporate), CMS admin panel at /admin powered by InsForge DB (PostgreSQL with JSONB), bilingual support (ID/EN), and dynamic content persistence. The project uses Tailwind CSS 4, Framer Motion 12, GSAP 3, and Radix UI.
- Project uses UniversalContent schema with: hero, properties[], features[], offers[], membership{headline, description, tiers[]}, contact{}, pages{ourHotels, experiences, offers, membership, stories, contact - each with title/description}. TemplateId type includes: warm-earthy, cinematic, membership, mice, corporate. Database uses UUID for site_config.id, queries use .limit(1) instead of .eq("id", 1).
- All 9 sub-pages (/contact, /our-hotels, /our-hotels/[slug], /experiences, /experiences/[type], /offers, /membership, /stories, /stories/[slug]) are server components that fetch from CMS via getSiteConfig() and use TemplatePageLayout wrapper for template-specific styling. Shared navbar in layout.tsx is used across all templates (template-specific navbars removed). Admin panel has sections: Hero, Properties, Features, Offers, Membership, Contact, Page Headers, Template Switcher.
- Security: updateSiteConfig server action has admin_session cookie verification. RLS policy allows public read only, writes controlled at app level. Admin cookie has sameSite: "lax". Logout via /api/logout endpoint. Error boundaries: error.tsx (route-level), global-error.tsx (root-level). Security headers in next.config.ts: X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, XSS-Protection 1; mode=block, Permissions-Policy camera/microphone/geolocation disabled.
- Key files: src/app/page.tsx (home template resolver), src/app/admin/page.tsx (CMS with password gate), src/lib/get-site-config.ts (DB fetch with deepMerge fallback), src/lib/default-content.ts (real fallback content), src/lib/get-active-template.ts (helper), src/components/templates/template-page-layout.tsx (isolated page mode wrapper), src/components/templates/index.ts (template registry), src/components/layout/navbar.tsx (shared mobile-responsive navbar), src/components/admin/admin-panel.tsx (main CMS shell), scripts/seed-site-config.mjs (database seeding with UUID generation).
- Environment variables required: NEXT_PUBLIC_INSFORGE_URL, NEXT_PUBLIC_INSFORGE_KEY, INSFORGE_API_KEY, ADMIN_PASSWORD. Seed script uses hardcoded credentials for demo InsForge instance. DEFAULT_CONTENT has real fallback data (not empty strings) so site renders even if DB is unreachable. Build passes cleanly with 12 routes (6 static, 6 dynamic).
