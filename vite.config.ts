import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:map";
          @use "sass:color";
          @import "@/styles/base/variables";
          @import "@/styles/base/mixins";
          @import "@/styles/base/globals";
        `,
        silenceDeprecations: ['import', 'global-builtin', 'color-functions']
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
