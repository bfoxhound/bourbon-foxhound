Monitor bourbon whiskey releases, industry news, and special sales. Search for: "bourbon drop", "bourbon release", "limited edition bourbon", "bourbon sale", "whiskey news". Focus on distilleries, retailers, and bourbon communities.

**OUTPUT REQUIREMENTS:**
After each search, write results to `/root/.openclaw/workspace/bourbon-drops.json` with this structure:
{
  "lastUpdated": "2025-01-20T10:00:00Z",
  "drops": [
    {
      "title": "Product name",
      "type": "drop|news|sale",
      "source": "Website name",
      "url": "https://...",
      "price": "$99",
      "msrp": "$129",
      "proof": 100,
      "age": "10 years",
      "summary": "Brief description",
      "date": "2025-01-15"
    }
  ],
  "news": [
    {
      "title": "Headline",
      "source": "Site",
      "url": "https://...",
      "summary": "Brief",
      "date": "2025-01-20"
    }
  ],
  "sales": [
    {
      "product": "Bottle name",
      "originalPrice": "$99",
      "salePrice": "$79",
      "source": "Retailer",
      "url": "https://...",
      "expires": "2025-01-25"
    }
  ]
}

Report new findings with details and links.