import PrismJs from "prismjs";
import "prismjs/components/prism-csharp";

import { Prism } from "../../../../study-session/components/study-blocks/exercise/components/specific/CodeEditor/windows/prismInit";

// To add a language, import its prismjs component above (and any dependencies),
// then add the name it registers to this list. Aliases belong below.
const EXTRA_PRISM_LANGUAGES = ["csharp"] as const;

const LANGUAGE_ALIASES: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  html: "markup",
  xml: "markup",
  shell: "bash",
  sh: "bash",
};

// prismjs components register on the prismjs instance. CodeExplainer uses
// prism-react-renderer's separate Prism instance for its bundled languages.
for (const language of EXTRA_PRISM_LANGUAGES) {
  const grammar = PrismJs.languages[language];
  if (!grammar) {
    throw new Error(`Prism grammar for ${language} was not registered.`);
  }
  Prism.languages[language] = grammar;
}

// Keep the global instance used by other Prism components consistent.
if (typeof globalThis !== "undefined") {
  (globalThis as typeof globalThis & { Prism: typeof Prism }).Prism = Prism;
}

export { Prism };

export const resolveLanguage = (language: string): string => {
  const lower = language.toLowerCase();
  return LANGUAGE_ALIASES[lower] ?? lower;
};

export const getGrammar = (language: string): Prism.Grammar | undefined => {
  const resolved = resolveLanguage(language);
  if (resolved === "bash" && !Prism.languages.bash && !Prism.languages.shell) {
    return Prism.languages.clike ?? Prism.languages.markup ?? undefined;
  }
  return Prism.languages[resolved] ?? Prism.languages.markup ?? undefined;
};
