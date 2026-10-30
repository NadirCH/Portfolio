import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

console.log('[sync-root] Syncing production build to repository root for GitHub Pages...');

// 1. Ensure dist exists
if (!fs.existsSync(distDir)) {
  console.error('[sync-root] Error: dist directory does not exist! Run vite build first.');
  process.exit(1);
}

// 2. Copy dist/index.html to ./index.html
const distIndex = path.join(distDir, 'index.html');
const rootIndex = path.join(rootDir, 'index.html');
fs.copyFileSync(distIndex, rootIndex);
console.log('[sync-root] Copied dist/index.html -> ./index.html');

// 3. Create 404.html in root (for SPA routing fallback)
const root404 = path.join(rootDir, '404.html');
fs.copyFileSync(distIndex, root404);
console.log('[sync-root] Created ./404.html');

// 4. Create .nojekyll in root (bypasses Jekyll processing on GitHub Pages)
const nojekyll = path.join(rootDir, '.nojekyll');
fs.writeFileSync(nojekyll, '');
console.log('[sync-root] Created ./.nojekyll');

// 5. Copy dist/assets to ./assets
const distAssets = path.join(distDir, 'assets');
const rootAssets = path.join(rootDir, 'assets');
if (fs.existsSync(distAssets)) {
  fs.cpSync(distAssets, rootAssets, { recursive: true, force: true });
  console.log('[sync-root] Synced dist/assets -> ./assets');
}

// 6. Ensure NCH/index.html exists and redirects to ../
const nchDir = path.join(rootDir, 'NCH');
if (!fs.existsSync(nchDir)) {
  fs.mkdirSync(nchDir, { recursive: true });
}
const nchHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=../" />
    <script>window.location.replace('../');</script>
    <title>Nadir Chabani</title>
  </head>
  <body>
    <p>Redirecting to <a href="../">Nadir Chabani Portfolio</a>...</p>
  </body>
</html>`;
fs.writeFileSync(path.join(nchDir, 'index.html'), nchHtml);
console.log('[sync-root] Created NCH/index.html redirect');

console.log('[sync-root] Root directory successfully prepared for GitHub Pages!');
