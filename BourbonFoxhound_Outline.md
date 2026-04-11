# BourbonFoxhound — Executive Outline

## 🥃 Concept Summary
**BourbonFoxhound** is a social platform for bourbon enthusiasts combining:
- **User-generated reviews** with GPS-tagged locations (bars, stores, home)
- **Automated intelligence** on new releases, sales, and price drops
- **Educational content** for new enthusiasts
- **Data layer** capturing consumption patterns, scarcity trends, and geographic preferences

> *"Untappd for bourbon, but the data is actually valuable because scarcity drives price."*

---

## 🏗 Architecture Overview

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | Next.js (PWA) | Cross-platform app experience |
| Backend | Supabase (Postgres) | Auth, database, storage |
| Maps | Mapbox | Interactive review map |
| Agents | OpenClaw + Kimi | Automated bourbon intelligence pipeline |
| AI Backend | kimi-coding/k2p5 (Moonshot) | Development assistance, code generation |
| Hosting | Vercel | Edge-deployed, serverless |
| Source Control | GitHub (dedicated repo) | Code, CI/CD, agent data |
| Image Storage | Supabase + Cloudflare R2 | Cost-optimized photo hosting |

---

## 🎯 Core Features

### Phase 1: MVP (Live)
- ✅ **Landing Page** — Hero + embedded agent feed
- ✅ **Authentication** — Email/password + social login
- ✅ **Add Review** — Photo upload, star rating, location picker
- ✅ **Map View** — All reviews as interactive pins
- ✅ **Agent Feed** — Auto-curated bourbon drops, sales, news

### Phase 2: Education (Built)
- 📚 **Learn Section** — Bourbon 101, tasting guides, distillery profiles
- 🎓 **6 Lessons** — 3 free (trust building), 3 premium (subscription hook)
- 🔄 **Progress Tracking** — User advancement through content

### Phase 3: Social + Monetization (Roadmap)
- User following/followers
- Premium subscriptions ($4.99/mo)
- Affiliate commerce integration
- Data licensing to distilleries

---

## 💰 Business Model

### Phase 1: Local Partner Revenue (Month 1-3)

**"Local Favorites" Directory** — Featured bar/bottle shop listings targeting our engaged local audience.

| Tier | Monthly | Placement | Target |
|------|---------|-----------|--------|
| **🥇 Platinum** | $300-500 | "The Fox's Den" — top banner, gold border, full details, events promoted | The Brothers Beer & Bourbon House (Ballwin) — *already live* |
| **🥈 Gold** | $100-200 | "Featured Partners" section — logo, link, phone | 3-5 local bars/retailers |
| **🥉 Community** | Free | Community Picks — user-ranked, vote-driven | Unlimited organic listings |

**Expansion Revenue:**
- **Sponsored Events:** $50-100/week for release parties, tastings, barrel picks
- **Hunter's Pass:** Digital coupons ($2 off pours, free flights) — bars pay $200/mo for inclusion

**Immediate Traction:** 1 paying partner (The Brothers) validates model. 3-5 more Gold spots = $300-1,000/mo before app launch.

---

### Phase 2-4: Scalable Revenue Streams

| Revenue Stream | Timeline | Potential |
|----------------|----------|-----------|
| **Affiliate Commerce** | Month 4-6 | Drizly/ReserveBar (5-15% on referred sales) |
| **Data Licensing** | Month 6-12 | Distilleries pay for consumption geography |
| **Freemium Subscriptions** | Year 2 | $4-8/mo for power users |
| **Sponsored Drops** | Year 2 | Featured placement for new releases |

**Key Differentiator:** GPS-tagged consumption data showing *where* bourbon is actually being drunk vs. hoarded — valuable intelligence no competitor has.

### The Data Flywheel: User Mentions → Partner Value

Every time a subscriber mentions a local bar, retailer, or event in **any** content on the platform, we capture it:

| Mention Type | Data Captured | Partner Value |
|--------------|---------------|---------------|
| **Review location** | "Drank this at [Bar Name]" | Foot traffic proof, popular pours |
| **Check-in tags** | GPS + venue | Real-time occupancy, peak hours |
| **Comment references** | "Found it at [Store]" | Attribution for rare bottle finds |
| **Photo captions** | "Tasting at [Event]" | Event ROI, brand association |
| **Discussion threads** | "Anyone tried the flight at [Bar]?" | Sentiment analysis, trending spots |

