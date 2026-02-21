import React, { useMemo } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Easing,
  interpolate,
  interpolateColors,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import ts from "typescript";

import type { ComponentPosition, ComponentSize } from "../../../types/shared";
import { positionToStyle } from "../../../utils/positionToStyle";
import { resolveSize } from "../../../utils/resolveSize";
import type { BaseVideoComponent } from "../../VideoComponent";
import { Prism } from "../../../../study-session/components/study-blocks/exercise/components/specific/CodeEditor/windows/prismInit";

type PrismToken =
  | string
  | {
      type: string;
      content: PrismToken | PrismToken[];
      alias?: string | string[];
    };

type RawTokenPart = {
  type: string;
  content: string;
};

type TokenPart = RawTokenPart & {
  start: number;
  end: number;
};

type LineAnnotations = {
  callouts: CodeExplainerAnnotation[];
  errors: CodeExplainerAnnotation[];
};

type CodeTheme = {
  panel: string;
  panelBorder: string;
  progressTrack: string;
  progressFill: string;
  lineNumber: string;
  foreground: string;
  calloutLineBg: string;
  errorLineBg: string;
  calloutBg: string;
  errorBg: string;
};

const CODE_THEME: Record<CodeExplainerColorMode, CodeTheme> = {
  DARK: {
    panel: "#0f172a",
    panelBorder: "#1e293b",
    progressTrack: "#1f2937",
    progressFill: "#22d3ee",
    lineNumber: "#64748b",
    foreground: "#e2e8f0",
    calloutLineBg: "rgba(34, 211, 238, 0.12)",
    errorLineBg: "rgba(239, 68, 68, 0.14)",
    calloutBg: "#134e4a",
    errorBg: "#7f1d1d",
  },
  LIGHT: {
    panel: "#f8fafc",
    panelBorder: "#cbd5e1",
    progressTrack: "#e2e8f0",
    progressFill: "#0f766e",
    lineNumber: "#64748b",
    foreground: "#0f172a",
    calloutLineBg: "rgba(13, 148, 136, 0.12)",
    errorLineBg: "rgba(239, 68, 68, 0.12)",
    calloutBg: "#ccfbf1",
    errorBg: "#fee2e2",
  },
};

export type CodeExplainerColorMode = "DARK" | "LIGHT";

export interface CodeExplainerAnnotation {
  lineNumber: number;
  message: string;
  /** 1-based character column in the line. Used to place the pointer arrow. */
  column?: number;
  /** Optional length of the annotated range in characters (for error underline). */
  length?: number;
  /** Optional code snippet shown inside the annotation bubble. */
  code?: string;
  /** Language used when rendering `code` (falls back to step language). */
  language?: string;
}

export interface CodeExplainerStep {
  id?: string;
  code: string;
  language: string;
  title?: string;
  durationMs?: number;
  callouts?: CodeExplainerAnnotation[];
  errors?: CodeExplainerAnnotation[];
}

export interface ICodeExplainer extends BaseVideoComponent {
  type: "CODE_EXPLAINER";
  position: ComponentPosition;
  size?: ComponentSize;
  steps: CodeExplainerStep[];
  /** Parse twoslash-style directives (`// ^?`, `// @errors:`) from TS/TSX steps. @default true */
  autoParseTwoslash?: boolean;
  stepDurationMs?: number;
  transitionDurationMs?: number;
  colorMode?: CodeExplainerColorMode;
  showProgressBar?: boolean;
  showLineNumbers?: boolean;
}

export interface ICodeExplainerProps {
  comp: ICodeExplainer;
}

const LANGUAGE_ALIASES: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  html: "markup",
  xml: "markup",
  shell: "bash",
  sh: "bash",
};

const CODE_FONT_FAMILY = '"JetBrains Mono", Consolas, "Courier New", monospace';
const CODE_FONT_SIZE = 28;
const LINE_NUMBER_GUTTER_CH = 4;
const ANNOTATION_ARROW_OFFSET_CH = 1.5;

