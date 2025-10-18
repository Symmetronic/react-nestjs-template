import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export const API_BASE_URL = "/api";
export const port = 4200;

export default defineConfig({
  plugins: [
    checker({ typescript: true }),
    tanstackRouter({ autoCodeSplitting: true, target: "react" }),
    react(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port,
    proxy: {
      [API_BASE_URL]: {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), ""),
      },
    },
  },
});
