import {
  CODE_FONT_FAMILY,
  CODE_LINE_HEIGHT,
  LINE_NUMBER_GUTTER_CH,
  PANEL_HORIZONTAL_PADDING_PX,
} from "../constants";
import type { CodeExplainerStep } from "../types";
import { buildLineAnnotations } from "./annotations";

const CHAR_WIDTH_FACTOR = 0.62;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

type TextMeasurer = (text: string) => number;
type StepAnchor =
  | { type: "focus"; lineNumber: number }
  | { type: "annotation"; lineNumber: number };

export const createCodeTextMeasurer = (fontSize: number): TextMeasurer => {
  if (typeof document === "undefined") {
    return (text) => Math.max(1, text.length) * fontSize * CHAR_WIDTH_FACTOR;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    return (text) => Math.max(1, text.length) * fontSize * CHAR_WIDTH_FACTOR;
  }

  context.font = `400 ${fontSize}px ${CODE_FONT_FAMILY}`;
  return (text) => {
    const safeText = text.length > 0 ? text : " ";
    return Math.max(1, context.measureText(safeText).width);
  };
};

const getStepAnchor = (step: CodeExplainerStep): StepAnchor | null => {
  if (typeof step.focusLineNumber === "number" && step.focusLineNumber >= 1) {
    return { type: "focus", lineNumber: Math.floor(step.focusLineNumber) };
  }

  const annotationLines = [...(step.callouts ?? []), ...(step.errors ?? [])]
    .map((annotation) => annotation.lineNumber)
    .filter((lineNumber) => Number.isFinite(lineNumber) && lineNumber >= 1);

  if (annotationLines.length === 0) {
    return null;
  }

  return { type: "annotation", lineNumber: Math.min(...annotationLines) };
};

const getWrappedLineSegments = ({
  line,
  innerWidthPx,
  wrap,
  measureText,
}: {
  line: string;
  innerWidthPx: number;
  wrap: boolean;
  measureText: TextMeasurer;
}): number => {
  if (!wrap) return 1;

  const safeInnerWidth = Math.max(1, innerWidthPx);
  const lineWidth = measureText(line);
  return Math.max(1, Math.ceil(lineWidth / safeInnerWidth));
};

export const getWrappedVisualLinesForText = ({
  text,
  innerWidthPx,
  measureText,
}: {
  text: string;
  innerWidthPx: number;
  measureText: TextMeasurer;
}): number => {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  return lines.reduce((sum, line) => {
    const lineWidth = measureText(line);
    return sum + Math.max(1, Math.ceil(lineWidth / Math.max(1, innerWidthPx)));
  }, 0);
};

const getStepAnnotationBottomPx = ({
  step,
  lineStartOffsetsPx,
  lineHeightPx,
  innerWidthPx,
  measureText,
}: {
  step: CodeExplainerStep;
  lineStartOffsetsPx: number[];
  lineHeightPx: number;
  innerWidthPx: number;
  measureText: TextMeasurer;
}): number => {
  const annotationsByLine = buildLineAnnotations(step);
  const bubbleInnerWidthPx = Math.max(1, innerWidthPx - 32);
  let maxBottomPx = 0;

  for (const [lineNumber, annotations] of annotationsByLine.entries()) {
    const lineIndex = lineNumber - 1;
    const lineStartPx = lineStartOffsetsPx[lineIndex];
    if (lineStartPx === undefined) continue;

    const baseTopPx = lineStartPx + lineHeightPx;
    let stackOrder = 0;

    for (const annotation of [...annotations.callouts, ...annotations.errors]) {
      const source = annotation.code ?? annotation.message;
      const wrappedLines = getWrappedVisualLinesForText({
        text: source,
        innerWidthPx: bubbleInnerWidthPx,
        measureText,
      });

      const bubbleOverheadLines = 1.2;
      const bubbleHeightPx =
        (wrappedLines + bubbleOverheadLines) * lineHeightPx;
      const bubbleTopPx = baseTopPx + stackOrder * 1.1 * lineHeightPx;
      maxBottomPx = Math.max(maxBottomPx, bubbleTopPx + bubbleHeightPx);
      stackOrder += 1;
    }
  }

  return maxBottomPx;
};