const resolveLanguage = (language: string): string => {
  const lower = language.toLowerCase();
  return LANGUAGE_ALIASES[lower] ?? lower;
};

const getGrammar = (language: string): Prism.Grammar | undefined => {
  const resolved = resolveLanguage(language);
  return Prism.languages[resolved] ?? Prism.languages.markup ?? undefined;
};

const getTokenColors = (
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

const getTokenColor = (
  tokenType: string,
  tokenColors: Record<string, string>,
  fallback: string,
): string => {
  const direct = tokenColors[tokenType];
  if (direct) return direct;
  const alias = tokenType.split(" ").pop();
  return alias ? (tokenColors[alias] ?? fallback) : fallback;
};

const getLineTokens = (
  line: string,
  language: string,
): TokenPart[] => {
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

type PositionedToken = TokenPart & {
  lineIndex: number;
  globalIndex: number;
};

type StepTokenLayout = {
  byLine: PositionedToken[][];
  flat: PositionedToken[];
};

const buildStepTokenLayout = (
  lines: string[],
  language: string,
): StepTokenLayout => {
  let globalIndex = 0;
  const byLine = lines.map((line, lineIndex) =>
    getLineTokens(line, language).map((token) => ({
      ...token,
      lineIndex,
      globalIndex: globalIndex++,
    })),
  );

  return {
    byLine,
    flat: byLine.flat(),
  };
};

const getTokenSignature = (token: { type: string; content: string }): string =>
  `${token.type}::${token.content}`;

type TokenTransitionLayout = {
  oldByNewGlobalIndex: Map<number, PositionedToken>;
  removedOldTokens: PositionedToken[];
};

const buildTokenTransitionLayout = (
  oldTokens: PositionedToken[],
  newTokens: PositionedToken[],
): TokenTransitionLayout => {
  const oldBySignature = new Map<string, PositionedToken[]>();

  for (const token of oldTokens) {
    const signature = getTokenSignature(token);
    const queue = oldBySignature.get(signature);
    if (queue) queue.push(token);
    else oldBySignature.set(signature, [token]);
  }

  const oldByNewGlobalIndex = new Map<number, PositionedToken>();
  const matchedOldIndexes = new Set<number>();

  for (const token of newTokens) {
    const signature = getTokenSignature(token);
    const queue = oldBySignature.get(signature);
    if (!queue || queue.length === 0) continue;

    const oldToken = queue.shift();
    if (!oldToken) continue;

    matchedOldIndexes.add(oldToken.globalIndex);
    oldByNewGlobalIndex.set(token.globalIndex, oldToken);
  }

  const removedOldTokens = oldTokens.filter(
    (token) => !matchedOldIndexes.has(token.globalIndex),
  );

  return {
    oldByNewGlobalIndex,
    removedOldTokens,
  };
};

type TwoslashQueryMarker = {
  markerLineOriginal: number;
  caretColumn: number;
};

type TwoslashParsedSource = {
  cleanedCode: string;
  cleanedLines: string[];
  originalToCleanLine: Map<number, number>;
  queryMarkers: TwoslashQueryMarker[];
  expectedErrorCodes: number[];
  hasDirectives: boolean;
};

const TWOSLASH_TS_LANGUAGES = new Set(["ts", "tsx", "typescript"]);

const isTwoslashLanguage = (language: string): boolean =>
  TWOSLASH_TS_LANGUAGES.has(language.toLowerCase());

const parseExpectedErrorCodes = (line: string): number[] | null => {
  const match = line.match(/^\s*\/\/\s*@errors?\s*:\s*(.+)\s*$/i);
  if (!match) return null;
  return (match[1].match(/\d+/g) ?? []).map((value) => Number(value));
};

const parseTwoslashSource = (code: string): TwoslashParsedSource => {
  const normalized = code.replace(/\r\n/g, "\n");
  const originalLines = normalized.split("\n");

  const cleanedLines: string[] = [];
  const originalToCleanLine = new Map<number, number>();
  const queryMarkers: TwoslashQueryMarker[] = [];
  const expectedErrorCodes: number[] = [];

  let hasDirectives = false;

  for (let originalLineIndex = 0; originalLineIndex < originalLines.length; originalLineIndex += 1) {
    const line = originalLines[originalLineIndex];

    const parsedErrorCodes = parseExpectedErrorCodes(line);
    if (parsedErrorCodes) {
      hasDirectives = true;
      expectedErrorCodes.push(...parsedErrorCodes);
      continue;
    }

    const queryLineMatch = line.match(/^\s*\/\/(\s*)\^\?\s*$/);
    if (queryLineMatch) {
      hasDirectives = true;
      const prefix = queryLineMatch[1]?.length ?? 0;
      queryMarkers.push({
        markerLineOriginal: originalLineIndex,
        caretColumn: prefix + 1,
      });
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
    expectedErrorCodes,
    hasDirectives,
  };
};

const dedupeAnnotations = (
  annotations: CodeExplainerAnnotation[],
): CodeExplainerAnnotation[] => {
  const seen = new Set<string>();
  const result: CodeExplainerAnnotation[] = [];

  for (const annotation of annotations) {
    const key = `${annotation.lineNumber}|${annotation.column ?? 0}|${annotation.length ?? 0}|${annotation.message}|${annotation.code ?? ""}|${annotation.language ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(annotation);
  }

  return result;
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
      return typeof text === "string" ? ts.ScriptSnapshot.fromString(text) : undefined;
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
    const character = Math.max(0, Math.min(maxCharacter, baseCharacter + offset));
    const position = sourceFile.getPositionOfLineAndCharacter(lineIndex, character);
    const quickInfo = languageService.getQuickInfoAtPosition(fileName, position);
    const message = ts.displayPartsToString(quickInfo?.displayParts ?? []).trim();
    if (message) {
      return message;
    }
  }

  return null;
};

const generateTwoslashAnnotations = (step: CodeExplainerStep): CodeExplainerStep => {
  if (!isTwoslashLanguage(step.language)) {
    return step;
  }

  const parsed = parseTwoslashSource(step.code);
  if (!parsed.hasDirectives) {
    return step;
  }

  const fileName =
    step.language.toLowerCase() === "tsx" ? "snippet.tsx" : "snippet.ts";

  const initialCallouts = step.callouts ?? [];
  const initialErrors = step.errors ?? [];

  if (!parsed.cleanedCode.trim()) {
    return {
      ...step,
      code: parsed.cleanedCode,
      callouts: initialCallouts,
      errors: initialErrors,
    };
  }

  try {
    const languageService = createTsLanguageService(fileName, parsed.cleanedCode);
    const sourceFile = languageService.getProgram()?.getSourceFile(fileName);

    if (!sourceFile) {
      return {
        ...step,
        code: parsed.cleanedCode,
      };
    }

    const generatedCallouts: CodeExplainerAnnotation[] = [];
    for (const marker of parsed.queryMarkers) {
      let targetOriginalLine = marker.markerLineOriginal - 1;
      while (targetOriginalLine >= 0 && !parsed.originalToCleanLine.has(targetOriginalLine)) {
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
    if (parsed.expectedErrorCodes.length > 0) {
      const diagnostics = [
        ...languageService.getSyntacticDiagnostics(fileName),
        ...languageService.getSemanticDiagnostics(fileName),
      ].filter((diagnostic) =>
        parsed.expectedErrorCodes.includes(Number(diagnostic.code)),
      );

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
      ...step,
      code: parsed.cleanedCode,
      callouts: dedupeAnnotations([...initialCallouts, ...generatedCallouts]),
      errors: dedupeAnnotations([...initialErrors, ...generatedErrors]),
    };
  } catch {
    return {
      ...step,
      code: parsed.cleanedCode,
      callouts: initialCallouts,
      errors: initialErrors,
    };
  }
};

const processStepsWithTwoslash = (
  steps: CodeExplainerStep[],
  autoParseTwoslash: boolean,
): CodeExplainerStep[] => {
  if (!autoParseTwoslash) return steps;
  return steps.map((step) => generateTwoslashAnnotations(step));
};

const getStepDurations = (
  steps: CodeExplainerStep[],
  fps: number,
  defaultStepDurationMs: number,
): number[] => {
  return steps.map((step) =>
    Math.max(
      1,
      Math.round(((step.durationMs ?? defaultStepDurationMs) / 1000) * fps),
    ),
  );
};

const getStepState = (frame: number, durationsInFrames: number[]) => {
  const totalDurationInFrames = durationsInFrames.reduce(
    (sum, value) => sum + value,
    0,
  );
  const safeTotalDuration = Math.max(1, totalDurationInFrames);
  const clampedFrame = Math.max(0, Math.min(frame, safeTotalDuration - 1));

  let accumulated = 0;
  for (let index = 0; index < durationsInFrames.length; index += 1) {
    const duration = durationsInFrames[index];
    const end = accumulated + duration;
    if (clampedFrame < end || index === durationsInFrames.length - 1) {
      const frameInStep = clampedFrame - accumulated;
      const stepProgress = duration <= 0 ? 1 : frameInStep / duration;
      return {
        index,
        startFrame: accumulated,
        duration,
        frameInStep,
        stepProgress: Math.max(0, Math.min(stepProgress, 1)),
        totalDurationInFrames: safeTotalDuration,
      };
    }
    accumulated = end;
  }

  return {
    index: 0,
    startFrame: 0,
    duration: safeTotalDuration,
    frameInStep: 0,
    stepProgress: 0,
    totalDurationInFrames: safeTotalDuration,
  };
};

const buildLineAnnotations = (step: CodeExplainerStep): Map<number, LineAnnotations> => {
  const map = new Map<number, LineAnnotations>();

  const ensure = (lineNumber: number): LineAnnotations => {
    const existing = map.get(lineNumber);
    if (existing) return existing;
    const created: LineAnnotations = { callouts: [], errors: [] };
    map.set(lineNumber, created);
    return created;
  };

  for (const callout of step.callouts ?? []) {
    ensure(callout.lineNumber).callouts.push(callout);
  }
  for (const error of step.errors ?? []) {
    ensure(error.lineNumber).errors.push(error);
  }

  return map;
};

interface CodeStepLayerProps {
  step: CodeExplainerStep;
  colorMode: CodeExplainerColorMode;
  showLineNumbers: boolean;
  opacity: number;
  translateY: number;
  annotationOpacity: number;
}

const HighlightedSnippet: React.FC<{
  code: string;
  language: string;
  tokenColors: Record<string, string>;
  fallbackColor: string;
}> = ({ code, language, tokenColors, fallbackColor }) => {
  const lines = code.replace(/\r\n/g, "\n").split("\n");

  return (
    <Box
      component="div"
      sx={{
        whiteSpace: "pre",
        fontFamily: CODE_FONT_FAMILY,
        fontSize: CODE_FONT_SIZE,
        lineHeight: 1.5,
      }}
    >
      {lines.map((line, lineIndex) => (
        <Box key={`${lineIndex}-${line}`} component="div">
          {getLineTokens(line, language).map(({ type, content }, tokenIndex) => (
            <Box
              key={`${lineIndex}-${tokenIndex}`}
              component="span"
              sx={{
                color: getTokenColor(type, tokenColors, fallbackColor),
              }}
            >
              {content}
            </Box>
          ))}
          {line.length === 0 ? "\u00A0" : null}
        </Box>
      ))}
    </Box>
  );
};

const AnnotationBubble: React.FC<{
  annotation: CodeExplainerAnnotation;
  stepLanguage: string;
  colorMode: CodeExplainerColorMode;
  tokenColors: Record<string, string>;
  showLineNumbers: boolean;
  annotationOpacity: number;
  variant: "callout" | "error";
}> = ({
  annotation,
  stepLanguage,
  colorMode,
  tokenColors,
  showLineNumbers,
  annotationOpacity,
  variant,
}) => {
  const theme = CODE_THEME[colorMode];
  const column = Math.max(1, annotation.column ?? 1);
  const bubbleBackground =
    variant === "error" ? theme.errorBg : theme.calloutBg;

  return (
    <Box
      component="div"
      sx={{
        opacity: annotationOpacity,
        display: "flex",
        mt: 0.5,
      }}
    >
      {showLineNumbers ? (
        <Box component="span" sx={{ width: `${LINE_NUMBER_GUTTER_CH}ch` }} />
      ) : null}

      <Box
        component="div"
        sx={{
          position: "relative",
          width: "fit-content",
          maxWidth: "100%",
          minWidth: `${Math.max(column + 4, 18)}ch`,
          backgroundColor: bubbleBackground,
          color: theme.foreground,
          borderRadius: 1,
          px: 2,
          py: 1,
          whiteSpace: "pre-wrap",
          ...(variant === "error" && { borderLeft: "4px solid #ef4444" }),
        }}
      >
        {variant === "callout" ? (
          <Box
            component="span"
            sx={{
              position: "absolute",
              left: `calc(${Math.max(0, column - 1)}ch + ${ANNOTATION_ARROW_OFFSET_CH}ch)`,
              top: "-2px",
              width: "1rem",
              height: "1rem",
              transform: "rotate(45deg) translateY(-50%)",
              backgroundColor: bubbleBackground,
            }}
          />
        ) : null}

        {annotation.code ? (
          <HighlightedSnippet
            code={annotation.code}
            language={annotation.language ?? stepLanguage}
            tokenColors={tokenColors}
            fallbackColor={theme.foreground}
          />
        ) : (
          <Box
            component="div"
            sx={{
              fontFamily: CODE_FONT_FAMILY,
              fontSize: CODE_FONT_SIZE,
              lineHeight: 1.5,
            }}
          >
            {annotation.message}
          </Box>
        )}
      </Box>
    </Box>
  );
};

interface CodeTransitionLayerProps {
  oldStep: CodeExplainerStep;
  newStep: CodeExplainerStep;
  colorMode: CodeExplainerColorMode;
  showLineNumbers: boolean;
  transitionProgress: number;
  annotationOpacity: number;
}

const CodeTransitionLayer: React.FC<CodeTransitionLayerProps> = ({
  oldStep,
  newStep,
  colorMode,
  showLineNumbers,
  transitionProgress,
  annotationOpacity,
}) => {
  const theme = CODE_THEME[colorMode];
  const tokenColors = useMemo(() => getTokenColors(colorMode), [colorMode]);
  const lines = useMemo(
    () => newStep.code.replace(/\r\n/g, "\n").split("\n"),
    [newStep],
  );
  const newLayout = useMemo(
    () => buildStepTokenLayout(lines, newStep.language),
    [lines, newStep.language],
  );
  const oldLines = useMemo(
    () => oldStep.code.replace(/\r\n/g, "\n").split("\n"),
    [oldStep],
  );
  const oldLayout = useMemo(
    () => buildStepTokenLayout(oldLines, oldStep.language),
    [oldLines, oldStep.language],
  );
  const transitions = useMemo(
    () => buildTokenTransitionLayout(oldLayout.flat, newLayout.flat),
    [oldLayout.flat, newLayout.flat],
  );
  const annotationsByLine = useMemo(
    () => buildLineAnnotations(newStep),
    [newStep],
  );

  const inverseProgress = 1 - transitionProgress;
  const showAnnotations = annotationOpacity > 0.01;
  const codeStartOffsetCh = showLineNumbers ? LINE_NUMBER_GUTTER_CH : 0;

  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <Box
        component="div"
        sx={{
          m: 0,
          position: "relative",
          fontFamily: CODE_FONT_FAMILY,
          fontSize: CODE_FONT_SIZE,
          lineHeight: 1.5,
          color: theme.foreground,
          whiteSpace: "pre",
        }}
      >
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const annotations = annotationsByLine.get(lineNumber);
          const hasError = Boolean(annotations?.errors.length);
          const hasCallout = !hasError && Boolean(annotations?.callouts.length);
          const tokens = newLayout.byLine[index] ?? [];
          const errorRanges = (annotations?.errors ?? [])
            .map((error) => {
              if (!error.column) return null;
              const start = Math.max(0, error.column - 1);
              const length = Math.max(1, error.length ?? 1);
              return { start, end: start + length };
            })
            .filter((value): value is { start: number; end: number } =>
              Boolean(value),
            );

          return (
            <React.Fragment key={`${lineNumber}-${line}`}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  borderRadius: 1,
                  backgroundColor: hasError
                    ? theme.errorLineBg
                    : hasCallout
                      ? theme.calloutLineBg
                      : "transparent",
                }}
              >
                {showLineNumbers ? (
                  <Box
                    component="span"
                    sx={{
                      minWidth: `${LINE_NUMBER_GUTTER_CH}ch`,
                      color: theme.lineNumber,
                      userSelect: "none",
                    }}
                  >
                    {String(lineNumber).padStart(2, "0")}
                  </Box>
                ) : null}

                <Box component="span" sx={{ flex: 1 }}>
                  {tokens.length > 0 ? (
                    tokens.map((token, tokenIndex) => {
                      const oldToken = transitions.oldByNewGlobalIndex.get(
                        token.globalIndex,
                      );
                      const hasErrorUnderline = errorRanges.some(
                        (range) => token.start < range.end && token.end > range.start,
                      );

                      const newColor = getTokenColor(
                        token.type,
                        tokenColors,
                        theme.foreground,
                      );
                      const oldColor = oldToken
                        ? getTokenColor(oldToken.type, tokenColors, theme.foreground)
                        : newColor;

                      const translateXCh = oldToken
                        ? (oldToken.start - token.start) * inverseProgress
                        : 0;
                      const translateYEm = oldToken
                        ? (oldToken.lineIndex - token.lineIndex) * 1.5 * inverseProgress
                        : 0.25 * inverseProgress;

                      return (
                        <Box
                          key={`${lineNumber}-${tokenIndex}`}
                          component="span"
                          sx={{
                            display: "inline-block",
                            color: interpolateColors(
                              transitionProgress,
                              [0, 1],
                              [oldColor, newColor],
                            ),
                            opacity: oldToken ? 1 : transitionProgress,
                            transform: `translate(${translateXCh}ch, ${translateYEm}em)`,
                            ...(hasErrorUnderline && {
                              textDecorationLine: "underline",
                              textDecorationStyle: "wavy",
                              textDecorationColor: "#ef4444",
                            }),
                          }}
                        >
                          {token.content}
                        </Box>
                      );
                    })
                  ) : (
                    "\u00A0"
                  )}
                </Box>
              </Box>

              {showAnnotations
                ? annotations?.callouts.map((callout, calloutIndex) => (
                    <AnnotationBubble
                      key={`callout-${lineNumber}-${calloutIndex}`}
                      annotation={callout}
                      stepLanguage={newStep.language}
                      colorMode={colorMode}
                      tokenColors={tokenColors}
                      showLineNumbers={showLineNumbers}
                      annotationOpacity={annotationOpacity}
                      variant="callout"
                    />
                  ))
                : null}

              {showAnnotations
                ? annotations?.errors.map((error, errorIndex) => (
                    <AnnotationBubble
                      key={`error-${lineNumber}-${errorIndex}`}
                      annotation={error}
                      stepLanguage={newStep.language}
                      colorMode={colorMode}
                      tokenColors={tokenColors}
                      showLineNumbers={showLineNumbers}
                      annotationOpacity={annotationOpacity}
                      variant="error"
                    />
                  ))
                : null}
            </React.Fragment>
          );
        })}

        {transitions.removedOldTokens.map((oldToken) => (
          <Box
            key={`removed-${oldToken.globalIndex}`}
            component="span"
            sx={{
              position: "absolute",
              left: `${codeStartOffsetCh + oldToken.start}ch`,
              top: `${oldToken.lineIndex * 1.5}em`,
              color: getTokenColor(oldToken.type, tokenColors, theme.foreground),
              opacity: inverseProgress,
              transform: `translateY(${-0.2 * inverseProgress}em)`,
              pointerEvents: "none",
            }}
          >
            {oldToken.content}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const CodeStepLayer: React.FC<CodeStepLayerProps> = ({
  step,
  colorMode,
  showLineNumbers,
  opacity,
  translateY,
  annotationOpacity,
}) => {
  const theme = CODE_THEME[colorMode];
  const tokenColors = useMemo(() => getTokenColors(colorMode), [colorMode]);

  const annotationsByLine = useMemo(() => buildLineAnnotations(step), [step]);
  const lines = useMemo(() => step.code.replace(/\r\n/g, "\n").split("\n"), [step]);
  const showAnnotations = annotationOpacity > 0.01;

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <Box
        component="div"
        sx={{
          m: 0,
          fontFamily: CODE_FONT_FAMILY,
          fontSize: CODE_FONT_SIZE,
          lineHeight: 1.5,
          color: theme.foreground,
          whiteSpace: "pre",
        }}
      >
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const annotations = annotationsByLine.get(lineNumber);
          const hasError = Boolean(annotations?.errors.length);
          const hasCallout = !hasError && Boolean(annotations?.callouts.length);

          const tokens = getLineTokens(line, step.language);
          const errorRanges = (annotations?.errors ?? [])
            .map((error) => {
              if (!error.column) return null;
              const start = Math.max(0, error.column - 1);
              const length = Math.max(1, error.length ?? 1);
              return {
                start,
                end: start + length,
              };
            })
            .filter((value): value is { start: number; end: number } =>
              Boolean(value),
            );

          return (
            <React.Fragment key={`${lineNumber}-${line}`}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  borderRadius: 1,
                  backgroundColor: hasError
                    ? theme.errorLineBg
                    : hasCallout
                      ? theme.calloutLineBg
                      : "transparent",
                }}
              >
                {showLineNumbers ? (
                  <Box
                    component="span"
                    sx={{
                      minWidth: `${LINE_NUMBER_GUTTER_CH}ch`,
                      color: theme.lineNumber,
                      userSelect: "none",
                    }}
                  >
                    {String(lineNumber).padStart(2, "0")}
                  </Box>
                ) : null}

                <Box component="span" sx={{ flex: 1 }}>
                  {tokens.length > 0 ? (
                    tokens.map(({ type, content, start, end }, tokenIndex) => {
                      const hasErrorUnderline = errorRanges.some(
                        (range) => start < range.end && end > range.start,
                      );

                      return (
                        <Box
                          key={`${lineNumber}-${tokenIndex}`}
                          component="span"
                          sx={{
                            color: getTokenColor(type, tokenColors, theme.foreground),
                            ...(hasErrorUnderline && {
                              textDecorationLine: "underline",
                              textDecorationStyle: "wavy",
                              textDecorationColor: "#ef4444",
                            }),
                          }}
                        >
                          {content}
                        </Box>
                      );
                    })
                  ) : (
                    "\u00A0"
                  )}
                </Box>
              </Box>

              {showAnnotations
                ? annotations?.callouts.map((callout, calloutIndex) => (
                    <AnnotationBubble
                      key={`callout-${lineNumber}-${calloutIndex}`}
                      annotation={callout}
                      stepLanguage={step.language}
                      colorMode={colorMode}
                      tokenColors={tokenColors}
                      showLineNumbers={showLineNumbers}
                      annotationOpacity={annotationOpacity}
                      variant="callout"
                    />
                  ))
                : null}

              {showAnnotations
                ? annotations?.errors.map((error, errorIndex) => (
                    <AnnotationBubble
                      key={`error-${lineNumber}-${errorIndex}`}
                      annotation={error}
                      stepLanguage={step.language}
                      colorMode={colorMode}
                      tokenColors={tokenColors}
                      showLineNumbers={showLineNumbers}
                      annotationOpacity={annotationOpacity}
                      variant="error"
                    />
                  ))
                : null}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};

export const CodeExplainer: React.FC<ICodeExplainerProps> = ({ comp }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!Array.isArray(comp.steps) || comp.steps.length === 0) {
    throw new Error("CODE_EXPLAINER component requires at least one step.");
  }

  const colorMode = comp.colorMode ?? "DARK";
  const theme = CODE_THEME[colorMode];
  const defaultStepDurationMs = comp.stepDurationMs ?? 2500;
  const transitionDurationMs = comp.transitionDurationMs ?? 550;
  const processedSteps = useMemo(
    () => processStepsWithTwoslash(comp.steps, comp.autoParseTwoslash !== false),
    [comp.steps, comp.autoParseTwoslash],
  );
  const transitionDurationFrames = Math.max(
    1,
    Math.round((transitionDurationMs / 1000) * fps),
  );

  const stepDurations = useMemo(
    () => getStepDurations(processedSteps, fps, defaultStepDurationMs),
    [processedSteps, fps, defaultStepDurationMs],
  );
  const stepState = useMemo(
    () => getStepState(frame, stepDurations),
    [frame, stepDurations],
  );

  const currentStep = processedSteps[stepState.index];
  const previousStep =
    stepState.index > 0 ? processedSteps[stepState.index - 1] : null;
  const isTransitioning = Boolean(
    previousStep && stepState.frameInStep < transitionDurationFrames,
  );

  const transitionProgress = previousStep
    ? interpolate(
        stepState.frameInStep,
        [0, transitionDurationFrames],
        [0, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.17, 0.67, 0.76, 0.91),
        },
      )
    : 1;

  const annotationOpacity = interpolate(
    stepState.frameInStep,
    [Math.max(0, transitionDurationFrames - 8), transitionDurationFrames + 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const width = resolveSize(comp.size);
  const progressInVideo = Math.min(
    1,
    frame / Math.max(1, stepState.totalDurationInFrames),
  );

  return (
    <Box style={positionToStyle(comp.position)}>
      <Box
        sx={{
          width,
          maxWidth: "92vw",
          borderRadius: 3,
          border: `1px solid ${theme.panelBorder}`,
          backgroundColor: theme.panel,
          p: 3,
          boxShadow: "0 24px 48px rgba(0, 0, 0, 0.28)",
          overflow: "hidden",
        }}
      >
        {comp.showProgressBar !== false ? (
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            {processedSteps.map((_, stepIndex) => {
              const segmentProgress =
                stepIndex < stepState.index
                  ? 1
                  : stepIndex === stepState.index
                    ? stepState.stepProgress
                    : 0;

              return (
                <Box
                  key={`progress-${stepIndex}`}
                  sx={{
                    height: 6,
                    flex: 1,
                    borderRadius: 999,
                    overflow: "hidden",
                    backgroundColor: theme.progressTrack,
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: `${segmentProgress * 100}%`,
                      backgroundColor: theme.progressFill,
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        ) : null}

        {currentStep.title ? (
          <Typography variant="h6" sx={{ mb: 1.5, color: theme.foreground }}>
            {currentStep.title}
          </Typography>
        ) : null}

        <Box
          sx={{
            position: "relative",
            minHeight: 520,
          }}
        >
          {previousStep && isTransitioning ? (
            <CodeTransitionLayer
              oldStep={previousStep}
              newStep={currentStep}
              colorMode={colorMode}
              showLineNumbers={comp.showLineNumbers !== false}
              transitionProgress={transitionProgress}
              annotationOpacity={annotationOpacity}
            />
          ) : (
            <CodeStepLayer
              step={currentStep}
              colorMode={colorMode}
              showLineNumbers={comp.showLineNumbers !== false}
              opacity={1}
              translateY={0}
              annotationOpacity={annotationOpacity}
            />
          )}
        </Box>

        <Box sx={{ mt: 2, color: theme.lineNumber, fontSize: 13 }}>
          {Math.round(progressInVideo * 100)}%
        </Box>
      </Box>
    </Box>
  );
};

export default CodeExplainer;
