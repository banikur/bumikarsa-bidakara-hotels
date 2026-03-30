# Bumikarsa Bidakara Hotels - Landing Page CMS

This is a production-ready, enterprise-grade landing page and CMS for Bumikarsa Bidakara Hotels, built with Next.js, React, and InsForge Database.

This project was evolved from a static MVP to a fully dynamic platform allowing non-technical admins to update the landing page visually through a streamlined, integrated CMS dashboard without requiring manual code deployments.

## Features

- **Four Premium Templates:** Includes four specialized aesthetics seamlessly selectable via the CMS:
  - **Warm Earthy:** Editorial serif style with rich tones.
  - **Cinematic Luxury:** Dark mode elegance with GSAP animations.
  - **Membership Promo:** Gold/Navy promo focused on club tiers.
  - **MICE Professional:** Corporate style built for venue specifications.
- **Integrated Admin Dashboard:** Fully custom content management system available at `/admin`.
  - Section-based UI for Hero, Properties, Features, Offers, Membership, and Contact sections.
  - Image URL based management with built-in live preview.
- **Universal Content Schema:** A strongly-typed `UniversalContent` structure powering all 4 templates with a single source of truth.
- **Bilingual Support:** Ready for ID and EN translations managed separately in the same dashboard.
- **Incremental Static Regeneration (ISR):** Zero-millisecond load times for the public site, with cache completely invalidated upon "Save Changes" via Server Actions.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** CSS-in-JS & Vanilla CSS
- **Database:** InsForge SDK / PostgreSQL
- **Deployment:** Vercel

## Getting Started

### Prerequisites

You need an InsForge database setup with the following table:

```sql
CREATE TABLE IF NOT EXISTS site_config (
  id UUId PRIMARY KEY DEFAULT gen_random_uuid(),
  active_template VARCHAR(32) NOT NULL DEFAULT 'warm-earthy',
  content_id JSONB NOT NULL,
  content_en JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### Environment Variables

Create a `.env.local` file in the root directory and configure the following variables:

```env
NEXT_PUBLIC_INSFORGE_URL=your-insforge-url
INSFORGE_API_KEY=your-insforge-api-key
ADMIN_PASSWORD=your-secure-admin-password
```

### Running Locally

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the public landing page.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the CMS Dashboard (login using the `ADMIN_PASSWORD` defined in `.env.local`).

## Usage

1. **Dashboard Overview:** Navigate to `/admin`.
2. **Template Selection:** Go to the "Active Template" section globally to switch the public visual skin.
3. **Editing Content:** Click through the sections (Hero, Properties, etc.) to configure textual content and image URLs.
4. **Publishing:** Click "Save Changes" on the top right. Changes are immediately deployed to the public site via Next.js `revalidatePath`.

## Deploy on Vercel

This app is optimized for Vercel deployment. 

1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Add the Environment Variables (`NEXT_PUBLIC_INSFORGE_URL`, `INSFORGE_API_KEY`, `ADMIN_PASSWORD`) into your Vercel project settings.
4. Deploy the project. The ISR caching configured in `app/page.tsx` mixed with the `update-site-config.ts` action ensures near-instant regeneration on Vercel Edge networks upon every CMS edit.

---

*Developed for Bumikarsa Bidakara Hotels Management.*
