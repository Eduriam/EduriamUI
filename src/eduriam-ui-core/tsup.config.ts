import type { Plugin } from "esbuild";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { defineConfig } from "tsup";

/**
 * Emit .wav files as data URLs with MIME type audio/wav (browsers may reject audio/wave).
 */
const wavDataUrlPlugin: Plugin = {
  name: "wav-dataurl",
  setup(build) {
    build.onLoad({ filter: /\.wav$/ }, async (args) => {
      const buf = await fs.readFile(args.path);
      const base64 = buf.toString("base64");
      const ext = path.extname(args.path).toLowerCase();
      const mime = ext === ".wav" ? "audio/wav" : "audio/wave";
      const contents = `export default "data:${mime};base64,${base64}";`;
      return { contents, loader: "js" };
    });
  },
};

export default defineConfig([
  {
    format: ["esm"] as const,
    sourcemap: true,
    loader: {
      ".svg": "dataurl",
    },
    esbuildPlugins: [wavDataUrlPlugin],
    entry: ["src/index.ts"],
    outExtension: () => ({
      js: ".mjs",
    }),
    splitting: false,
    clean: true,
  },
  {
    format: ["esm"] as const,
    sourcemap: true,
    loader: {
      ".svg": "dataurl",
    },
    esbuildPlugins: [wavDataUrlPlugin],
    entry: ["src/mermaid.ts"],
    outExtension: () => ({
      js: ".mjs",
    }),
    splitting: true,
    noExternal: ["mermaid"],
    clean: false,
  },
]);
