import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    target: "es2018",
  },
  build: {
    target: "es2018",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Optimize bundle splitting for better TBT (Total Blocking Time)
          // Split large vendor libraries into separate chunks for parallel parsing
          
          // React core - загружается первым
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }
          
          // React Router - отдельный чанк для навигации
          if (id.includes('node_modules/react-router')) {
            return 'react-router';
          }
          
          // Radix UI - большая UI библиотека
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix-ui';
          }
          
          // React Query - управление состоянием
          if (id.includes('node_modules/@tanstack/react-query')) {
            return 'react-query';
          }
          
          // Lenis + smooth scroll
          if (id.includes('node_modules/lenis')) {
            return 'lenis';
          }
          
          // Chart libraries (recharts)
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-')) {
            return 'charts';
          }
          
          // Lucide icons
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          
          // Остальные зависимости
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimize CSS delivery
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // Enable CSS minification
    cssMinify: true,
    // Increase chunk size warning limit (we're intentionally splitting)
    chunkSizeWarningLimit: 1000,
  },
}));
