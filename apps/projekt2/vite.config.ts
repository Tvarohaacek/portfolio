import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/projekt2/",
  plugins: [react()],
  build: {
    outDir: "../../projekt2",
    emptyOutDir: true,
  },
});
