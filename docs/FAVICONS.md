# Favicons Configuration

## Overview

This project includes a comprehensive favicon setup for optimal display across all platforms, browsers, and search engines.

## Generated Files

All favicon files are located in `/public/`:

- `favicon.svg` - Original SVG icon (vector, scalable)
- `favicon-16x16.png` - 16x16 PNG for browser tabs
- `favicon-32x32.png` - 32x32 PNG for browser tabs and bookmarks
- `apple-touch-icon.png` - 180x180 PNG for iOS home screen
- `android-chrome-192x192.png` - 192x192 PNG for Android devices
- `android-chrome-512x512.png` - 512x512 PNG for high-resolution Android displays
- `site.webmanifest` - Web app manifest for PWA support
- `browserconfig.xml` - Windows tile configuration

## HTML Implementation

The following meta tags and links are included in `index.html`:

```html
<!-- Favicons for different contexts -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />

<!-- Theme colors for mobile browsers -->
<meta name="theme-color" content="#0A0F18" />
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#EDE7DF" />
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0A0F18" />

<!-- Open Graph / Social Media meta tags -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Armax Logistics — Международные перевозки без задержек" />
<meta property="og:description" content="..." />
<meta property="og:image" content="/og-armax.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="/og-armax.png" />
```

## Search Engine Display

For optimal display in search results (Google, Yandex, etc.):

1. **PNG favicons** are provided in multiple sizes (16x16, 32x32) - search engines prefer PNG over SVG
2. **Open Graph image** (`og-armax.png`) is used for rich snippets in social media and search
3. **Web manifest** provides app information for search engines and PWA support
4. **Theme colors** ensure proper mobile browser UI theming

## Browser Support

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge) - use SVG or PNG
- ✅ iOS Safari - uses `apple-touch-icon.png`
- ✅ Android Chrome - uses icons from `site.webmanifest`
- ✅ Windows/IE - uses `browserconfig.xml`
- ✅ Search engines - use PNG favicons and OG images

## Regenerating Favicons

If you need to regenerate PNG favicons from the SVG source:

```bash
# Create a temporary script
cat > generate-favicons.mjs << 'EOF'
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join } from 'path';

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

async function generateFavicons() {
  const svgBuffer = readFileSync(join(process.cwd(), 'public/favicon.svg'));

  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(process.cwd(), `public/${name}`));
    console.log(`✓ Generated ${name} (${size}x${size})`);
  }

  console.log('\n✅ All favicons generated successfully!');
}

generateFavicons().catch(console.error);
EOF

# Run the script
node generate-favicons.mjs

# Clean up
rm generate-favicons.mjs
```

## Testing

To verify favicons are working:

1. **Browser tabs**: Open the site and check if the icon appears in the tab
2. **Bookmarks**: Bookmark the site and verify the icon shows up
3. **Mobile home screen**: Add to home screen on iOS/Android
4. **Search engines**: Use Google's Rich Results Test or Yandex Webmaster Tools
5. **Social media**: Use Facebook's Sharing Debugger or Twitter Card Validator

## Notes

- The original SVG favicon (`favicon.svg`) should be edited when the logo changes
- After editing the SVG, regenerate all PNG versions using the script above
- Search engines may take time to update cached favicons (use webmaster tools to request recrawl)
- For immediate testing, clear browser cache and open in incognito/private mode
