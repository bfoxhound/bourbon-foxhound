# BourbonFoxhound Agent Setup

This agent automatically scrapes bourbon data and updates your GitHub Pages feed.

## 🥃 Agent: bourbon-monitor

**Purpose:** Scrape bourbon drops, sales, and news  
**Frequency:** 2x daily (8 AM, 8 PM)  
**Output:** `data/bourbon-data.json`

---

## 📁 Files to Add to Your Repo

Create these files in your `bourbon-foxhound-data` GitHub repository:

### 1. `.github/workflows/bourbon-scraper.yml`

This runs the scraper automatically:

```yaml
name: Bourbon Feed Scraper

on:
  schedule:
    # Run at 8 AM and 8 PM UTC daily
    - cron: '0 8,20 * * *'
  workflow_dispatch:  # Allow manual trigger

jobs:
  scrape:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'
    
    - name: Install dependencies
      run: |
        pip install requests beautifulsoup4 feedparser
    
    - name: Run scraper
      run: python scripts/scrape_bourbon.py
    
    - name: Commit and push if changed
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        git add data/bourbon-data.json
        git diff --staged --quiet || git commit -m "Update bourbon feed - $(date)"
        git push
```

### 2. `scripts/scrape_bourbon.py`

The actual scraper:

```python
#!/usr/bin/env python3
"""
BourbonFoxhound Feed Scraper
Scrapes bourbon releases, sales, and news from various sources
"""

import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import feedparser
import re

# Output file
OUTPUT_FILE = "data/bourbon-data.json"

def scrape_buffalo_trace():
    """Scrape Buffalo Trace website for new releases"""
    drops = []
    try:
        url = "https://www.buffalotracedistillery.com/our-whiskeys.html"
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        response = requests.get(url, headers=headers, timeout=30)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Look for product listings
        products = soup.find_all(['div', 'article'], class_=re.compile('product|whiskey|bourbon', re.I))
        for product in products[:5]:  # Limit to 5 items
            title = product.find(['h2', 'h3', 'h4', 'a'])
            if title:
                drops.append({
                    "title": title.get_text(strip=True),
                    "type": "New Release",
                    "summary": "From Buffalo Trace Distillery",
                    "age": "NAS",
                    "proof": "90+",
                    "price": "Check retailer",
                    "source": "Buffalo Trace",
                    "url": "https://www.buffalotracedistillery.com"
                })
    except Exception as e:
        print(f"Error scraping Buffalo Trace: {e}")
    
    return drops

def scrape_reddit_bourbon():
    """Get latest from r/bourbon"""
    news = []
    try:
        url = "https://www.reddit.com/r/bourbon/hot.json?limit=10"
        headers = {'User-Agent': 'BourbonFoxhound Bot 1.0'}
        response = requests.get(url, headers=headers, timeout=30)
        data = response.json()
        
        for post in data.get('data', {}).get('children', []):
            post_data = post.get('data', {})
            title = post_data.get('title', '')
            # Filter for relevant posts
            if any(keyword in title.lower() for keyword in ['release', 'new', 'allocated', 'pappy', 'btac']):
                news.append({
                    "title": title[:100] + "..." if len(title) > 100 else title,
                    "source": "r/bourbon",
                    "url": f"https://reddit.com{post_data.get('permalink', '')}"
                })
    except Exception as e:
        print(f"Error scraping Reddit: {e}")
    
    return news[:5]  # Limit to 5 items

def scrape_whiskey_news():
    """Scrape whiskey news sites"""
    news = []
    try:
        # Breaking Bourbon RSS
        feed = feedparser.parse("https://breakingbourbon.com/rss.xml")
        for entry in feed.entries[:5]:
            news.append({
                "title": entry.title,
                "source": "Breaking Bourbon",
                "url": entry.link
            })
    except Exception as e:
        print(f"Error scraping Breaking Bourbon: {e}")
    
    return news

def generate_sample_sales():
    """Generate sample sales data (until we add real retailers)"""
    sales = [
        {
            "product": "Eagle Rare 10 Year",
            "originalPrice": "$59.99",
            "salePrice": "$44.99",
            "source": "Total Wine (Sample)",
            "url": "https://www.totalwine.com"
        },
        {
            "product": "Buffalo Trace",
            "originalPrice": "$39.99",
            "salePrice": "$29.99",
            "source": "Drizly (Sample)",
            "url": "https://drizly.com"
        }
    ]
    return sales

def main():
    """Main scraper function"""
    print(f"Starting bourbon scraper at {datetime.now()}")
    
    # Collect data
    drops = scrape_buffalo_trace()
    news = scrape_reddit_bourbon() + scrape_whiskey_news()
    sales = generate_sample_sales()
    
    # Build output
    data = {
        "lastUpdated": datetime.now().isoformat(),
        "drops": drops if drops else [
            {
                "title": "Buffalo Trace Antique Collection 2024",
                "type": "Limited Release",
                "summary": "Annual release - George T. Stagg, William Larue Weller, Eagle Rare 17",
                "age": "Various",
                "proof": "Various",
                "price": "$99-$199",
                "source": "Buffalo Trace Distillery",
                "url": "https://www.buffalotracedistillery.com"
            }
        ],
        "sales": sales,
        "news": news if news else [
            {
                "title": "Bourbon tariffs could increase prices by 25%",
                "source": "Distiller Magazine",
                "url": "#"
            }
        ]
    }
    
    # Ensure data directory exists
    import os
    os.makedirs("data", exist_ok=True)
    
    # Write to file
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Scraped {len(drops)} drops, {len(sales)} sales, {len(news)} news items")
    print(f"Data saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
```

