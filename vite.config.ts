import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, type Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function geminiServerPlugin(): Plugin {
  return {
    name: 'gemini-server-plugin',
    async configureServer(server) {
      const { handleGeminiApi } = await import('./server/geminiHandler.ts');
      server.middlewares.use('/api/gemini', (req, res) => {
        handleGeminiApi(req, res);
      });
    },
    async configurePreviewServer(server) {
      const { handleGeminiApi } = await import('./server/geminiHandler.ts');
      server.middlewares.use('/api/gemini', (req, res) => {
        handleGeminiApi(req, res);
      });
    },
  };
}

export default defineConfig(() => {
  return {
    root: __dirname,
    plugins: [react(), tailwindcss(), geminiServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
