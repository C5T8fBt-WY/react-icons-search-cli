import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/cli.ts", "src/index.ts"],
  external: ["commander", "react", "react-dom", "react-dom/server", "react-icons", "yaml"],
  format: ["esm"],
  outDir: "dist",
  platform: "node",
  sourcemap: true,
  target: "node18",
});
