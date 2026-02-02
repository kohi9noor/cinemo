# Cinemo

Yeah, Movie App :)

## What is this?

Cinemo is a Next.js app where you can discover movies and TV shows, keep a watchlist, and actually have a decent time browsing content. It pulls data from TMDB, handles auth with Supabase, and stores your preferences in a postgres database.

## The Stack

- **Next.js 16** - Fast And SSR
- **TypeScript** - For type safety
- **Tailwind CSS v4** - For styling
- **Supabase** - Auth + Database hosting made easy
- **Drizzle ORM** - Type-safe database queries
- **TMDB API** - Where all the movie/TV data comes from
- **Sonner** - Toast notifications

## How It Works

### The Architecture

The app is organized by features, not by file types. So instead of having all components in one folder, all hooks in another, etc., everything related to a feature lives together. Makes it way easier to find stuff.

```
app/
├── (public)/          # Stuff anyone can see (home, auth page)
├── (private)/         # Gated content (profile, detail pages)
└── layout.tsx         # Root layout with header

features/
├── auth/              # Everything auth related
│   ├── actions/       # Server actions for profile stuff
│   ├── components/    # Sign in/up forms, modals, buttons
│   └── hooks/         # Auth state, scroll triggers, onboarding
├── discovery/         # Home page content browsing
│   ├── actions/       # Fetching content from TMDB
│   ├── components/    # Grid, cards, search, filters
│   └── hooks/         # Infinite scroll, debounce, content fetching
├── detail/            # Individual movie/TV show pages
│   ├── actions/       # Getting detailed info + credits
│   ├── components/    # Hero section, cast grid, info cards
│   └── types/         # TypeScript definitions for TMDB data
├── profile/           # User profile page
│   └── components/    # Profile header with gradient bg
└── watchlist/         # Save movies/shows for later
    ├── actions/       # Add/remove from watchlist
    ├── components/    # Watchlist grid and cards
    └── hooks/         # Fetching user's watchlist data

components/
├── debug/             # Debug components (dev only)
├── main/              # Header, profile icon
└── ui/                # Reusable stuff (loader, search input)

db/
├── index.ts           # Database connection
└── schema.ts          # Drizzle schema (users, watchlist, etc.)
```

### How Features Work

Each feature is self-contained. Let's say you're working on the watchlist:

1. **Components** - The UI stuff (buttons, grids, cards)
2. **Hooks** - React hooks for state and side effects
3. **Actions** - Server actions that talk to the database
4. **Types** - TypeScript interfaces (when needed)

Example: When you click the watchlist button on a movie, it uses a hook (`useWatchlist`) that calls a server action (`toggleWatchlist`) which updates the database. The hook manages the loading state and updates the UI. Simple.

### Auth Flow

I am using Supabase for auth because rolling my own auth is time consuming and free security headache.

1. User lands on the home page
2. Scroll past 400px without being logged in? Auth modal pops up
3. Sign up with email/password or OAuth (Google, GitHub)
4. First time users get an onboarding modal to pick their favorite genres
5. you're in, now you can access the app

The auth state is managed with a custom hook (`useAuth`) that wraps Supabase's auth methods. When you're logged in, the header shows your profile icon (or your email initials if you don't have an avatar).

### Database Setup

Using Drizzle ORM with Postgres (hosted on Supabase). The schema is pretty straightforward:

- **users** - Extended Supabase auth users with preferences
- **watchlist** - What movies/shows each user saved
  The cool thing about Drizzle is you write TypeScript, it gives you type-safe queries, and you can actually read the code later.

### Styling Approach

Tailwind v4 is doing the heavy lifting. I've got a custom color system that generates random light colors for user profiles - same color for the avatar border and the background gradient, so everything looks cohesive.

All the loading states use the same `LazyLoader` component (just a spinning icon, but consistent). Buttons use a shared `Button` component with variants. The usual stuff you'd expect in a well-organized app.

### The TMDB Integration

TMDB API powers all the content. We fetch:

- Trending movies/TV shows
- Search results
- Genre filters
- Detailed info (cast, crew, trailers)

The API calls are wrapped in server actions. Data gets cached by Next.js automatically for better performance.

## Getting Started

### What You Need

- Node.js 18+
- A Supabase account (free tier works fine)
- TMDB API key (also free)

### Setup

1. Clone this thing:

```bash
git clone https://github.com/kohi9noor/cinemo.git
cd cinemo
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables. Create a `.env` file:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# TMDB
NEXT_PUBLIC_TMDB_API_KEY=your-tmdb-api-key
TMDB_API_KEY=your-tmdb-api-key

# Database
DATABASE_URL=your-postgres-connection-string
```

4. Push the database schema:

```bash
npm run db:push
```

5. Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000` and you should be good to go.

### Database Commands

```bash
npm run db:generate   # Generate migrations from schema changes
npm run db:migrate    # Run migrations
npm run db:push       # Push schema directly (dev only)
npm run db:studio     # Open Drizzle Studio (visual db browser)
```

## Folder Structure Explained

### Why This Layout?

I've seen too many projects where you're hunting through 5 different folders just to understand one feature. This structure keeps related stuff together.

Want to modify the watchlist? Everything's in `features/watchlist`. Need to change how auth works? It's all in `features/auth`. You're not jumping between `/components`, `/hooks`, `/api`, `/utils`, etc.

### App Router

Using the new App Router with route groups:

- `(public)` - No auth required (home page, auth page)
- `(private)` - Requires authentication (profile, detail pages)

The middleware (`middleware.ts`) handles redirects. Try to hit `/profile` without logging in? You're going to `/auth`.

### Server vs Client Components

Most components are client components (`"use client"`) because they need interactivity. But the data fetching happens in server actions, keeping API keys safe and leveraging server-side caching.

Profile page? Server component that fetches user data. Profile section inside? Client component for interactivity.

## Key Features

### Random Color System - I have used AI for this

Each user gets a random color (based on their email) for their profile. The same color is used for:

- Avatar border
- Background gradient
- Keeps it consistent and unique per user

Check `lib/color-utils.ts` - it's a simple hash function that picks from a palette of soft, pastel colors.

### Lazy Loading & Infinite Scroll

Discovery page has infinite scroll. Scroll to the bottom, it loads more content automatically. Uses Intersection Observer under the hood. The `useInfiniteScroll` hook handles the logic.

### Smart Loading States

Every loading state uses the same `LazyLoader` component. Different sizes (`sm`, `md`, `lg`) and a `fullScreen` prop. Keeps the UX consistent.

### Modal Scroll Lock

When a modal pops up (auth modal, onboarding), the background doesn't scroll. It's locked. Closes? Scrolling works again.

### Debounced Search

Search input debounces for 500ms. You're not hitting the API on every keystroke...

## Things to Know

### Environment Variables

Don't commit `.env.local`. It's in `.gitignore` for a reason. Your API keys are secrets, treat them that way.

### Build Warnings

You might see a warning about middleware being deprecated in favor of proxy. It's a Next.js 16 thing. The app works fine, they're just changing terminology.

### Supabase Auth

I am using using Supabase's server-side auth with cookies. The `lib/supabase/server.ts` file handles creating the client with the right cookie setup. Don't use the regular client for auth stuff on the server.

## What's Next?

Some ideas if I want to extend this:

- Add recommendations based on genre preferences
- Better filtering (by year, rating, etc.)
- Mobile app with React Native

---
