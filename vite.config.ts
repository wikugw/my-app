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
          pdf: ["pdfjs-dist", "pdfjs-react-viewer"],
          vendor: ["@chakra-ui/react", "@emotion/react", "@emotion/styled", "framer-motion"],
          firebase: ["firebase/app", "firebase/auth", "firebase/storage", "firebase/firestore"],
          datePicker: ["react-datepicker", "date-fns"],
          swal: ["sweetalert2"],
        },
      },
    },
  }
});
