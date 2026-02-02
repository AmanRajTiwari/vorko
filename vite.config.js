import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          motion: ["framer-motion"],
          supabase: ["@supabase/supabase-js"],
          gsap: ["gsap"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
