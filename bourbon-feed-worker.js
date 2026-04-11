// ============================================
// Cloudflare Worker: bourbon-feed-worker.js
// Deploy this to Cloudflare Workers (free tier)
// ============================================

// Your OpenClaw Gateway details
const GATEWAY_HOST = 'your-gateway-host'; // e.g., 'your-server.com'
const GATEWAY_TOKEN = 'your-gateway-token'; // Optional, if auth enabled

// CORS headers for your domain
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://www.bourbonfoxhound.com',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    
    // Only allow GET requests
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { 
        status: 405,
        headers: CORS_HEADERS
      });
    }

    try {
      // Option A: Read from OpenClaw Gateway file endpoint
      // (Requires gateway.fileServer to be enabled in OpenClaw)
      const feedUrl = `https://${GATEWAY_HOST}/files/bourbon-drops.json`;
      
      // Option B: Or read from a public GitHub raw URL
      // const feedUrl = 'https://raw.githubusercontent.com/YOUR_USER/YOUR_REPO/main/bourbon-drops.json';
      
      // Option C: Or use Cloudflare KV for caching
      // const data = await env.BOURBON_KV.get('bourbon-drops', 'json');

      const response = await fetch(feedUrl, {
        headers: {
          'Authorization': GATEWAY_TOKEN ? `Bearer ${GATEWAY_TOKEN}` : '',
          'Accept': 'application/json'
        },
        cf: { cacheTtl: 300 } // Cache for 5 minutes
      });

      if (!response.ok) {
        throw new Error(`Upstream error: ${response.status}`);
      }

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: CORS_HEADERS,
        status: 200
      });

    } catch (err) {
      console.error('Worker error:', err);
      
      // Return stale data or empty structure as fallback
      return new Response(JSON.stringify({
        lastUpdated: new Date().toISOString(),
        drops: [],
        news: [],
        sales: [],
        error: 'Unable to fetch latest data'
      }), {
        headers: CORS_HEADERS,
        status: 200 // Still return 200 so client handles gracefully
      });
    }
  }
};

/* ============================================
   DEPLOYMENT INSTRUCTIONS:
   
   1. Go to https://dash.cloudflare.com
   2. Workers & Pages → Create application
   3. Create Worker → Edit code
   4. Paste this code, save and deploy
   5. Get your worker URL: https://your-worker.your-subdomain.workers.dev
   6. Update BOURBON_FEED_URL in bourbon-foxhound-embed.js
   
   ALTERNATIVE: GitHub Pages (no worker needed)
   ============================================
   
   If you push bourbon-drops.json to a GitHub repo
   and enable GitHub Pages, you can fetch directly:
   
   https://raw.githubusercontent.com/USER/REPO/main/bourbon-drops.json
   
   Just add CORS anywhere or use a CORS proxy.
*/
