# Roamly — Community Tourist Assistant

A crowd-sourced tourist information platform built with Next.js, Supabase, and Tailwind CSS.
Members of the public can discover, contribute, and review local tourist destinations — from
heritage sites and beaches to nightlife and dining.

---

## Live Demo

https://roamly-app-ebhg.vercel.app/

---

## Features

- **Browse** — Publicly accessible directory of approved tourist assets
- **Search & Filter** — Search by keyword and filter by category (Heritage, Beach, Park, etc.)
- **Map View** — Interactive Leaflet.js map showing asset locations with clickable markers
- **Asset Detail** — Full description, location, category, and user reviews per asset
- **Star Ratings** — Authenticated users can leave 1–5 star ratings and written reviews
- **Submit Places** — Registered users can contribute new tourist assets
- **Gamification** — Contributors earn +10 points per approved submission
- **Admin Moderation** — Administrators can approve or reject pending submissions
- **Authentication** — Email/password registration and login via Supabase Auth

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack React framework (App Router, SSR) |
| Supabase | PostgreSQL database, authentication, REST API, RLS |
| Tailwind CSS | Utility-first CSS framework for responsive UI |
| TypeScript | Static typing for maintainability |
| Leaflet.js | Open-source interactive map |
| Jest | Unit and integration testing |
| React Testing Library | Component testing utilities |
| Vercel | Deployment and CDN hosting |

---

## Database Schema

profiles        (id, username, role, points, created_at)
categories      (id, name, icon)
assets          (id, title, description, category_id, location,
                 image_url, lat, lng, status, submitted_by, created_at)
ratings         (id, asset_id, user_id, score, comment, created_at)

Asset status values: pending → approved / rejected
User roles: contributor (default) / admin

---

## Getting Started

### Prerequisites

- Node.js v18 or later
- Git
- A free Supabase account
- A free Vercel account (for deployment)

### Installation

1. Clone the repository

   git clone https://github.com/lazr07/roamly-app.git
   cd roamly-app

2. Install dependencies

   npm install

3. Set up environment variables

   Create a .env.local file in the root directory:

   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key

   Find these values in your Supabase dashboard under:
   Project Settings → Data API

4. Set up the database

   Copy the full SQL schema from /docs/schema.sql and run it in your
   Supabase dashboard under SQL Editor → New Query.

5. Run the development server

   npm run dev

6. Open the app

   Visit http://localhost:3000

---

## Setting Up an Admin Account

1. Register a new account on the platform
2. Go to Supabase dashboard → Table Editor → profiles
3. Find your user row and change role from contributor to admin
4. You now have access to the /admin moderation panel

---

## Testing

Run the full test suite:

   npm test

Test Coverage:

   ratingUtils.test.ts              Unit         Average rating calculation logic
   StarRating.test.tsx              Unit         Star component renders and fires correct score
   AssetCard.test.tsx               Unit         Card renders title, location, category, rating
   CategoryFilter.test.tsx          Unit         Filter buttons render and trigger onChange
   integration/submitFlow.test.tsx  Integration  Submit form renders fields for auth user

Run a specific test file:

   npx jest ratingUtils
   npx jest __tests__/integration

---

## Project Structure

roamly-app/
├── app/
│   ├── page.tsx                  Homepage — browse and search assets
│   ├── layout.tsx                Root layout with Navbar
│   ├── assets/[id]/page.tsx      Asset detail page with reviews
│   ├── submit/page.tsx           Submit new place (protected)
│   ├── admin/page.tsx            Admin moderation panel
│   └── auth/                     Supabase auth routes
├── components/
│   ├── Navbar.tsx                Top navigation bar
│   ├── AssetCard.tsx             Tourist asset card component
│   ├── AssetMap.tsx              Leaflet.js interactive map
│   ├── CategoryFilter.tsx        Category filter pill buttons
│   └── StarRating.tsx            Interactive star rating input
├── lib/
│   └── supabase/
│       ├── client.ts             Supabase browser client
│       └── server.ts             Supabase server client
├── __tests__/
│   ├── ratingUtils.test.ts
│   ├── AssetCard.test.tsx
│   ├── StarRating.test.tsx
│   ├── CategoryFilter.test.tsx
│   └── integration/
│       └── submitFlow.test.tsx
├── .env.local                    Environment variables (not committed)
├── .env.example                  Environment variable template
├── next.config.ts                Next.js configuration
├── tailwind.config.ts            Tailwind CSS configuration
└── README.md

---

## 🗺️ Map Feature

The map view uses Leaflet.js with OpenStreetMap tiles (free and open source).
To make a submitted place appear on the map, provide latitude and longitude
coordinates in the submit form.

How to find coordinates:
1. Go to Google Maps (https://maps.google.com)
2. Right-click the exact location on the map
3. The first item shown is the coordinates — click to copy
4. First number = Latitude, second = Longitude

---

## 🚢 Deployment

The app deploys automatically to Vercel on every push to the main branch.

Manual deployment:
   npx vercel --prod

Environment variables to add in Vercel Dashboard → Settings → Environment Variables:
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

---

## 🔄 Development Workflow

Start a new feature:
   git checkout -b feature/your-feature-name

Commit your work:
   git add .
   git commit -m "feat: description of what you built"

Push and open a pull request:
   git push origin feature/your-feature-name

Commit Convention:
   feat:   New feature
   fix:    Bug fix
   docs:   Documentation changes
   test:   Adding or updating tests
   style:  UI/styling changes
   chore:  Config or setup tasks

---

## 📋 Agile Sprints

   Sprint 1 — Project setup, database schema, homepage asset grid
   Sprint 2 — Authentication, protected routes, submit form
   Sprint 3 — Star ratings, asset detail page, admin moderation
   Sprint 4 — Map view, gamification, testing, deployment

---

## 📄 Licence

MIT Licence — free to use, modify, and distribute.

---

## 👤 Author

730100507
ECM3442DA
GitHub: https://github.com/lazr07
