import type { ComponentPosition } from "../../../types/shared";
import type { BaseVideoComponent } from "../../VideoComponent";

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
  durationMs?: number;
  /** Optional 1-based line number to auto-scroll to. */
  focusLineNumber?: number;
  callouts?: CodeExplainerAnnotation[];
  errors?: CodeExplainerAnnotation[];
}

export interface ICodeExplainer extends BaseVideoComponent {
  type: "CODE_EXPLAINER";
  position: ComponentPosition;
  steps: CodeExplainerStep[];
  /** Parse twoslash-style directives (`// ^?`, `// @errors:`) from TS/TSX steps. @default true */
  autoParseTwoslash?: boolean;
  stepDurationMs?: number;
  transitionDurationMs?: number;
  colorMode?: CodeExplainerColorMode;
  showLineNumbers?: boolean;
}

export interface ICodeExplainerProps {
  comp: ICodeExplainer;
}

export type RawTokenPart = {
  type: string;
  content: string;
};

export type TokenPart = RawTokenPart & {
  start: number;
  end: number;
};

export type PositionedToken = TokenPart & {
  lineIndex: number;
  globalIndex: number;
};

export type StepTokenLayout = {
  byLine: PositionedToken[][];
  flat: PositionedToken[];
};

export type TokenTransitionLayout = {
  oldByNewGlobalIndex: Map<number, PositionedToken>;
  removedOldTokens: PositionedToken[];
};

export type LineAnnotations = {
  callouts: CodeExplainerAnnotation[];
  errors: CodeExplainerAnnotation[];
};

export type CodeTheme = {
  panel: string;
  panelBorder: string;
  lineNumber: string;
  foreground: string;
  calloutLineBg: string;
  errorLineBg: string;
  calloutBg: string;
  errorBg: string;
};

export type AnnotationVariant = "callout" | "error";

export type StepState = {
  index: number;
  startFrame: number;
  duration: number;
  frameInStep: number;
  totalDurationInFrames: number;
};

