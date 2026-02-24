import { Prism } from "../../../../../study-session/components/study-blocks/exercise/components/specific/CodeEditor/windows/prismInit";
import type { CodeExplainerColorMode, RawTokenPart, TokenPart } from "../types";

type PrismToken =
  | string
  | {
      type: string;
      content: PrismToken | PrismToken[];
      alias?: string | string[];
    };

const LANGUAGE_ALIASES: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  html: "markup",
  xml: "markup",
  shell: "bash",
  sh: "bash",
};

export const resolveLanguage = (language: string): string => {
  const lower = language.toLowerCase();
  return LANGUAGE_ALIASES[lower] ?? lower;
};

export const getGrammar = (language: string): Prism.Grammar | undefined => {
  const resolved = resolveLanguage(language);
  return Prism.languages[resolved] ?? Prism.languages.markup ?? undefined;
};

export const getTokenColors = (
  colorMode: CodeExplainerColorMode,
): Record<string, string> => {
  if (colorMode === "LIGHT") {
    return {
      keyword: "#0000ff",
      "class-name": "#267f99",
      function: "#795e26",
      number: "#098658",
      string: "#a31515",
      comment: "#008000",
      operator: "#111827",
      punctuation: "#111827",
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
};

const flattenTokens = (
  tokens: PrismToken[],
  parentType?: string,
): RawTokenPart[] => {
  const out: RawTokenPart[] = [];

  for (const token of tokens) {
    if (typeof token === "string") {
      if (token) {
        out.push({ type: parentType ?? "plain", content: token });
      }
      continue;
    }

    const type = token.alias
      ? Array.isArray(token.alias)
        ? token.alias[0]
        : token.alias
      : token.type;

    if (typeof token.content === "string") {
      out.push({ type, content: token.content });
    } else {
      const nested = Array.isArray(token.content)
        ? token.content
        : [token.content];
      out.push(...flattenTokens(nested, type));
    }
  }

  return out;
};

export const getTokenColor = (
  tokenType: string,
  tokenColors: Record<string, string>,
  fallback: string,
): string => {
  const direct = tokenColors[tokenType];
  if (direct) return direct;
  const alias = tokenType.split(" ").pop();
  return alias ? (tokenColors[alias] ?? fallback) : fallback;
};

export const getLineTokens = (line: string, language: string): TokenPart[] => {
  const grammar = getGrammar(language);
  const raw = grammar
    ? flattenTokens(Prism.tokenize(line, grammar) as unknown as PrismToken[])
    : [{ type: "plain", content: line }];

  let cursor = 0;
  return raw.map(({ type, content }) => {
    const start = cursor;
    cursor += content.length;
    return {
      type,
      content,
      start,
      end: cursor,
    };
  });
};

