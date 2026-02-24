import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

async function optimizeOGImage() {
  const inputPath = join(process.cwd(), 'public/og-armax.png');
  const outputPath = join(process.cwd(), 'public/og-armax-optimized.png');
  
  // Optimize OG image: resize to 1200x630 (standard) and compress
  await sharp(inputPath)
    .resize(1200, 630, {
      fit: 'cover',
      position: 'center'
    })
    .png({
      quality: 90,
      compressionLevel: 9,
      palette: true
    })
    .toFile(outputPath);
  
  const stats = await sharp(outputPath).metadata();
  console.log(`✓ Optimized OG image: ${stats.width}x${stats.height}`);
  
  // Create favicon.ico (multi-size ICO file)
  // ICO format with 16x16, 32x32, 48x48
  const svgBuffer = readFileSync(join(process.cwd(), 'public/favicon.svg'));
  
  const sizes = [16, 32, 48];
  const iconBuffers = [];
  
  for (const size of sizes) {
    const buffer = await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer();
    iconBuffers.push({ size, buffer });
    console.log(`✓ Generated ${size}x${size} icon for favicon.ico`);
  }
  
  // For simplicity, use the 32x32 as favicon.ico
  // (proper multi-resolution ICO requires a library like to-ico)
  const favicon32 = await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toBuffer();
  
  writeFileSync(join(process.cwd(), 'public/favicon.ico'), favicon32);
  console.log('✓ Created favicon.ico');
  
  console.log('\n✅ All optimizations complete!');
}

optimizeOGImage().catch(console.error);
