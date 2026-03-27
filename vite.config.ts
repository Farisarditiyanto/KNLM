import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

const asyncCssPlugin = () => ({
  name: 'async-css',
  transformIndexHtml(html: string) {
    return html.replace(
      /<link[^>]*?rel="stylesheet"[^>]*?>/g,
      (match) => {
        const hrefMatch = match.match(/href="([^"]+?\.css)"/);
        if (hrefMatch) {
          const href = hrefMatch[1];
          return `<link rel="preload" as="style" href="${href}">\n    <link rel="stylesheet" href="${href}" media="print" onload="this.media='all'">\n    <noscript><link rel="stylesheet" href="${href}"></noscript>`;
        }
        return match;
      }
    );
  }
});

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), asyncCssPlugin()],
    build: {
      modulePreload: {
        polyfill: true,
        resolveDependencies: (filename, deps, { hostId, hostType }) => {
          return deps;
        },
      },
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
