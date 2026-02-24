import sharp from 'sharp';

async function optimizeOG() {
  await sharp('public/og-armax-original.png')
    .resize(1200, 630, {
      fit: 'cover',
      position: 'center'
    })
    .png({
      quality: 90,
      compressionLevel: 9
    })
    .toFile('public/og-armax-new.png');
  
  console.log('✅ OG image optimized successfully');
}

optimizeOG().catch(console.error);
