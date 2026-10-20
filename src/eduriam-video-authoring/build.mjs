import { build } from "esbuild";
import { createHash } from "node:crypto";
import {
  copyFile,
  mkdir,
  readFile,
  readdir,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createGenerator } from "ts-json-schema-generator";

const root = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(root, "../eduriam-ui-x");
await mkdir(path.join(root, "dist"), { recursive: true });
const schema = createGenerator({
  path: path.join(source, "src/components/video-manager/video-slides/Slide.ts"),
  tsconfig: path.join(source, "tsconfig.json"),
  type: "Slide",
  skipTypeCheck: true,
  expose: "all",
}).createSchema("Slide");
await writeFile(path.join(root, "dist/schema.json"), JSON.stringify(schema));
for (const file of await readdir(path.join(root, "src")))
  if (file.endsWith(".mjs") || file.endsWith(".mts"))
    await copyFile(path.join(root, "src", file), path.join(root, "dist", file));

async function docs(dir) {
  const result = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) result.push(...(await docs(p)));
    else if (e.name.endsWith("authoring.json"))
      result.push(JSON.parse(await readFile(p, "utf8")));
  }
  return result;
}
const metadata = Object.fromEntries(
  (await docs(path.join(source, "src/components/video-manager"))).map(
    ({ type, ...doc }) => [type, doc],
  ),
);
await writeFile(
  path.join(root, "dist/guidance.mjs"),
  "export const componentGuidance=" + JSON.stringify(metadata) + ";\n",
);

const timingSource = path.join(
  source,
  "src/components/video-manager/video-timing/timing.ts",
);
const authoring = JSON.parse(
  await readFile(path.join(root, "package.json"), "utf8"),
);
const renderer = JSON.parse(
  await readFile(path.join(source, "package.json"), "utf8"),
);
await writeFile(
  path.join(root, "dist/versions.mjs"),
  `export const catalogVersion=${JSON.stringify(authoring.version)};export const rendererVersion=${JSON.stringify(renderer.version)};export const activityHash=${JSON.stringify(
    createHash("sha256")
      .update(await readFile(path.join(root, "src/timing.mjs")))
      .update(await readFile(timingSource))
      .digest("hex"),
  )};\n`,
);

const components = path.join(
  source,
  "src/components/video-manager/video-components/components",
);
await build({
  stdin: {
    contents: `import {CODE_EXPLAINER_CONFIG as code} from ${JSON.stringify(path.join(components, "CodeExplainer/constants.ts"))};import {TERMINAL_EXPLAINER_CONFIG as terminal} from ${JSON.stringify(path.join(components, "TerminalExplainer/constants.ts"))};import {MERMAID_DIAGRAM_CONFIG as diagram} from ${JSON.stringify(path.join(components, "diagrams/MermaidDiagram/constants.ts"))};export {frameTimeMs} from ${JSON.stringify(timingSource)};export const motion={code:code.transitionDurationMs,terminal:terminal.transitionDurationMs,diagram:diagram.transitionDurationMs};`,
    resolveDir: root,
  },
  outfile: path.join(root, "dist/motion.mjs"),
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
});
await build({
  entryPoints: [path.join(root, "dist/index.mjs")],
  outfile: path.join(root, "dist/catalog.mjs"),
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node22",
});
