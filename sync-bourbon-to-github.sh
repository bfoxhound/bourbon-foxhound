#!/bin/bash
# ============================================
# sync-bourbon-to-github.sh
# Auto-commit and push bourbon-drops.json to GitHub
# ============================================

REPO_DIR="/root/.openclaw/workspace/bourbon-foxhound-data"
JSON_FILE="/root/.openclaw/workspace/bourbon-drops.json"
ENV_FILE="/root/.openclaw/workspace/.bourbon-env"

# Load token from env file
if [ -f "$ENV_FILE" ]; then
    export $(cat "$ENV_FILE" | xargs)
fi

cd "$REPO_DIR" || exit 1

# Set remote with token for this push
if [ -n "$GITHUB_TOKEN" ]; then
    git remote set-url origin "https://bfoxhound:${GITHUB_TOKEN}@github.com/bfoxhound/bourbon-foxhound-data.git"
fi

# Check if there are changes
if git diff --quiet bourbon-drops.json 2>/dev/null && git diff --cached --quiet bourbon-drops.json 2>/dev/null; then
    echo "No changes to bourbon-drops.json"
    exit 0
fi

# Copy latest JSON
cp "$JSON_FILE" "$REPO_DIR/bourbon-drops.json"

# Commit and push
git add bourbon-drops.json
git commit -m "Update bourbon drops: $(date -u '+%Y-%m-%d %H:%M UTC')"
git push origin main

echo "Pushed bourbon updates at $(date)"