**Monetization Layer:**
- **Partner Dashboard:** "Your venue was mentioned 47 times this month, drove 12 check-ins, 3 rare bottle discoveries"
- **Sentiment Reports:** "92% positive sentiment when your name appears in reviews"
- **Competitive Intel:** "You're mentioned 3x more than [Competitor] in the 'allocated bottles' category"
- **Premium Data Tier:** $150/mo for full mention analytics + trending alerts

**The Loop:** More users → More mentions → More partner data → Higher partner fees → More marketing budget → More users.

---

## 📊 Operating Costs

| Phase | Users | Monthly Cost |
|-------|-------|--------------|
| MVP | 0-1,000 | **$20** (Vercel Pro) |
| Growth | 1,000-10,000 | **$70-110** |
| Scale | 10,000+ | **$550-1,300** |

**Break-even:** ~400 premium subscribers OR ~2,000 active users with affiliate mix

---

## 🚀 30-Day Demo Roadmap (For Investors)

| Week | Milestone | Deliverable |
|------|-----------|-------------|
| 1 | Working Prototype | Auth + Add Review + Map View |
| 2 | Data Pipeline Demo | Agent logs + trending algorithm |
| 3 | Polish + Onboarding | <60 sec first-review experience |
| 4 | Pitch Assets | Demo video + architecture diagram |

---

## 🎤 Investor Narrative

**Problem:** Bourbon is a $9B market growing 8% YoY. Collectors spend $10k on bottles but track collections in Excel. No platform owns the social layer.

**Solution:** Location-tagged reviews + automated intelligence on drops/prices.

**Moat:** 6 months of location-tagged consumption data. Competitors can copy the app, not the dataset.

**Traction Targets:** X users → Y reviews → Z locations → 1 affiliate partnership

---

## 📎 Addendum: Full Technical Details

<details>
<summary><b>Click to expand: Full Code, Architecture & Conversation Details</b></summary>

---

### Agent Configuration

**Agent Framework:** OpenClaw + Kimi (Moonshot AI)
- **Host:** OpenClaw Gateway (not self-hosted)
- **AI Backend:** kimi-coding/k2p5 via Moonshot API
- **Integration:** Direct tool calls for file management, code generation, deployment

**bourbon-monitor** (2x daily)
```json
{
  "agent": "bourbon-monitor",
  "purpose": "Find new releases, sales, news",
  "frequency": "2x daily",
  "outputs": ["drops.json", "sales.json", "news.json"]
}
```

**bourbon-git-sync** (publishes to GitHub Pages)
- Auto-generates HTML feed from scraped data
- Embeddable in Wix or standalone

### Database Schema (Supabase)

```sql
-- Core tables
create table users (
  id uuid primary key,
  username text unique,
  email text unique,
  avatar_url text
);

create table bourbons (
  id uuid primary key,
  name text,
  distillery text,
  proof decimal,
  age int,
  mashbill text,
  image_url text
);

create table reviews (
  id uuid primary key,
  user_id uuid references users(id),
  bourbon_id uuid references bourbons(id),
  rating int,
  notes text,
  location_lat decimal,
  location_lng decimal,
  photo_urls text[],
  created_at timestamp
);

create table locations (
  id uuid primary key,
  name text,
  lat decimal,
  lng decimal,
  type text -- bars, stores, distilleries
);
```

### File Structure

**GitHub Repos:**
- `bourbonfoxhound-app` — Main application (Next.js, Supabase, Vercel)
- `bourbon-foxhound-data` — Agent feed data (GitHub Pages)

```
bourbonfoxhound-app/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout
│   │   ├── login/page.tsx        # Auth
│   │   ├── signup/page.tsx       # Account creation
│   │   ├── feed/page.tsx         # Discovery feed
│   │   ├── reviews/new/page.tsx  # Add review form
│   │   ├── map/page.tsx          # Interactive map
│   │   └── learn/                # Education section
│   │       ├── page.tsx          # Course directory
│   │       ├── what-is-bourbon/  # Lesson 1
│   │       └── tasting-guide/    # Lesson 2
│   └── lib/
│       └── supabase/
│           ├── client.ts         # Supabase client
│           └── database.types.ts # TypeScript types
├── supabase/
│   └── schema.sql                # Full database schema
├── agents/
│   └── agents.json               # Agent configurations
├── .github/
│   └── workflows/                # CI/CD for Vercel
└── SETUP.md                      # Deployment guide
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_MAPBOX_TOKEN=
```

