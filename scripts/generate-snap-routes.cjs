/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SERVICES_FILE = path.join(ROOT, "src", "data", "services.ts");
const PACKAGE_JSON = path.join(ROOT, "package.json");

function extractServiceIds(tsSource) {
  // Берём id: "sea" и т.п.
  const re = /id:\s*["']([^"']+)["']/g;
  const ids = new Set();
  let m;
  while ((m = re.exec(tsSource))) ids.add(m[1]);
  return Array.from(ids);
}

function main() {
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
    "/news", // если есть листинг новостей
  ];

  const serviceRoutes = ids.map((id) => `/services/${id}`);

  const include = Array.from(new Set([...baseRoutes, ...serviceRoutes]));

  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, "utf8"));

  pkg.reactSnap = pkg.reactSnap || {};
  pkg.reactSnap.source = "dist";
  pkg.reactSnap.minifyHtml = true;
  pkg.reactSnap.skipThirdPartyRequests = true;
  pkg.reactSnap.puppeteerArgs = ["--no-sandbox", "--disable-setuid-sandbox"];
  pkg.reactSnap.include = include;

  fs.writeFileSync(PACKAGE_JSON, JSON.stringify(pkg, null, 2) + "\n", "utf8");

  console.log("[generate-snap-routes] include routes:", include);
}

main();
