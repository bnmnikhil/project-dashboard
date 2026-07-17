import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: '/' is correct for Cloudflare Pages and for a custom domain.
// For GitHub Pages served under a sub-path (https://<user>.github.io/<repo>/),
// set base to '/<repo>/' — e.g. VITE_BASE=/project-dashboard/ npm run build.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
});