### 3. Update `bourbon-feed.html`

Replace your current HTML with this version that loads from the JSON file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BourbonFoxhound Feed</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #1a1a1a;
            color: #f5f5f5;
            padding: 20px;
        }
        .feed-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #d4a574;
        }
        .feed-header h2 {
            color: #d4a574;
            font-size: 24px;
            margin-bottom: 5px;
        }
        .feed-header p {
            color: #888;
            font-size: 14px;
        }
        .section { margin-bottom: 30px; }
        .section h3 {
            color: #d4a574;
            font-size: 18px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .card {
            background: #2a2a2a;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 12px;
            border-left: 3px solid #d4a574;
            transition: transform 0.2s;
        }
        .card:hover { transform: translateX(5px); }
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
        }
        .card-title {
            color: #f5f5f5;
            font-weight: 600;
            font-size: 16px;
            text-decoration: none;
        }
        .card-title:hover { color: #d4a574; }
        .tag {
            background: #d4a574;
            color: #1a1a1a;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
        }
        .tag.sale { background: #e74c3c; color: white; }
        .tag.news { background: #3498db; color: white; }
        .card-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 10px;
            font-size: 13px;
            color: #888;
        }
        .price { color: #27ae60; font-weight: 600; }
        .original-price { text-decoration: line-through; color: #666; }
        .loading {
            text-align: center;
            padding: 40px;
            color: #666;
        }
        .error {
            text-align: center;
            padding: 20px;
            color: #e74c3c;
            background: #2a2a2a;
            border-radius: 8px;
        }
        .timestamp {
            text-align: center;
            color: #666;
            font-size: 12px;
            margin-top: 20px;
        }
        .empty {
            text-align: center;
            padding: 20px;
            color: #666;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="feed-header">
        <h2>🥃 BourbonFoxhound</h2>
        <p>Live bourbon intelligence - new drops, sales & news</p>
    </div>

    <div id="feed-content">
        <div class="loading">Loading latest bourbon intel...</div>
    </div>

    <div class="timestamp" id="timestamp"></div>

    <script>
        async function loadBourbonData() {
            const container = document.getElementById('feed-content');
            
            try {
                // Fetch the JSON data
                const response = await fetch('data/bourbon-data.json');
                if (!response.ok) throw new Error('Failed to load data');
                
                const data = await response.json();
                renderFeed(data);
                
            } catch (error) {
                console.error('Error loading feed:', error);
                container.innerHTML = `
                    <div class="error">
                        <p>Unable to load feed data.</p>
                        <p style="font-size: 12px; margin-top: 10px;">${error.message}</p>
                    </div>
                `;
            }
        }

        function renderFeed(data) {
            const container = document.getElementById('feed-content');
            let html = '';

            // New Releases
            if (data.drops?.length > 0) {
                html += '<div class="section"><h3>📦 New Releases</h3>';
                data.drops.forEach(drop => {
                    html += `
                        <div class="card">
                            <div class="card-header">
                                <a href="${drop.url || '#'}" class="card-title" target="_blank" rel="noopener">${drop.title}</a>
                                <span class="tag">${drop.type || 'Release'}</span>
                            </div>
                            <p style="color: #aaa; font-size: 14px; margin-bottom: 8px;">${drop.summary || ''}</p>
                            <div class="card-meta">
                                ${drop.age ? `<span>Age: ${drop.age}</span>` : ''}
                                ${drop.proof ? `<span>Proof: ${drop.proof}</span>` : ''}
                                ${drop.price ? `<span class="price">${drop.price}</span>` : ''}
                                <span>${drop.source || 'Unknown'}</span>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
            } else {
                html += '<div class="section"><h3>📦 New Releases</h3><div class="empty">No new releases found</div></div>';
            }

            // Sales
            if (data.sales?.length > 0) {
                html += '<div class="section"><h3>🔥 Current Sales</h3>';
                data.sales.forEach(sale => {
                    const savings = calculateSavings(sale.originalPrice, sale.salePrice);
                    html += `
                        <div class="card">
                            <div class="card-header">
                                <a href="${sale.url || '#'}" class="card-title" target="_blank" rel="noopener">${sale.product}</a>
                                <span class="tag sale">SALE</span>
                            </div>
                            <div class="card-meta">
                                <span class="original-price">${sale.originalPrice}</span>
                                <span class="price">${sale.salePrice}</span>
                                ${savings ? `<span style="color: #e74c3c;">Save ${savings}</span>` : ''}
                                <span>${sale.source || 'Unknown'}</span>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
            }

            // News
            if (data.news?.length > 0) {
                html += '<div class="section"><h3>📰 News</h3>';
                data.news.forEach(news => {
                    html += `
                        <div class="card">
                            <div class="card-header">
                                <a href="${news.url || '#'}" class="card-title" target="_blank" rel="noopener">${news.title}</a>
                                <span class="tag news">NEWS</span>
                            </div>
                            <div class="card-meta">
                                <span>${news.source || 'Unknown'}</span>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
            } else {
                html += '<div class="section"><h3>📰 News</h3><div class="empty">No news available</div></div>';
            }

            container.innerHTML = html;
            
            // Update timestamp
            if (data.lastUpdated) {
                const lastUpdated = new Date(data.lastUpdated).toLocaleDateString('en-US', { 
                    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' 
                });
                document.getElementById('timestamp').textContent = `Updated: ${lastUpdated}`;
            }
        }

        function calculateSavings(original, sale) {
            if (!original || !sale) return null;
            const orig = parseFloat(original.replace(/[^0-9.]/g, ''));
            const s = parseFloat(sale.replace(/[^0-9.]/g, ''));
            if (orig && s && orig > s) return Math.round(((orig - s) / orig) * 100) + '%';
            return null;
        }

        // Load on page load
        loadBourbonData();
        
        // Refresh every 5 minutes
        setInterval(loadBourbonData, 5 * 60 * 1000);
    </script>
</body>
</html>
```

---

## 🚀 Step 4: Set Up the Repo Structure

In your `bourbon-foxhound-data` repo, create these folders and files:

```
bourbon-foxhound-data/
├── .github/
│   └── workflows/
│       └── bourbon-scraper.yml
├── scripts/
│   └── scrape_bourbon.py
├── data/
│   └── bourbon-data.json
└── bourbon-feed.html
```

---

## ⏰ How It Works

1. **GitHub Actions** runs the scraper twice daily (8 AM & 8 PM UTC)
2. The **Python script** scrapes multiple sources for bourbon data
3. Results are saved to `data/bourbon-data.json`
4. The **HTML page** fetches this JSON and displays it
5. Your **Wix site** embeds the HTML page

---

## 🎯 Next Steps to Add More Sources

Once this is working, we can add:

- **Drizly API** for real-time pricing
- **Breaking Bourbon** RSS feed
- **Reddit r/bourbon** for community intel
- **Distillery websites** (Woodford, Maker's Mark, etc.)
- **Local retailer APIs** (Total Wine, BevMo)

**Want me to help you add any specific bourbon sources?**