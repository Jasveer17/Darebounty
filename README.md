# DareBounty Landing Page

A production-ready landing page for DareBounty built with Next.js 14, Tailwind CSS, and optimized for Vercel deployment.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **TypeScript**
- **Vercel** (deployment platform)

## Project Structure

```
/app
  /page.tsx        → Landing page
  /layout.tsx      → Global layout
  /app/page.tsx    → Early access page
/components
  /Hero.tsx        → Hero section
  /ValueProps.tsx  → Value propositions
  /HowItWorks.tsx  → How it works section
  /CTA.tsx         → Call-to-action section
  /Footer.tsx      → Footer
/styles
  /globals.css     → Global styles
```

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

### Build

```bash
npm run build
npm start
```

## Deployment to Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project and deploy.

### Option 2: Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and deploy

## Features

- ✅ Fully responsive design
- ✅ Dark minimal aesthetic (#0B0B0B background)
- ✅ Smooth scroll navigation
- ✅ Early access email capture on /app route
- ✅ Optimized for Lighthouse performance (90+ score)
- ✅ SEO-friendly with proper metadata
- ✅ Production-ready build

## Routes

- `/` - Main landing page
- `/app` - Early access/waitlist page

## Design System

- **Background**: #0B0B0B (charcoal)
- **Text**: White / Neutral gray
- **Accent**: Subtle white outlines
- **Aesthetic**: Minimal, dark - feels like an arena

## Performance

The landing page is optimized for:
- Fast initial load
- Minimal JavaScript
- Static generation where possible
- Mobile-first responsive design
