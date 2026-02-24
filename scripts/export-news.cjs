#!/usr/bin/env node
/**
 * Export real news from Supabase to JSON for static prerendering
 * This script runs BEFORE build to ensure react-snap has real data
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Try to load .env file for local development
try {
  const dotenvPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(dotenvPath)) {
    const envContent = fs.readFileSync(dotenvPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=:#]+)=(.*)$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2].trim();
      }
    });
  }
} catch (error) {
  // In CI/CD, .env might not exist - that's ok, variables come from system
}

// Read Supabase config from environment
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

// Exit codes for different failure scenarios
const EXIT_CODES = {
  NO_CONFIG: 1,
  FETCH_ERROR: 2,
  NO_NEWS: 3,
  WRITE_ERROR: 4,
};

async function exportNews() {
  console.log('🔄 Exporting news from Supabase...');

  // Check if Supabase is configured
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ ERROR: Supabase is not configured!');
    console.error('   Required: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or VITE_SUPABASE_ANON_KEY)');
    console.error('   This is a critical error for production build.');
    process.exit(EXIT_CODES.NO_CONFIG);
  }

  try {
    // Fetch published news via Supabase REST API directly (avoids fetch CJS issues)
    const data = await new Promise((resolve, reject) => {
      const url = new URL(`${supabaseUrl}/rest/v1/news`);
      url.searchParams.set('published', 'eq.true');
      url.searchParams.set('order', 'created_at.desc');

      const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'GET',
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try { resolve(JSON.parse(body)); }
            catch (e) { reject(new Error(`Invalid JSON response: ${body}`)); }
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${body}`));
          }
        });
      });

      req.on('error', reject);
      req.end();
    });

    if (!data || data.length === 0) {
      console.warn('⚠️  WARNING: No published news found in database!');
      console.warn('   Building with empty news list.');
      console.warn('   Consider adding news articles via admin panel.');
      
      // Create empty news array for build
      const newsItems = [];
      
      // Ensure output directory exists
      const outputDir = path.join(__dirname, '..', 'src', 'generated');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write empty JSON file
      const jsonPath = path.join(outputDir, 'news.prerender.json');
      fs.writeFileSync(jsonPath, JSON.stringify(newsItems, null, 2), 'utf8');

      // Write empty TypeScript module
      const tsContent = `// Auto-generated file - DO NOT EDIT
// Generated at: ${new Date().toISOString()}
// This file is created by scripts/export-news.cjs during build

export const prerenderNews = [] as const;

export type NewsItem = {
  id: number;
  title: string;
  slug: string;
  content: string;
  previewText?: string;
  previewImage?: string;
  tags?: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
  noindex?: boolean;
};
`;
      const tsPath = path.join(outputDir, 'news.prerender.ts');
      fs.writeFileSync(tsPath, tsContent, 'utf8');
      
      console.log('✅ Created empty news files for build');
      return; // Exit successfully
    }

    // Map database fields to frontend format
    const newsItems = data.map(row => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      previewText: row.preview_text,
      previewImage: row.preview_image || undefined,
      tags: row.tags || [],
      published: row.published,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      meta_title: row.meta_title || undefined,
      meta_description: row.meta_description || undefined,
      og_image: row.og_image || undefined,
      noindex: row.noindex || false,
    }));

    // Ensure output directory exists
    const outputDir = path.join(__dirname, '..', 'src', 'generated');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write to JSON file (for route generation)
    const jsonPath = path.join(outputDir, 'news.prerender.json');
    fs.writeFileSync(jsonPath, JSON.stringify(newsItems, null, 2), 'utf8');

    // Write to TypeScript module (for frontend import)
    const tsContent = `// Auto-generated file - DO NOT EDIT
// Generated at: ${new Date().toISOString()}
// This file is created by scripts/export-news.cjs during build

export const prerenderNews = ${JSON.stringify(newsItems, null, 2)} as const;

export type NewsItem = typeof prerenderNews[number];
`;
    const tsPath = path.join(outputDir, 'news.prerender.ts');
    fs.writeFileSync(tsPath, tsContent, 'utf8');

    console.log(`✅ Successfully exported ${newsItems.length} news articles`);
    console.log(`   JSON: ${jsonPath}`);
    console.log(`   TS Module: ${tsPath}`);
    console.log('   Articles:');
    newsItems.forEach(item => {
      console.log(`     - ${item.slug}`);
    });

  } catch (error) {
    console.error('❌ ERROR: Unexpected error during export:', error.message);
    process.exit(EXIT_CODES.WRITE_ERROR);
  }
}

// Run export
exportNews();
