/**
 * Use the Prism instance from prism-react-renderer, which comes with many
 * languages pre-registered (markup/html, javascript, typescript, python, css,
 * json, jsx, tsx, yaml, markdown, graphql, sql, c, cpp, etc.).
 *
 * We also set globalThis.Prism so that standalone prismjs component files
 * (e.g. prism-bash.js) can find and attach to the same instance.
 */
// prism-react-renderer re-exports its vendored Prism as a namespace
import { Prism } from "prism-react-renderer";

// Expose globally so prismjs component IIFE scripts attach to this instance.
if (typeof globalThis !== "undefined") {
  (globalThis as typeof globalThis & { Prism: typeof Prism }).Prism =
    Prism as typeof Prism;
}

export { Prism };
