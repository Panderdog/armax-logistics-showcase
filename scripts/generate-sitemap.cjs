#!/usr/bin/env node
/**
 * Generate sitemap.xml with news articles from prerendered data
 * Automatically keeps sitemap in sync with actual published news
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://armaxstp.com';
const NEWS_JSON = path.join(__dirname, '..', 'src', 'generated', 'news.prerender.json');
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');

// Static pages (always in sitemap)
const STATIC_PAGES = [
  { url: '', priority: '1.0', changefreq: 'weekly' }, // homepage
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/services', priority: '0.9', changefreq: 'monthly' },
  { url: '/services/sea', priority: '0.7', changefreq: 'monthly' },
  { url: '/services/aviation', priority: '0.7', changefreq: 'monthly' },
  { url: '/services/railway', priority: '0.7', changefreq: 'monthly' },
  { url: '/services/auto', priority: '0.7', changefreq: 'monthly' },
  { url: '/services/consolidated', priority: '0.7', changefreq: 'monthly' },
  { url: '/services/customs', priority: '0.7', changefreq: 'monthly' },
  { url: '/services/warehouse', priority: '0.7', changefreq: 'monthly' },
  { url: '/services/insurance', priority: '0.7', changefreq: 'monthly' },
  { url: '/geography', priority: '0.8', changefreq: 'monthly' },
  { url: '/news', priority: '0.8', changefreq: 'daily' },
  { url: '/reviews', priority: '0.6', changefreq: 'monthly' },
  { url: '/faq', priority: '0.6', changefreq: 'monthly' },
  { url: '/contacts', priority: '0.7', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
];

function formatDate(dateString) {
  // Convert to ISO 8601 format (YYYY-MM-DD)
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

function generateSitemap() {
  console.log('📄 Generating sitemap.xml...');

  const today = new Date().toISOString().split('T')[0];

  // Read news from JSON
  let newsItems = [];
  if (fs.existsSync(NEWS_JSON)) {
    const newsData = JSON.parse(fs.readFileSync(NEWS_JSON, 'utf8'));
    newsItems = newsData.filter(item => item.published);
    console.log(`   Found ${newsItems.length} published news articles`);
  } else {
    console.warn('   ⚠️  No news.prerender.json found, generating sitemap with static pages only');
  }

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static pages (no trailing slash to match canonical URLs)
  for (const page of STATIC_PAGES) {
    const loc = page.url === '' ? `${SITE_URL}/` : `${SITE_URL}${page.url}`;
    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    if (page.priority) xml += `    <priority>${page.priority}</priority>\n`;
    if (page.changefreq) xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += '  </url>\n';
  }

  // Add news articles
  for (const article of newsItems) {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}/news/${article.slug}</loc>\n`;
    xml += `    <lastmod>${formatDate(article.updatedAt || article.createdAt)}</lastmod>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  // Write sitemap
  fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
  console.log(`✅ Sitemap generated: ${SITEMAP_PATH}`);
  console.log(`   Total URLs: ${STATIC_PAGES.length + newsItems.length}`);
}

// Run
try {
  generateSitemap();
  process.exit(0);
} catch (error) {
  console.error('❌ Failed to generate sitemap:', error.message);
  process.exit(1);
}
