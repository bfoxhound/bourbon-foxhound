// ============================================
// bourbon-foxhound-embed.js
// Drop this into your bourbonfoxhound.com site
// ============================================

// Configuration
const BOURBON_FEED_URL = 'https://bfoxhound.github.io/bourbon-foxhound-data/bourbon-drops.json';

// Fetch and render bourbon data
async function loadBourbonDrops() {
  const container = document.getElementById('bourbon-feed');
  if (!container) {
    console.error('Bourbon feed container not found. Add: <div id="bourbon-feed"></div>');
    return;
  }

  try {
    container.innerHTML = '<p>Loading bourbon updates...</p>';
    
    const response = await fetch(BOURBON_FEED_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    renderBourbonFeed(container, data);
    
  } catch (err) {
    console.error('Failed to load bourbon feed:', err);
    container.innerHTML = '<p class="bourbon-error">Unable to load updates. Check back soon.</p>';
  }
}

function renderBourbonFeed(container, data) {
  const lastUpdated = new Date(data.lastUpdated).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
  });

  let html = `
    <div class="bourbon-feed-header">
      <h3>🥃 Latest Bourbon Drops</h3>
      <span class="bourbon-updated">Updated: ${lastUpdated}</span>
    </div>
  `;

  // New Releases / Drops
  if (data.drops?.length > 0) {
    html += '<section class="bourbon-section"><h4>New Releases</h4><div class="bourbon-grid">';
    data.drops.forEach(drop => {
      html += `
        <article class="bourbon-card bourbon-drop">
          <div class="bourbon-card-header">
            <h5><a href="${drop.url}" target="_blank" rel="noopener">${escapeHtml(drop.title)}</a></h5>
            <span class="bourbon-tag">${drop.type}</span>
          </div>
          <p class="bourbon-summary">${escapeHtml(drop.summary)}</p>
          <div class="bourbon-meta">
            ${drop.age ? `<span class="bourbon-age">${drop.age}</span>` : ''}
            ${drop.proof ? `<span class="bourbon-proof">${drop.proof} proof</span>` : ''}
            ${drop.price ? `<span class="bourbon-price">${drop.price}</span>` : ''}
            <span class="bourbon-source">${escapeHtml(drop.source)}</span>
          </div>
        </article>
      `;
    });
    html += '</div></section>';
  }

  // Sales
  if (data.sales?.length > 0) {
    html += '<section class="bourbon-section"><h4>🔥 Current Sales</h4><div class="bourbon-grid">';
    data.sales.forEach(sale => {
      const savings = calculateSavings(sale.originalPrice, sale.salePrice);
      html += `
        <article class="bourbon-card bourbon-sale">
          <div class="bourbon-card-header">
            <h5><a href="${sale.url}" target="_blank" rel="noopener">${escapeHtml(sale.product)}</a></h5>
            <span class="bourbon-tag sale">SALE</span>
          </div>
          <div class="bourbon-prices">
            <span class="bourbon-original">${sale.originalPrice}</span>
            <span class="bourbon-sale-price">${sale.salePrice}</span>
            ${savings ? `<span class="bourbon-savings">Save ${savings}</span>` : ''}
          </div>
          <span class="bourbon-source">${escapeHtml(sale.source)}</span>
        </article>
      `;
    });
    html += '</div></section>';
  }

  // News
  if (data.news?.length > 0) {
    html += '<section class="bourbon-section"><h4>📰 News</h4><ul class="bourbon-news-list">';
    data.news.forEach(news => {
      html += `
        <li class="bourbon-news-item">
          <a href="${news.url}" target="_blank" rel="noopener">${escapeHtml(news.title)}</a>
          <span class="bourbon-news-source">${escapeHtml(news.source)}</span>
        </li>
      `;
    });
    html += '</ul></section>';
  }

  container.innerHTML = html;
}

// Helper: Calculate savings percentage
function calculateSavings(original, sale) {
  const orig = parseFloat(original?.replace(/[^0-9.]/g, ''));
  const s = parseFloat(sale?.replace(/[^0-9.]/g, ''));
  if (orig && s && orig > s) {
    const pct = Math.round(((orig - s) / orig) * 100);
    return `${pct}%`;
  }
  return null;
}

// Helper: Escape HTML
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Auto-load when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadBourbonDrops);
} else {
  loadBourbonDrops();
}

// Optional: Refresh every 30 minutes
setInterval(loadBourbonDrops, 30 * 60 * 1000);
