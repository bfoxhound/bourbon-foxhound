# ============================================
# GITHUB SETUP for bourbonfoxhound.com
# ============================================

## Step 1: Create GitHub Repo

1. Go to https://github.com/new
2. Name it: `bourbon-foxhound-data` (or whatever you prefer)
3. Make it **Public** (so GitHub Pages works)
4. Don't initialize with README
5. Click "Create repository"

## Step 2: Get Your Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (full control)
4. Generate and **copy the token immediately**

## Step 3: Initialize Local Repo

Run these commands ONCE to set up:

```bash
# Set your GitHub username
git config --global user.name "YOUR_GITHUB_USERNAME"
git config --global user.email "YOUR_EMAIL@example.com"

# Create the repo directory
mkdir -p /root/.openclaw/workspace/bourbon-foxhound-data
cd /root/.openclaw/workspace/bourbon-foxhound-data

# Initialize and connect to GitHub
git init
git remote add origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/bourbon-foxhound-data.git

# Create initial file
cp /root/.openclaw/workspace/bourbon-drops.json ./bourbon-drops.json
git add bourbon-drops.json
git commit -m "Initial bourbon drops data"
git branch -M main
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to https://github.com/YOUR_USERNAME/bourbon-foxhound-data/settings/pages
2. Source: Deploy from a branch
3. Branch: main, folder: / (root)
4. Save
5. Wait 1-2 minutes for: `https://YOUR_USERNAME.github.io/bourbon-foxhound-data/bourbon-drops.json`

## Step 5: Update Your Website Code

Edit `/root/.openclaw/workspace/bourbon-foxhound-embed.js`:

```javascript
const BOURBON_FEED_URL = 'https://YOUR_USERNAME.github.io/bourbon-foxhound-data/bourbon-drops.json';
```

Upload `bourbon-foxhound-embed.js` and `bourbon-foxhound-styles.css` to your site.

## Step 6: Auto-Sync Setup

Add this cron job to auto-push after agent updates:

```bash
openclaw cron create --name bourbon-git-sync --cron "5 10,18 * * *" --message "Run /root/.openclaw/workspace/sync-bourbon-to-github.sh" --session isolated --description "Sync bourbon data to GitHub"
```

This runs 5 minutes after the agent (10:05 and 18:05) to push any updates.

## Step 7: Test It

1. Visit: `https://YOUR_USERNAME.github.io/bourbon-foxhound-data/bourbon-drops.json`
2. Should see your JSON data
3. Check bourbonfoxhound.com - feed should load

## File Structure on GitHub

```
bourbon-foxhound-data/
└── bourbon-drops.json
```

That's it! The agent updates → sync script pushes → GitHub Pages serves → your site displays.

---

## Troubleshooting

**Push fails?**
- Check token has `repo` scope
- Verify remote URL: `git remote -v`
- Try manual push first: `cd bourbon-foxhound-data && git push`

**CORS errors on site?**
- GitHub Pages serves with CORS headers, should work
- If not, use the Cloudflare Worker option instead

**Data not updating?**
- Check agent ran: `openclaw cron list`
- Check sync ran: Look for commit timestamps on GitHub
- Verify JSON is valid: `cat bourbon-drops.json | python3 -m json.tool`
