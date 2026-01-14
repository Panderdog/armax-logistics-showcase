#!/usr/bin/env node
/**
 * Copy .htaccess to dist folder
 * Vite doesn't copy dotfiles by default, so we do it manually
 */

const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', 'public', '.htaccess');
const dest = path.join(__dirname, '..', 'dist', '.htaccess');

if (fs.existsSync(source)) {
  fs.copyFileSync(source, dest);
  console.log('✅ Copied .htaccess to dist/');
} else {
  console.warn('⚠️  .htaccess not found in public/');
}
