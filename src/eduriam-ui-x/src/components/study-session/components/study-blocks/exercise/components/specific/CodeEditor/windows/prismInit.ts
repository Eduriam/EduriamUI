/**
 * Prism initialization: re-exports the pre-configured Prism from
 * prism-react-renderer (which bundles markup, js, ts, python, css, json,
 * jsx, tsx, yaml, markdown, graphql, sql, c, cpp, etc.).
 *
 * Additional languages not included in prism-react-renderer (e.g. bash)
 * are loaded below. prismSetGlobal must be imported first so that the
 * globalThis.Prism reference is set before the component IIFE scripts run.
 */
import "./prismSetGlobal";
import "prismjs/components/prism-bash";

export { Prism } from "./prismSetGlobal";
