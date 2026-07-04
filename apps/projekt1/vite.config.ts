import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  base: "/projekt1/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2020",
    outDir: "../../projekt1",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Rozdělení bundlu pro lepší cache a rychlejší první načtení
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("/react/") || id.includes("/react-dom/")) return "react";
          if (id.includes("/framer-motion/")) return "motion";
          if (id.includes("/react-hook-form/") || id.includes("/@hookform/") || id.includes("/zod/")) return "form";
        },
      },
    },
  },
});
