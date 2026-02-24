import ts from "typescript";

import type { CodeExplainerAnnotation, CodeExplainerStep } from "../types";
import { dedupeAnnotations } from "./annotations";

type TwoslashQueryMarker = {
  markerLineOriginal: number;
  caretColumn: number;
};

type ExpectedErrorDirective = {
  markerLineOriginal: number;
  codes: number[];
};

type TwoslashParsedSource = {
  cleanedCode: string;
  cleanedLines: string[];
  originalToCleanLine: Map<number, number>;
  queryMarkers: TwoslashQueryMarker[];
  focusMarkerOriginalLines: number[];
  expectedErrorDirectives: ExpectedErrorDirective[];
  hasTwoslashDirectives: boolean;
};

const TWOSLASH_TS_LANGUAGES = new Set(["ts", "tsx", "typescript"]);

const isTwoslashLanguage = (language: string): boolean =>
  TWOSLASH_TS_LANGUAGES.has(language.toLowerCase());

const parseExpectedErrorCodes = (line: string): number[] | null => {
  const match = line.match(/^\s*\/\/\s*@errors?\s*:\s*(.+)\s*$/i);
  if (!match) return null;
  return (match[1].match(/\d+/g) ?? []).map((value) => Number(value));
};

const isFocusDirective = (line: string): boolean =>
  /^\s*\/\/\s*@focus\b/i.test(line);

const resolveFocusLineNumber = ({
  focusMarkerOriginalLines,
  originalToCleanLine,
  originalLineCount,
}: {
  focusMarkerOriginalLines: number[];
  originalToCleanLine: Map<number, number>;
  originalLineCount: number;
}): number | undefined => {
  let resolvedLineNumber: number | undefined;

  for (const markerOriginalLine of focusMarkerOriginalLines) {
    let targetOriginalLine = markerOriginalLine + 1;
    while (
      targetOriginalLine < originalLineCount &&
      !originalToCleanLine.has(targetOriginalLine)
    ) {
      targetOriginalLine += 1;
    }

    const targetCleanLine = originalToCleanLine.get(targetOriginalLine);
    if (targetCleanLine !== undefined) {
      resolvedLineNumber = targetCleanLine + 1;
    }
  }

  return resolvedLineNumber;
};

const resolveDirectiveTargetCleanLine = ({
  markerOriginalLine,
  originalToCleanLine,
  originalLineCount,
}: {
  markerOriginalLine: number;
  originalToCleanLine: Map<number, number>;
  originalLineCount: number;
}): number | undefined => {
  let targetOriginalLine = markerOriginalLine + 1;
  while (
    targetOriginalLine < originalLineCount &&
    !originalToCleanLine.has(targetOriginalLine)
  ) {
    targetOriginalLine += 1;
  }

  return originalToCleanLine.get(targetOriginalLine);
};

const parseTwoslashSource = (
  code: string,
  parseTwoslashDirectives: boolean,
): TwoslashParsedSource => {
  const normalized = code.replace(/\r\n/g, "\n");
  const originalLines = normalized.split("\n");

  const cleanedLines: string[] = [];
  const originalToCleanLine = new Map<number, number>();
  const queryMarkers: TwoslashQueryMarker[] = [];
  const focusMarkerOriginalLines: number[] = [];
  const expectedErrorDirectives: ExpectedErrorDirective[] = [];

  let hasTwoslashDirectives = false;

  for (
    let originalLineIndex = 0;
    originalLineIndex < originalLines.length;
    originalLineIndex += 1
  ) {
    const line = originalLines[originalLineIndex];

    if (parseTwoslashDirectives) {
      const parsedErrorCodes = parseExpectedErrorCodes(line);
      if (parsedErrorCodes) {
        hasTwoslashDirectives = true;
        expectedErrorDirectives.push({
          markerLineOriginal: originalLineIndex,
          codes: parsedErrorCodes,
        });
        continue;
      }

      const queryLineMatch = line.match(/^\s*\/\/(\s*)\^\?\s*$/);
      if (queryLineMatch) {
        hasTwoslashDirectives = true;
        const prefix = queryLineMatch[1]?.length ?? 0;
        queryMarkers.push({
          markerLineOriginal: originalLineIndex,
          caretColumn: prefix + 1,
        });
        continue;
      }
    }

    if (isFocusDirective(line)) {
      focusMarkerOriginalLines.push(originalLineIndex);
      continue;
    }

    originalToCleanLine.set(originalLineIndex, cleanedLines.length);
    cleanedLines.push(line);
  }

  return {
    cleanedCode: cleanedLines.join("\n"),
    cleanedLines,
    originalToCleanLine,
    queryMarkers,
    focusMarkerOriginalLines,
    expectedErrorDirectives,
    hasTwoslashDirectives,
  };
};

