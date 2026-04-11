#!/usr/bin/env python3
"""
BourbonFoxhound Feed Scraper v3 - Tiered Tracking
Aggressive tracking for Unicorn, Rare Midrange, and Value tiers
"""

import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import feedparser
import re
import os

# Output files
OUTPUT_FILE = "data/bourbon-data.json"
PREMIUM_DROPS_FILE = "data/premium-drops.json"

# Load tiered bourbon data
def load_premium_drops():
    """Load the complete tiered bourbon database"""
    try:
        with open(PREMIUM_DROPS_FILE, 'r') as f:
            data = json.load(f)
            return data
    except Exception as e:
        print(f"Error loading premium drops: {e}")
        # Return inline fallback
        return {
            "categories": {
                "unicorn": {"label": "🦄 Unicorn"},
                "rare_midrange": {"label": "💎 Rare Midrange"},
                "value": {"label": "⭐ Value"}
            },
            "drops": []
        }

# Aggressive search terms derived from the tier data
def get_search_keywords():
    """Generate comprehensive search keywords from all tiers"""
    data = load_premium_drops()
    drops = data.get('drops', [])
    
    # Extract all search terms
    all_terms = set()
    tier_terms = {
        'unicorn': set(),
        'rare_midrange': set(),
        'value': set()
    }
    
    for drop in drops:
        tier = drop.get('tier', 'value')
        terms = drop.get('searchTerms', [])
        brand = drop.get('brand', '')
        
        # Add search terms
        for term in terms:
            all_terms.add(term.lower())
            tier_terms.get(tier, set()).add(term.lower())
        
        # Add brand name
        if brand:
            all_terms.add(brand.lower())
            tier_terms.get(tier, set()).add(brand.lower())
    
    # High-priority alert keywords
    alert_keywords = [
        'allocated', 'allocation', 'drop', 'release', 'available', 
        'in stock', 'lottery', 'raffle', 'found', 'store pick',
        'secondary', 'trading', 'iso', 'ft', 'for trade'
    ]
    
    return {
        'all': list(all_terms),
        'by_tier': {k: list(v) for k, v in tier_terms.items()},
        'alerts': alert_keywords
    }

def scrape_reddit_aggressive():
    """Aggressive Reddit scraping with tier classification"""
    posts = []
    keywords = get_search_keywords()
    
    try:
        # Search multiple endpoints
        endpoints = [
            'https://www.reddit.com/r/bourbon/hot.json?limit=50',
            'https://www.reddit.com/r/bourbon/new.json?limit=50',
        ]
        
        seen_ids = set()
        
        for url in endpoints:
            try:
                headers = {'User-Agent': 'BourbonFoxhound Bot 2.0'}
                response = requests.get(url, headers=headers, timeout=30)
                data = response.json()
                
                for post in data.get('data', {}).get('children', []):
                    post_data = post.get('data', {})
                    post_id = post_data.get('id')
                    
                    if post_id in seen_ids:
                        continue
                    seen_ids.add(post_id)
                    
                    title = post_data.get('title', '')
                    title_lower = title.lower()
                    selftext = post_data.get('selftext', '').lower()
                    combined = title_lower + ' ' + selftext
                    
                    # Check for matches
                    matched_tier = None
                    is_alert = False
                    
                    # Check unicorns first (highest priority)
                    for term in keywords['by_tier'].get('unicorn', []):
                        if term in combined:
                            matched_tier = 'unicorn'
                            is_alert = any(ak in combined for ak in keywords['alerts'])
                            break
                    
                    # Then rare midrange
                    if not matched_tier:
                        for term in keywords['by_tier'].get('rare_midrange', []):
                            if term in combined:
                                matched_tier = 'rare_midrange'
                                is_alert = any(ak in combined for ak in keywords['alerts'])
                                break
                    
                    # Then value
                    if not matched_tier:
                        for term in keywords['by_tier'].get('value', []):
                            if term in combined:
                                matched_tier = 'value'
                                break
                    
                    # General bourbon keywords if no specific match
                    general_keywords = ['allocated', 'new release', 'drop', 'found', 'store pick']
                    if not matched_tier and any(kw in combined for kw in general_keywords):
                        matched_tier = 'general'
                    
                    if matched_tier:
                        flair = "🚨 ALERT" if is_alert else matched_tier.upper()
                        posts.append({
                            "title": title[:120] + "..." if len(title) > 120 else title,
                            "source": f"r/bourbon [{flair}]",
                            "url": f"https://reddit.com{post_data.get('permalink', '')}",
                            "tier": matched_tier,
                            "is_alert": is_alert,
                            "upvotes": post_data.get('ups', 0),
                            "created": post_data.get('created_utc')
                        })
                        
            except Exception as e:
                print(f"Error with endpoint {url}: {e}")
                continue
    
    except Exception as e:
        print(f"Error scraping Reddit: {e}")
    
    # Sort by tier priority and upvotes
    tier_order = {'unicorn': 0, 'rare_midrange': 1, 'value': 2, 'general': 3}
    posts.sort(key=lambda x: (tier_order.get(x['tier'], 4), -x.get('upvotes', 0)))
    
    return posts[:15]  # Top 15 posts

