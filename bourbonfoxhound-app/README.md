# BourbonFoxhound App

## Architecture

### Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (Postgres + Auth + Storage)
- **Maps:** Mapbox GL JS
- **Images:** Supabase Storage + Cloudinary (optional)
- **Deployment:** Vercel (recommended)

### Project Structure
```
src/
├── app/                    # Next.js app router
│   ├── (auth)/            # Auth group (login, signup)
│   ├── feed/              # Bourbon discovery feed
│   ├── reviews/           # Review pages
│   ├── map/               # Interactive map
│   ├── profile/           # User profiles
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── bourbon/          # Bourbon-specific components
│   └── map/              # Map components
├── lib/                   # Utilities, hooks, types
│   ├── supabase/         # Supabase client
│   ├── hooks/            # Custom hooks
│   └── types/            # TypeScript types
└── agents/               # OpenClaw agent configs
```

## Getting Started

1. Copy `.env.local.example` to `.env.local`
2. Add your Supabase credentials
3. Run `npm run dev`

## Agents

See `/agents/` for OpenClaw agent configurations.