const createTsLanguageService = (fileName: string, code: string) => {
  const fileContents = new Map<string, string>([
    [fileName, code],
    [
      "twoslash-lib.d.ts",
      [
        "declare const console: {",
        "  log: (...args: any[]) => void;",
        "  warn: (...args: any[]) => void;",
        "  error: (...args: any[]) => void;",
        "};",
      ].join("\n"),
    ],
  ]);

  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    jsx: ts.JsxEmit.ReactJSX,
    strict: true,
    noEmit: true,
    noLib: true,
    skipLibCheck: true,
  };

  const host: ts.LanguageServiceHost = {
    getCompilationSettings: () => compilerOptions,
    getCurrentDirectory: () => "/",
    getDefaultLibFileName: () => "twoslash-lib.d.ts",
    getScriptFileNames: () => Array.from(fileContents.keys()),
    getScriptVersion: () => "1",
    getScriptSnapshot: (name) => {
      const text = fileContents.get(name);
      return typeof text === "string"
        ? ts.ScriptSnapshot.fromString(text)
        : undefined;
    },
    readFile: (name) => fileContents.get(name),
    fileExists: (name) => fileContents.has(name),
    directoryExists: () => true,
    getDirectories: () => [],
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    getScriptKind: (name) =>
      name.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  };

  return ts.createLanguageService(host);
};

const getQuickInfoMessage = ({
  languageService,
  fileName,
  sourceFile,
  lineIndex,
  lineText,
  baseCharacter,
}: {
  languageService: ts.LanguageService;
  fileName: string;
  sourceFile: ts.SourceFile;
  lineIndex: number;
  lineText: string;
  baseCharacter: number;
}): string | null => {
  const candidateOffsets = [0, 1, -1, 2, -2];
  const maxCharacter = Math.max(0, lineText.length - 1);

  for (const offset of candidateOffsets) {
    const character = Math.max(
      0,
      Math.min(maxCharacter, baseCharacter + offset),
    );
    const position = sourceFile.getPositionOfLineAndCharacter(
      lineIndex,
      character,
    );
    const quickInfo = languageService.getQuickInfoAtPosition(fileName, position);
    const message = ts.displayPartsToString(quickInfo?.displayParts ?? []).trim();
    if (message) {
      return message;
    }
  }

  return null;
};