### Deployment Commands

```bash
# 1. Supabase Setup
# Create project at supabase.com
# Run schema.sql in SQL Editor
# Create review-photos bucket (public)

# 2. Local setup
cd bourbonfoxhound-app
cp .env.local.example .env.local
# Add your keys

# 3. Deploy
vercel --prod
```

### Agent Ecosystem (Full Stack)

| Agent | Purpose | Frequency |
|-------|---------|-----------|
| bourbon-monitor | Find new releases, sales, news | 2x daily |
| price-tracker | Track secondary market prices | 4x daily |
| restock-alerts | Monitor local store inventory | Hourly |
| review-curator | Highlight best user reviews | Daily |
| trending-detector | Surface hot bourbons | Real-time |
| location-enricher | Add venue metadata to check-ins | On-write |

### Educational Content Structure

**Free Lessons (Trust Building):**
1. What is Bourbon — Legal definition, 6 requirements, Kentucky dominance
2. How to Taste — The 5 S's, glassware, aroma wheel
3. Mashbills — Corn/rye/wheat breakdown

**Premium Lessons (Subscription Hook):**
4. Distillery Guide — Behind-the-scenes profiles
5. Reading Labels — Age statements, proof, codes
6. Collecting vs. Drinking — Investment vs. enjoyment

### Monetization Funnel

```
Free User Journey:
Landing → Learn (free) → Sign up → Add review → Hit paywall → Subscribe

Premium Benefits:
- All 6 lessons
- Advanced tasting notes database
- Price drop alerts
- Early access to drop news
- "Expert" badge on profile
```

### Investor Demo Script (2 Minutes)

1. **Landing page** → "This shows live bourbon intelligence" (embedded feed)
2. **Signup** → "Users join in seconds"
3. **Add Review** → "Photo + rating + GPS location" (use camera, tag location)
4. **Map View** → "Every review is a data point" (show pin)
5. **Agent Feed** → "Our pipeline auto-detects new releases" (show GitHub cron logs)

### Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| PWA vs Native | PWA-first | $0 app store deployment, instant updates |
| Supabase vs Firebase | Supabase | Open source, no vendor lock-in, Postgres |
| Mapbox vs Google Maps | Mapbox | Cheaper, better UX, 50k free loads |
| Storage Strategy | R2 + Supabase | $0.015/GB vs S3's $0.023 at scale |
| AI Assistant | Kimi (Moonshot) | Cloud API vs self-hosted Claude/Anthropic |
| Agent Framework | OpenClaw + Kimi | Proprietary data pipeline, Moonshot API (not self-hosted) |

### AI Development Partner

**Kimi** (Moonshot AI) — Not self-hosted Claude/Anthropic. Using Kimi's agent capabilities via OpenClaw integration for:
- Architecture design and code generation
- Agent pipeline orchestration
- Real-time development assistance
- File and project management

### GitHub Repository

**Dedicated Repo:** `bourbonfoxhound-app` (newly created)
- URL: `https://github.com/[username]/bourbonfoxhound-app`
- Contains: Next.js PWA, Supabase schema, agent configs
- Deploys to: Vercel (CI/CD via GitHub Actions)
- Agent feed repo: `bourbon-foxhound-data` (GitHub Pages)

### Full Conversation Context

The attached PDF contains the complete conversation between the founder and Kimi (Moonshot AI) covering:
- Initial concept validation
- Technical architecture decisions
- Wix → Next.js migration rationale
- Agent pipeline design
- Education section addition
- Cost analysis and revenue projections
- Investor pitch preparation
- PWA vs native app trade-offs
- Data moat strategy
- Compliance considerations (TTB, age verification)

</details>

---

*Prepared for mentor review. Full technical specifications and conversation details available in the addendum above.*
