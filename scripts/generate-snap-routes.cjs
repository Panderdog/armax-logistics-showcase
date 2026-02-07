/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SERVICES_FILE = path.join(ROOT, "src", "data", "services.ts");
const NEWS_JSON = path.join(ROOT, "src", "generated", "news.prerender.json");
const PACKAGE_JSON = path.join(ROOT, "package.json");

function extractServiceIds(tsSource) {
  // Берём id: "sea" и т.п.
  const re = /id:\s*["']([^"']+)["']/g;
  const ids = new Set();
  let m;
  while ((m = re.exec(tsSource))) ids.add(m[1]);
  return Array.from(ids);
}

function loadNewsRoutes() {
  // Check if news JSON exists
  if (!fs.existsSync(NEWS_JSON)) {
    console.warn("⚠️  WARNING: News export file not found!");
    console.warn(`   Expected: ${NEWS_JSON}`);
    console.warn("   Building without news routes.");
    return [];
  }

  try {
    const newsData = JSON.parse(fs.readFileSync(NEWS_JSON, "utf8"));
    
    if (!Array.isArray(newsData) || newsData.length === 0) {
      console.warn("⚠️  WARNING: News export is empty!");
      console.warn("   Building without news routes.");
      console.warn("   Consider adding news articles via admin panel.");
      return [];
    }

    // Generate routes for each news article
    const routes = newsData.map(article => `/news/${article.slug}`);
    console.log(`✅ Loaded ${routes.length} news routes from real data`);
    
    return routes;
  } catch (error) {
    console.error("❌ ERROR: Failed to parse news JSON:", error.message);
    process.exit(1);
  }
}

function main() {
  console.log("🔄 Generating react-snap routes...");
  
  // Load services
  const ts = fs.readFileSync(SERVICES_FILE, "utf8");
  const ids = extractServiceIds(ts);

  if (!ids.length) {
    throw new Error("Не смог найти id услуг в src/data/services.ts");
  }

  const baseRoutes = [
    "/",
    "/services",
    "/about",
    "/geography",
    "/reviews",
    "/contacts",
    "/faq",
    "/privacy",
    "/news",
  ];

  const serviceRoutes = ids.map((id) => `/services/${id}`);
  const newsRoutes = loadNewsRoutes(); // Load real news routes

  const include = Array.from(new Set([...baseRoutes, ...serviceRoutes, ...newsRoutes]));

  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, "utf8"));

  pkg.reactSnap = pkg.reactSnap || {};
  pkg.reactSnap.source = "dist";
  pkg.reactSnap.minifyHtml = true;
  pkg.reactSnap.skipThirdPartyRequests = true;
  pkg.reactSnap.puppeteerArgs = ["--no-sandbox", "--disable-setuid-sandbox"];
  pkg.reactSnap.include = include;

  fs.writeFileSync(PACKAGE_JSON, JSON.stringify(pkg, null, 2) + "\n", "utf8");

  console.log("✅ Generated routes for react-snap:");
  console.log(`   - ${baseRoutes.length} base routes`);
  console.log(`   - ${serviceRoutes.length} service routes`);
  console.log(`   - ${newsRoutes.length} news routes`);
  console.log(`   Total: ${include.length} routes`);
}

main();
