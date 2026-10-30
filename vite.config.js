import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    {
      name: 'dev-html-transform',
      transformIndexHtml(html, ctx) {
        if (ctx && ctx.server) {
          return html
            .replace(
              /<script type="module" crossorigin src="\.\/assets\/index-[^"]+"><\/script>/,
              '<script type="module" src="/src/main.jsx"></script>'
            )
            .replace(
              /<link rel="stylesheet" crossorigin href="\.\/assets\/index-[^"]+">/,
              ''
            );
        }
        return html;
      },
    },
  ],
  base: './',
}))
