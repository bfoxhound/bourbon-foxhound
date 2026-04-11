# 🥃 BourbonFoxhound - MVP Built

## ✅ What's Working Now

### Core Features
| Feature | Status | Notes |
|---------|--------|-------|
| **Landing Page** | ✅ | Hero, features, embedded agent feed |
| **Authentication** | ✅ | Login, signup with Supabase Auth |
| **Add Review** | ✅ | Photo upload, rating, location picker (Mapbox), notes |
| **Map View** | ✅ | Shows all reviews as pins, list view toggle |
| **Feed Page** | ✅ | Agent-curated drops + trending sidebar |

### Tech Stack
- **Framework:** Next.js 15 + TypeScript
- **Styling:** Tailwind CSS
- **Auth & DB:** Supabase
- **Maps:** Mapbox GL
- **Storage:** Supabase Storage (photos)

---

## 🚀 Deploy in 10 Minutes

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Create new project
3. Copy these values for `.env.local`:
   - Project URL
   - Anon Key
   - Service Role Key

### Step 2: Run Database Schema
In Supabase SQL Editor, run everything in `supabase/schema.sql`

### Step 3: Create Storage Bucket
1. Go to Storage in Supabase dashboard
2. Create bucket named `review-photos`
3. Set public bucket policy

### Step 4: Get Mapbox Token
1. Go to https://mapbox.com
2. Create account, get public access token
3. Add to `.env.local`

### Step 5: Environment Variables
```bash
cp .env.local.example .env.local
# Fill in:
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
NEXT_PUBLIC_MAPBOX_TOKEN=
```

### Step 6: Deploy
```bash
npm install -g vercel
vercel --prod
```

---

## 🎯 Demo Flow for Investors

1. **Landing page** → Show embedded feed (already updating 2x daily)
2. **Sign up** → Create account in 10 seconds
3. **Add review** → Take photo, rate, tag location
4. **Map view** → See your review appear as a pin
5. **Show agent logs** → Demonstrate automated data pipeline

**Total time:** 2 minutes of live demo

---

## 📊 What to Track (for pitch deck)

| Metric | Why It Matters |
|--------|---------------|
| Reviews per user | Engagement depth |
| Photos per review | Content quality |
| Location accuracy | Data value for buyers |
| Time to first review | Onboarding friction |
| Return visits | Habit formation |

---

## 🔮 Next Features (Post-Funding)

1. **Follow/friends** — social graph
2. **Price alerts** — notify when bottles hit stores
3. **Collection tracking** — "I own these bottles"
4. **Taste matching** — "Users like you enjoyed..."
5. **Venue pages** — bar/store profiles

---

## 💰 Monetization Hooks (Already Built)

- **Affiliate links** in agent feed (easy add)
- **Photo storage limits** → Premium upgrade
- **Location data** → Sell to distributors
- **Sponsored drops** → Brand partnerships

---

## 🆘 Troubleshooting

**Map doesn't show?** Check Mapbox token in `.env.local`

**Photo upload fails?** Check storage bucket permissions in Supabase

**Auth doesn't work?** Verify Supabase URL and anon key

---

## 🎤 Your Pitch

> "We built the first location-tagged bourbon tracking platform. Users post reviews with GPS coordinates. Our agents scan the web for new releases. We own the data layer that connects consumption to location — something no whiskey app has cracked."

**The ask:** $150-300K seed to scale to 10k users and prove data licensing value.

---

Built and ready. Need help with anything before you demo?
