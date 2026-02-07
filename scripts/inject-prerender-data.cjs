#!/usr/bin/env node
/**
 * Inject prerendered data into HTML as inline script
 * This ensures data is available synchronously before React mounts
 * Prevents duplicate injections by removing existing ones first
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const NEWS_JSON = path.join(ROOT, 'src', 'generated', 'news.prerender.json');
const INDEX_HTML = path.join(ROOT, 'index.html');

function main() {
  console.log('🔄 Injecting prerender data into HTML...');

  // Check if news JSON exists
  if (!fs.existsSync(NEWS_JSON)) {
    console.warn('⚠️  News export file not found, skipping injection');
    return;
  }

  // Read news data
  const newsData = JSON.parse(fs.readFileSync(NEWS_JSON, 'utf8'));
  console.log(`   Found ${newsData.length} news articles`);

  // Read index.html
  let html = fs.readFileSync(INDEX_HTML, 'utf8');

  // Remove any existing prerender data injection to prevent duplicates
  const prerenderScriptRegex = /<script>\s*\/\/ Prerendered data injected at build time[\s\S]*?window\.__PRERENDER_NEWS__[\s\S]*?<\/script>/g;
  html = html.replace(prerenderScriptRegex, '');

  // Create inline script with data
  const inlineScript = `
    <script>
      // Prerendered data injected at build time
      window.__PRERENDER_NEWS__ = ${JSON.stringify(newsData)};
    </script>`;

  // Inject before </head>
  const modifiedHtml = html.replace('</head>', `${inlineScript}\n  </head>`);

  // Write back
  fs.writeFileSync(INDEX_HTML, modifiedHtml, 'utf8');

  console.log('✅ Successfully injected prerender data into index.html');
}

main();
