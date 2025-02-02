import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/MyCoolAppFront/",
  plugins: [react()],
  build: {
    outDir: "build",
  },
});