const getStepLineStartOffsetsPx = ({
  step,
  fontSize,
  innerWidthPx,
  wrap,
  measureText,
}: {
  step: CodeExplainerStep;
  fontSize: number;
  innerWidthPx: number;
  wrap: boolean;
  measureText: TextMeasurer;
}): { offsets: number[]; visualLineCount: number } => {
  const lineHeightPx = fontSize * CODE_LINE_HEIGHT;
  const lines = step.code.replace(/\r\n/g, "\n").split("\n");
  const offsets: number[] = [];

  let visualLineCursor = 0;
  for (const line of lines) {
    offsets.push(visualLineCursor * lineHeightPx);
    visualLineCursor += getWrappedLineSegments({
      line,
      innerWidthPx,
      wrap,
      measureText,
    });
  }

  return {
    offsets,
    visualLineCount: visualLineCursor,
  };
};

export const getStepVisualLineStartOffsetsPx = ({
  step,
  fontSize,
  panelWidth,
  showLineNumbers,
  wrap,
}: {
  step: CodeExplainerStep;
  fontSize: number;
  panelWidth: number;
  showLineNumbers: boolean;
  wrap: boolean;
}): number[] => {
  const measureText = createCodeTextMeasurer(fontSize);
  const innerWidthPx = getCodeInnerWidthPx({
    fontSize,
    panelWidth,
    showLineNumbers,
    measureText,
  });

  return getStepLineStartOffsetsPx({
    step,
    fontSize,
    innerWidthPx,
    wrap,
    measureText,
  }).offsets;
};

export const getCodeInnerWidthPx = ({
  fontSize,
  panelWidth,
  showLineNumbers,
  measureText = createCodeTextMeasurer(fontSize),
}: {
  fontSize: number;
  panelWidth: number;
  showLineNumbers: boolean;
  measureText?: TextMeasurer;
}): number => {
  const charWidth = measureText("0");
  const gutterPx = showLineNumbers ? LINE_NUMBER_GUTTER_CH * charWidth : 0;
  return Math.max(1, panelWidth - PANEL_HORIZONTAL_PADDING_PX - gutterPx);
};

export const computeStepScrollOffsets = ({
  steps,
  fontSize,
  panelWidth,
  viewportHeight,
  showLineNumbers,
  wrap,
}: {
  steps: CodeExplainerStep[];
  fontSize: number;
  panelWidth: number;
  viewportHeight: number;
  showLineNumbers: boolean;
  wrap: boolean;
}): number[] => {
  const measureText = createCodeTextMeasurer(fontSize);
  const innerWidthPx = getCodeInnerWidthPx({
    fontSize,
    panelWidth,
    showLineNumbers,
    measureText,
  });

  const offsets: number[] = [];
  let previousOffset = 0;

  for (const step of steps) {
    const { offsets: lineStartOffsetsPx, visualLineCount } =
      getStepLineStartOffsetsPx({
        step,
        fontSize,
        innerWidthPx,
        wrap,
        measureText,
      });

    const lineCount = lineStartOffsetsPx.length;
    const lineHeightPx = fontSize * CODE_LINE_HEIGHT;
    const codeHeightPx = Math.max(0, visualLineCount * lineHeightPx);
    const annotationBottomPx = getStepAnnotationBottomPx({
      step,
      lineStartOffsetsPx,
      lineHeightPx,
      innerWidthPx,
      measureText,
    });
    const contentHeightPx = Math.max(codeHeightPx, annotationBottomPx);
    const baseMaxScrollPx = Math.max(0, contentHeightPx - viewportHeight);

    const anchor = getStepAnchor(step);
    if (!anchor || lineCount === 0) {
      const stableOffset = clamp(previousOffset, 0, baseMaxScrollPx);
      offsets.push(stableOffset);
      previousOffset = stableOffset;
      continue;
    }

    const anchorIndex = clamp(anchor.lineNumber - 1, 0, lineCount - 1);
    const lineOffsetPx = lineStartOffsetsPx[anchorIndex] ?? 0;
    const anchorOffsetPx =
      anchor.type === "focus" ? lineOffsetPx : lineOffsetPx + lineHeightPx;
    const nextOffset = clamp(anchorOffsetPx, 0, baseMaxScrollPx);

    offsets.push(nextOffset);
    previousOffset = nextOffset;
  }

  return offsets;
};
