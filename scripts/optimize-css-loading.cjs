/**
 * Optimize CSS loading by adding preload with proper onload handler
 * This makes CSS non-render-blocking while still loading it as soon as possible
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function optimizeCSSLoading() {
  try {
    const distPath = path.join(__dirname, '../dist');
    
    // Find all HTML files in dist
    const htmlFiles = await glob('**/*.html', { cwd: distPath });
    
    console.log('🔧 Optimizing CSS loading in HTML files...');
    
    for (const file of htmlFiles) {
      const filePath = path.join(distPath, file);
      let html = fs.readFileSync(filePath, 'utf-8');
      
      // Replace CSS link tags to use non-blocking load technique
      // <link rel="stylesheet" crossorigin="" href="...css"> becomes:
      // <link rel="preload" as="style" href="...css" onload="this.onload=null;this.rel='stylesheet'">
      // <noscript><link rel="stylesheet" href="...css"></noscript>
      
      html = html.replace(
        /<link\s+rel="stylesheet"\s+crossorigin(?:="")?\s+href="([^"]+\.css)"\s*\/?>/gi,
        (match, href) => {
          return `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="${href}"></noscript>`;
        }
      );
      
      // Also handle cases where crossorigin comes after href
      html = html.replace(
        /<link\s+rel="stylesheet"\s+href="([^"]+\.css)"\s+crossorigin(?:="")?\s*\/?>/gi,
        (match, href) => {
          return `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="${href}"></noscript>`;
        }
      );
      
      fs.writeFileSync(filePath, html, 'utf-8');
      console.log(`✅ Optimized: ${file}`);
    }
    
    console.log('✨ CSS loading optimization complete!');
  } catch (error) {
    console.error('❌ Error optimizing CSS loading:', error);
    process.exit(1);
  }
}

optimizeCSSLoading();