def scrape_breaking_bourbon():
    """Scrape Breaking Bourbon with tier tagging"""
    articles = []
    keywords = get_search_keywords()
    
    try:
        feed = feedparser.parse("https://breakingbourbon.com/rss.xml")
        
        for entry in feed.entries[:10]:
            title_lower = entry.title.lower()
            
            # Determine tier
            tier = None
            for term in keywords['by_tier'].get('unicorn', []):
                if term in title_lower:
                    tier = 'unicorn'
                    break
            
            if not tier:
                for term in keywords['by_tier'].get('rare_midrange', []):
                    if term in title_lower:
                        tier = 'rare_midrange'
                        break
            
            if not tier:
                for term in keywords['by_tier'].get('value', []):
                    if term in title_lower:
                        tier = 'value'
                        break
            
            badge = f" [{tier.upper()}]" if tier else ""
            
            articles.append({
                "title": entry.title,
                "source": f"Breaking Bourbon{badge}",
                "url": entry.link,
                "tier": tier or 'news',
                "published": entry.get('published', '')
            })
    except Exception as e:
        print(f"Error scraping Breaking Bourbon: {e}")
    
    return articles

def scrape_bourbon_pursuit():
    """Scrape Bourbon Pursuit podcast/news"""
    articles = []
    try:
        feed = feedparser.parse("https://bourbonpursuit.com/feed/")
        for entry in feed.entries[:5]:
            articles.append({
                "title": entry.title,
                "source": "Bourbon Pursuit",
                "url": entry.link,
                "tier": "podcast"
            })
    except Exception as e:
        print(f"Error scraping Bourbon Pursuit: {e}")
    return articles

def scrape_distiller():
    """Scrape Distiller Magazine"""
    articles = []
    try:
        feed = feedparser.parse("https://distiller.com/blog/feed/")
        for entry in feed.entries[:5]:
            articles.append({
                "title": entry.title,
                "source": "Distiller",
                "url": entry.link,
                "tier": "news"
            })
    except Exception as e:
        print(f"Error scraping Distiller: {e}")
    return articles

def generate_tiered_drops():
    """Generate drop cards organized by tier"""
    data = load_premium_drops()
    drops = data.get('drops', [])
    
    tiered_cards = {
        'unicorn': [],
        'rare_midrange': [],
        'value': []
    }
    
    for drop in drops:
        tier = drop.get('tier', 'value')
        if tier not in tiered_cards:
            continue
        
        variants = ", ".join(drop.get('variants', [])[:2])
        msrp = drop.get('msrp', 'TBD')
        secondary = drop.get('secondaryValue', 'TBD')
        
        card = {
            "title": drop['brand'],
            "series": drop.get('series', ''),
            "type": data['categories'].get(tier, {}).get('label', tier),
            "summary": f"{variants} | MSRP: {msrp} | Secondary: {secondary}",
            "age": drop.get('age', 'Various'),
            "proof": drop.get('proof', 'Various'),
            "price": msrp,
            "source": drop.get('distillery', 'Various'),
            "url": f"https://www.google.com/search?q={drop['brand'].replace(' ', '+')}+bourbon+release+2025",
            "tier": tier,
            "hypeLevel": drop.get('hypeLevel', 5),
            "notes": drop.get('notes', '')
        }
        
        tiered_cards[tier].append(card)
    
    # Sort by hype level within each tier
    for tier in tiered_cards:
        tiered_cards[tier].sort(key=lambda x: -x.get('hypeLevel', 0))
    
    return tiered_cards

def generate_watchlist():
    """Generate watchlist from premium-drops.json"""
    data = load_premium_drops()
    alerts = data.get('watchlistAlerts', [])
    
    watchlist = []
    for alert in alerts:
        watchlist.append({
            "title": alert['title'],
            "type": "WATCHLIST",
            "summary": f"{alert.get('window', 'TBD')} | Action: {alert.get('action', 'Monitor')}",
            "age": "Various",
            "proof": "Various",
            "price": "TBD",
            "source": "BourbonFoxhound Intel",
            "url": "#",
            "tier": alert.get('tier', 'general')
        })
    
    return watchlist

