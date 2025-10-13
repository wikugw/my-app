import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { visualizer } from 'rollup-plugin-visualizer'

// Needed because __dirname isn't defined in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), visualizer({ open: true })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["@chakra-ui/react", "@emotion/react", "@emotion/styled", "framer-motion"],
          firebase: ["firebase/app", "firebase/auth", "firebase/storage", "firebase/firestore"],
          datePicker: ["react-day-picker"],
          swal: ["sweetalert2"],
          validation: ["yup", "react-hook-form", "@hookform/resolvers/yup"],
        },
      },
    },
  }
});
