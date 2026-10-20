import Ajv from "ajv";
import { createHash } from "node:crypto";

import { componentGuidance } from "./guidance.mjs";
import { motion } from "./motion.mjs";
import schemaJson from "./schema.json" with { type: "json" };
import { activityHash, catalogVersion, rendererVersion } from "./versions.mjs";

export * from "./timing.mjs";
export const schema = schemaJson;

export { catalogVersion, rendererVersion };
const ajv = new Ajv({ strict: false, allErrors: true });
const validate = ajv.compile(schema);
export function validateSlide(definition) {
  return validate(definition)
    ? []
    : validate.errors.map((e) => ({
        path: e.instancePath,
        message: e.message,
      }));
}
export const catalog = Object.entries(schema.definitions ?? {}).flatMap(
  ([name, value]) => {
    const type =
      value.properties?.type?.const ??
      (value.properties?.type?.enum?.length === 1
        ? value.properties.type.enum[0]
        : null);
    if (!type) return [];
    const guidance = componentGuidance[type] ?? {
      purpose: "Present relevant educational content",
      tags: [type.toLowerCase()],
      capabilities: ["reveal"],
    };
    return [
      {
        id: name,
        type,
        ...guidance,
        schema: {
          $ref: "#/definitions/" + name,
          definitions: schema.definitions,
        },
        timing:
          "startTime/endTime are slide-relative; steps/items startTime are component-relative. Use explicit bookmark target paths.",
      },
    ];
  },
);
export const catalogHash = createHash("sha256")
  .update(
    JSON.stringify({
      schema,
      catalog,
      catalogVersion,
      rendererVersion,
      activityHash,
      motion,
    }),
  )
  .digest("hex");
export function searchComponents(query = "", limit = 10) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return catalog
    .map((c) => ({
      c,
      score: words.reduce(
        (n, w) =>
          n +
          Number(
            JSON.stringify({
              id: c.id,
              type: c.type,
              purpose: c.purpose,
              tags: c.tags,
              capabilities: c.capabilities,
            })
              .toLowerCase()
              .includes(w),
          ),
        0,
      ),
    }))
    .filter((x) => !words.length || x.score > 0)
    .sort((a, b) => b.score - a.score || a.c.type.localeCompare(b.c.type))
    .slice(0, Math.min(30, limit))
    .map(({ c }) => ({
      id: c.id,
      type: c.type,
      purpose: c.purpose,
      tags: c.tags,
      capabilities: c.capabilities,
    }));
}
export function componentDocumentation(type) {
  const result =
    catalog.find((c) => c.id === type) ?? catalog.find((c) => c.type === type);
  if (!result) throw Error("Unknown component type: " + type);
  const definitions = {};
  const visit = (value) => {
    if (!value || typeof value !== "object") return;
    if (value.$ref?.startsWith("#/definitions/")) {
      const key = decodeURIComponent(value.$ref.slice(14));
      if (!definitions[key]) {
        definitions[key] = schema.definitions[key];
        visit(definitions[key]);
      }
    }
    for (const [key, child] of Object.entries(value))
      if (key !== "definitions") visit(child);
  };
  visit(result.schema);
  return { ...result, schema: { $ref: result.schema.$ref, definitions } };
}
