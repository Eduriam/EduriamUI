import React from "react";

import { Prism } from "./prismInit";

import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

/** Prism token (string or { type, content, alias? }). */
type PrismToken =
  | string
  | {
      type: string;
      content: PrismToken | PrismToken[];
      alias?: string | string[];
    };

/** Normalize Prism alias: "javascript" and "js" both map to "javascript". */
const LANGUAGE_ALIASES: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  html: "markup",
  xml: "markup",
  shell: "bash",
  sh: "bash",
};

function resolveLanguage(lang: string): string {
  const lower = lang.toLowerCase();
  return LANGUAGE_ALIASES[lower] ?? lower;
}

function getGrammar(language: string): Prism.Grammar | undefined {
  const resolved = resolveLanguage(language);
  return Prism.languages[resolved] ?? Prism.languages.markup ?? undefined;
}

/**
 * Token-type to color map (works with light and dark backgrounds).
 * Uses semantic colors similar to common editor themes.
 */
function getDefaultTokenColors(theme: Theme): Record<string, string> {
  const isDark = theme.palette.mode === "dark";
  if (isDark) {
    return {
      keyword: "#569cd6",
      "class-name": "#4ec9b0",
      function: "#dcdcaa",
      number: "#b5cea8",
      string: "#ce9178",
      comment: "#6a9955",
      operator: "#d4d4d4",
      punctuation: "#d4d4d4",
      tag: "#569cd6",
      "attr-name": "#9cdcfe",
      "attr-value": "#ce9178",
      boolean: "#569cd6",
      variable: "#9cdcfe",
      property: "#9cdcfe",
      regex: "#d16969",
      url: "#3794ff",
    };
  }
  return {
    keyword: "#0000ff",
    "class-name": "#267f99",
    function: "#795e26",
    number: "#098658",
    string: "#a31515",
    comment: "#008000",
    operator: "#000000",
    punctuation: "#000000",
    tag: "#267f99",
    "attr-name": "#a31515",
    "attr-value": "#0451a5",
    boolean: "#0000ff",
    variable: "#001080",
    property: "#001080",
    regex: "#811f3f",
    url: "#0451a5",
  };
}

function getTokenColor(
  tokenType: string,
  tokenColors: Record<string, string>,
  defaultColor: string,
): string {
  const primary = tokenColors[tokenType];
  if (primary) return primary;
  const alias = tokenType.split(" ").pop();
  return alias ? (tokenColors[alias] ?? defaultColor) : defaultColor;
}

/**
 * Recursively flatten Prism's nested token tree into a flat list of
 * `{ type, content }` pairs suitable for rendering colored spans.
 *
 * @param tokens   Prism token array (strings and Token objects).
 * @param parentType  The type of the enclosing token, if any. Bare strings
 *   inside a parent token inherit this type so that e.g. a tag name ("h1")
 *   inside a "tag" token is colored as "tag" rather than falling back to the
 *   plain/default color.
 */
function flattenTokens(
  tokens: PrismToken[],
  parentType?: string,
): Array<{ type: string; content: string }> {
  const out: Array<{ type: string; content: string }> = [];
  for (const t of tokens) {
    if (typeof t === "string") {
      if (t) out.push({ type: parentType ?? "plain", content: t });
      continue;
    }
    const type = t.alias
      ? Array.isArray(t.alias)
        ? t.alias[0]
        : t.alias
      : t.type;
    if (typeof t.content === "string") {
      out.push({ type, content: t.content });
    } else {
      const nested = Array.isArray(t.content) ? t.content : [t.content];
      out.push(...flattenTokens(nested, type));
    }
  }
  return out;
}

export interface SyntaxHighlightedCodeProps {
  /** Raw code string to highlight. */
  code: string;
  /** Prism language (e.g. "javascript", "python", "html", "bash"). */
  language: string;
  /** Optional MUI sx for the root span (e.g. whiteSpace: "pre"). */
  sx?: SxProps<Theme>;
  /** Override token colors (merged with theme-based defaults). */
  tokenColors?: Partial<Record<string, string>>;
  /**
   * Fallback color for token types not in tokenColors (defaults to theme text.primary).
   * Use e.g. on dark backgrounds (terminal) so unlisted types stay visible.
   */
  defaultColor?: string;
}

/**
 * Renders a code string with syntax-highlighted spans using Prism.
 * Use for read-only code snippets (e.g. fill-in-blank text segments, terminal).
 */
export const SyntaxHighlightedCode: React.FC<SyntaxHighlightedCodeProps> = ({
  code,
  language,
  sx,
  tokenColors: tokenColorsOverride,
  defaultColor: defaultColorOverride,
}) => {
  const theme = useTheme();
  const defaultColors = getDefaultTokenColors(theme);
  const tokenColors: Record<string, string> = { ...defaultColors };
  if (tokenColorsOverride) {
    for (const [k, v] of Object.entries(tokenColorsOverride)) {
      if (v !== undefined && v !== null) tokenColors[k] = v;
    }
  }
  const defaultColor =
    defaultColorOverride ?? theme.palette.text.primary;

  const grammar = getGrammar(language);
  const tokens = grammar
    ? Prism.tokenize(code, grammar)
    : [{ type: "plain", content: code }];
  const flat = flattenTokens(tokens);

  return (
    <Box
      component="span"
      sx={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: "1rem",
        lineHeight: 1.4,
        ...sx,
      }}
    >
      {flat.map(({ type, content }, i) => (
        <Box
          key={i}
          component="span"
          sx={{
            color: getTokenColor(type, tokenColors, defaultColor),
          }}
        >
          {content}
        </Box>
      ))}
    </Box>
  );
};

export default SyntaxHighlightedCode;
