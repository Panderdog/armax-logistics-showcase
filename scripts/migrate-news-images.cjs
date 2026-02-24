#!/usr/bin/env node
/**
 * One-time migration: updates news image paths in Supabase DB
 * from /images/newsX.webp → /images/news/newsX.webp
 *
 * Usage:
 *   node scripts/migrate-news-images.cjs <email> <password>
 *
 * After successful run you can delete the old image copies:
 *   rm public/images/news1.webp public/images/news2.webp public/images/news-hero.webp
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env
try {
  const envContent = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim();
    }
  });
} catch (_) {}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !ANON_KEY) {
  console.error('❌ VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not found in .env');
  process.exit(1);
}

const [, , email, password] = process.argv;
if (!email || !password) {
  console.error('Usage: node scripts/migrate-news-images.cjs <email> <password>');
  process.exit(1);
}

// Paths to migrate: old path → new path
const IMAGE_MIGRATIONS = [
  { from: '/images/news1.webp',    to: '/images/news/news1.webp' },
  { from: '/images/news2.webp',    to: '/images/news/news2.webp' },
  { from: '/images/news-hero.webp', to: '/images/news/news-hero.webp' },
];

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch (_) { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function makeOptions(method, pathname, token) {
  const url = new URL(SUPABASE_URL);
  return {
    hostname: url.hostname,
    path: pathname,
    method,
    headers: {
      'apikey': ANON_KEY,
      'Authorization': `Bearer ${token || ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
  };
}

async function signIn() {
  console.log(`🔐 Signing in as ${email}...`);
  const body = JSON.stringify({ email, password });
  const url = new URL(SUPABASE_URL);
  const options = {
    hostname: url.hostname,
    path: '/auth/v1/token?grant_type=password',
    method: 'POST',
    headers: {
      'apikey': ANON_KEY,
      'Content-Type': 'application/json',
    },
  };
  const res = await request(options, body);
  if (res.status !== 200 || !res.body.access_token) {
    console.error('❌ Auth failed:', res.body.error_description || res.body);
    process.exit(1);
  }
  console.log('✅ Signed in');
  return res.body.access_token;
}

async function fetchAllNews(token) {
  const options = makeOptions('GET', '/rest/v1/news?select=id,preview_image,og_image', token);
  const res = await request(options);
  if (res.status !== 200) {
    console.error('❌ Failed to fetch news:', res.body);
    process.exit(1);
  }
  return res.body;
}

async function updateRecord(token, id, patch) {
  const body = JSON.stringify(patch);
  const options = makeOptions('PATCH', `/rest/v1/news?id=eq.${id}`, token);
  const res = await request(options, body);
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(res.body)}`);
  }
  return res.body;
}

async function run() {
  const token = await signIn();
  const news = await fetchAllNews(token);
  console.log(`📋 Found ${news.length} news record(s) in DB\n`);

  let updated = 0;

  for (const article of news) {
    const patch = {};

    for (const { from, to } of IMAGE_MIGRATIONS) {
      if (article.preview_image === from) patch.preview_image = to;
      if (article.og_image === from)      patch.og_image = to;
    }

    if (Object.keys(patch).length === 0) continue;

    console.log(`🔄 Updating article ${article.id}:`, patch);
    try {
      await updateRecord(token, article.id, patch);
      console.log(`   ✅ Done`);
      updated++;
    } catch (err) {
      console.error(`   ❌ Failed:`, err.message);
    }
  }

  if (updated === 0) {
    console.log('ℹ️  No records needed updating (paths already correct or not matched).');
  } else {
    console.log(`\n✅ Updated ${updated} record(s).`);
    console.log('\nNow you can remove the old image copies:');
    console.log('  rm public/images/news1.webp public/images/news2.webp public/images/news-hero.webp');
  }
}

run().catch(err => {
  console.error('❌ Unexpected error:', err);
  process.exit(1);
});
