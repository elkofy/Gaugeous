import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "GaygeousJS",
      // the proper extensions will be added
      fileName: "gaugeous-js",
      formats: ["es", "cjs", "umd", "iife"],
    },
  },
});
