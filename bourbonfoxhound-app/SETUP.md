# 🥃 BourbonFoxhound - Next.js App

## ✅ What's Built

### Frontend
- [x] Landing page with hero, features, feed preview
- [x] Feed page with sidebar and trending section
- [x] Responsive design with Tailwind CSS
- [x] Color scheme: bourbon amber + warm stone

### Backend Schema
- [x] Supabase database schema (users, bourbons, reviews, locations, follows)
- [x] Row Level Security (RLS) policies
- [x] TypeScript types

### Agents
- [x] `bourbon-monitor` - Scrapes drops/news/sales (✅ running)
- [x] `bourbon-git-sync` - Publishes to GitHub Pages (✅ running)
- [x] Placeholder configs for future agents

---

## 🚀 Deployment Steps

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy Project URL and Anon Key
4. Run the schema SQL (in `supabase/schema.sql`)

### 2. Set Environment Variables
```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

### 3. Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

Or connect GitHub repo to Vercel for auto-deploys.

---

## 📋 Next Steps (Choose Your Priority)

### Option A: Auth First (Recommended)
- [ ] Build login/signup pages
- [ ] Connect Supabase Auth
- [ ] Protect routes

### Option B: Reviews First
- [ ] Create "Add Review" form
- [ ] Photo upload to Supabase Storage
- [ ] Display reviews on feed

### Option C: Maps First
- [ ] Add Mapbox integration
- [ ] Show review locations on map
- [ ] Geolocation for "near me"

---

## 🔗 Your Live Assets

| Asset | URL |
|-------|-----|
| Bourbon Feed JSON | https://bfoxhound.github.io/bourbon-foxhound-data/bourbon-drops.json |
| Embeddable Feed | https://bfoxhound.github.io/bourbon-foxhound-data/bourbon-feed.html |
| GitHub Repo | https://github.com/bfoxhound/bourbon-foxhound-data |

---

## 💡 Architecture Recap

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Next.js App   │────▶│    Supabase      │────▶│  OpenClaw Agent │
│   (Vercel)      │     │  (Auth + DB)     │     │  (Bourbon Data) │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐
│  GitHub Pages   │  (Static feed for discovery)
└─────────────────┘
```

**Questions?** Just ask which feature to build next.