const generateTwoslashAnnotations = (
  step: CodeExplainerStep,
  autoParseTwoslash: boolean,
): CodeExplainerStep => {
  const shouldParseTwoslash =
    autoParseTwoslash && isTwoslashLanguage(step.language);
  const parsed = parseTwoslashSource(step.code, shouldParseTwoslash);

  const parsedFocusLineNumber = resolveFocusLineNumber({
    focusMarkerOriginalLines: parsed.focusMarkerOriginalLines,
    originalToCleanLine: parsed.originalToCleanLine,
    originalLineCount: step.code.replace(/\r\n/g, "\n").split("\n").length,
  });
  const focusLineNumber = parsedFocusLineNumber ?? step.focusLineNumber;

  const fileName =
    step.language.toLowerCase() === "tsx" ? "snippet.tsx" : "snippet.ts";

  const initialCallouts = step.callouts ?? [];
  const initialErrors = step.errors ?? [];
  const baseStep: CodeExplainerStep = {
    ...step,
    code: parsed.cleanedCode,
    focusLineNumber,
  };

  if (!shouldParseTwoslash || !parsed.hasTwoslashDirectives) {
    return baseStep;
  }

  if (!parsed.cleanedCode.trim()) {
    return {
      ...baseStep,
      callouts: initialCallouts,
      errors: initialErrors,
    };
  }

  try {
    const languageService = createTsLanguageService(fileName, parsed.cleanedCode);
    const sourceFile = languageService.getProgram()?.getSourceFile(fileName);

    if (!sourceFile) {
      return baseStep;
    }

    const generatedCallouts: CodeExplainerAnnotation[] = [];
    for (const marker of parsed.queryMarkers) {
      let targetOriginalLine = marker.markerLineOriginal - 1;
      while (
        targetOriginalLine >= 0 &&
        !parsed.originalToCleanLine.has(targetOriginalLine)
      ) {
        targetOriginalLine -= 1;
      }
      if (targetOriginalLine < 0) continue;

      const targetCleanLine = parsed.originalToCleanLine.get(targetOriginalLine);
      if (targetCleanLine === undefined) continue;

      const lineText = parsed.cleanedLines[targetCleanLine] ?? "";
      const message = getQuickInfoMessage({
        languageService,
        fileName,
        sourceFile,
        lineIndex: targetCleanLine,
        lineText,
        baseCharacter: marker.caretColumn,
      });

      if (!message) continue;
      generatedCallouts.push({
        lineNumber: targetCleanLine + 1,
        message,
        code: message,
        language: step.language,
        column: Math.max(1, marker.caretColumn),
      });
    }

    const generatedErrors: CodeExplainerAnnotation[] = [];
    if (parsed.expectedErrorDirectives.length > 0) {
      const expectedErrorTargets = parsed.expectedErrorDirectives
        .map((directive) => {
          const cleanLine = resolveDirectiveTargetCleanLine({
            markerOriginalLine: directive.markerLineOriginal,
            originalToCleanLine: parsed.originalToCleanLine,
            originalLineCount: step.code.replace(/\r\n/g, "\n").split("\n").length,
          });
          if (cleanLine === undefined) return null;
          return {
            lineNumber: cleanLine + 1,
            codes: directive.codes,
          };
        })
        .filter(
          (target): target is { lineNumber: number; codes: number[] } =>
            Boolean(target),
        );

      const diagnostics = [
        ...languageService.getSyntacticDiagnostics(fileName),
        ...languageService.getSemanticDiagnostics(fileName),
      ].filter((diagnostic) => {
        if (diagnostic.start === undefined) return false;
        const { line } = sourceFile.getLineAndCharacterOfPosition(diagnostic.start);
        const lineNumber = line + 1;
        const code = Number(diagnostic.code);

        return expectedErrorTargets.some(
          (target) =>
            target.lineNumber === lineNumber && target.codes.includes(code),
        );
      });

      const seenDiagnostics = new Set<string>();
      for (const diagnostic of diagnostics) {
        if (diagnostic.start === undefined) continue;
        const message = ts
          .flattenDiagnosticMessageText(diagnostic.messageText, "\n")
          .trim();
        if (!message) continue;

        const { line, character } = sourceFile.getLineAndCharacterOfPosition(
          diagnostic.start,
        );
        const key = `${line}|${diagnostic.code}|${message}`;
        if (seenDiagnostics.has(key)) continue;
        seenDiagnostics.add(key);

        generatedErrors.push({
          lineNumber: line + 1,
          message,
          column: character + 1,
          length: Math.max(1, diagnostic.length ?? 1),
        });
      }
    }

    return {
      ...baseStep,
      callouts: dedupeAnnotations([...initialCallouts, ...generatedCallouts]),
      errors: dedupeAnnotations([...initialErrors, ...generatedErrors]),
    };
  } catch {
    return {
      ...baseStep,
      callouts: initialCallouts,
      errors: initialErrors,
    };
  }
};

export const processStepsWithTwoslash = (
  steps: CodeExplainerStep[],
  autoParseTwoslash: boolean,
): CodeExplainerStep[] => {
  return steps.map((step) =>
    generateTwoslashAnnotations(step, autoParseTwoslash),
  );
};