def generate_secondary_market_data():
    """Generate secondary market tracking data"""
    data = load_premium_drops()
    auction = data.get('auctionLeaders', [])
    
    sales = []
    for item in auction:
        tier = item.get('tier', 'value')
        badge = "🦄" if tier == 'unicorn' else "💎" if tier == 'rare_midrange' else "⭐"
        
        sales.append({
            "product": f"{badge} {item['product']}",
            "originalPrice": item.get('msrp', 'Retail'),
            "salePrice": item.get('secondary', item.get('avgPrice', 'Market')),
            "source": f"Secondary Market ({item.get('volume', 'Active')})",
            "url": "https://www.caskers.com",
            "notes": item.get('notes', '')
        })
    
    # Add specific hot items
    hot_items = [
        {
            "product": "🔥 BTAC Full Set",
            "originalPrice": "$495-995",
            "salePrice": "$2000-4000",
            "source": "Secondary/Auction",
            "url": "#",
            "notes": "Complete 5-bottle collection"
        },
        {
            "product": "🔥 Pappy 20 Year",
            "originalPrice": "$199",
            "salePrice": "$2500-5000",
            "source": "Secondary Market",
            "url": "#",
            "notes": "Top tier unicorn"
        }
    ]
    
    return hot_items + sales

def main():
    """Main scraper function - v3 Tiered"""
    print(f"🥃 BourbonFoxhound Scraper v3 - Starting at {datetime.now()}")
    print("=" * 60)
    
    # Load keyword database
    keywords = get_search_keywords()
    print(f"📊 Tracking {len(keywords['all'])} unique terms")
    print(f"   🦄 Unicorn: {len(keywords['by_tier'].get('unicorn', []))} terms")
    print(f"   💎 Rare Midrange: {len(keywords['by_tier'].get('rare_midrange', []))} terms")
    print(f"   ⭐ Value: {len(keywords['by_tier'].get('value', []))} terms")
    
    # Collect data
    print("\n🔍 Scraping sources...")
    
    reddit_posts = scrape_reddit_aggressive()
    print(f"   ✓ Reddit: {len(reddit_posts)} posts")
    
    breaking_bourbon = scrape_breaking_bourbon()
    print(f"   ✓ Breaking Bourbon: {len(breaking_bourbon)} articles")
    
    bourbon_pursuit = scrape_bourbon_pursuit()
    print(f"   ✓ Bourbon Pursuit: {len(bourbon_pursuit)} episodes")
    
    distiller = scrape_distiller()
    print(f"   ✓ Distiller: {len(distiller)} articles")
    
    # Generate tiered content
    print("\n📦 Generating tiered drops...")
    tiered_drops = generate_tiered_drops()
    watchlist = generate_watchlist()
    
    # Build drop list: Watchlist first, then Unicorn, Rare Midrange, Value
    all_drops = (
        watchlist +
        tiered_drops['unicorn'][:5] +  # Top 5 unicorns
        tiered_drops['rare_midrange'][:5] +  # Top 5 rare midrange
        tiered_drops['value'][:5]  # Top 5 value
    )
    
    print(f"   ✓ Total drops: {len(all_drops)}")
    
    # Build news feed (prioritize alerts)
    news_feed = reddit_posts + breaking_bourbon + bourbon_pursuit + distiller
    
    # Sort by alert status and tier
    def news_priority(item):
        tier_order = {'unicorn': 0, 'rare_midrange': 1, 'value': 2, 'general': 3, 'news': 4, 'podcast': 5}
        tier = item.get('tier', 'news')
        is_alert = item.get('is_alert', False)
        return (0 if is_alert else 1, tier_order.get(tier, 6))
    
    news_feed.sort(key=news_priority)
    
    # Secondary market
    sales = generate_secondary_market_data()
    print(f"   ✓ Market data: {len(sales)} items")
    
    # Build final output
    output = {
        "lastUpdated": datetime.now().isoformat(),
        "scraperVersion": "3.0-tiered",
        "drops": all_drops,
        "sales": sales,
        "news": news_feed,
        "stats": {
            "unicornCount": len(tiered_drops['unicorn']),
            "rareMidrangeCount": len(tiered_drops['rare_midrange']),
            "valueCount": len(tiered_drops['value']),
            "alertCount": sum(1 for n in news_feed if n.get('is_alert')),
            "totalTracked": len(keywords['all'])
        },
        "meta": {
            "nextExpectedBTAC": "Fall 2025 (Sept-Oct)",
            "nextExpectedPappy": "Fall 2025 (Oct-Nov)",
            "watchlistActive": len(watchlist)
        }
    }
    
    # Ensure directory exists and write
    os.makedirs("data", exist_ok=True)
    
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(output, f, indent=2)
    
    print(f"\n✅ Data saved to {OUTPUT_FILE}")
    print(f"📊 Summary:")
    print(f"   • Drops: {len(all_drops)}")
    print(f"   • News/Alerts: {len(news_feed)}")
    print(f"   • Market Items: {len(sales)}")
    print(f"   • Alerts: {output['stats']['alertCount']}")
    
    return output

if __name__ == "__main__":
    main()
