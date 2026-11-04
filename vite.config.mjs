import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  build: { outDir: "dist", target: "es2020" },
  test: { environment: "jsdom", globals: true, setupFiles: ["./src/setupTests.js"] },
});
