import {
  CODE_LINE_HEIGHT,
  CODE_MAX_FONT_SIZE,
  CODE_MIN_FONT_SIZE,
  LINE_NUMBER_GUTTER_CH,
  PANEL_HORIZONTAL_PADDING_PX,
} from "../constants";
import type { CodeExplainerStep } from "../types";

type ResponsiveCodeLayout = {
  fontSize: number;
  panelWidth: number;
  shouldWrap: boolean;
  codeAreaMinHeight: number;
};

const CHAR_WIDTH_FACTOR = 0.62;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const getMaxFontSizeForWidth = (compositionWidth: number): number => {
  if (compositionWidth <= 420) return 16;
  if (compositionWidth <= 560) return 18;
  if (compositionWidth <= 768) return 22;
  if (compositionWidth <= 1024) return 26;
  return CODE_MAX_FONT_SIZE;
};

const getMaxCodeHeightRatio = (compositionWidth: number): number => {
  if (compositionWidth <= 420) return 0.48;
  if (compositionWidth <= 560) return 0.52;
  if (compositionWidth <= 768) return 0.58;
  return 0.66;
};

const getLongestLineLength = (steps: CodeExplainerStep[]): number => {
  let longest = 1;
  for (const step of steps) {
    const lines = step.code.replace(/\r\n/g, "\n").split("\n");
    for (const line of lines) {
      if (line.length > longest) longest = line.length;
    }
  }
  return longest;
};

const getStepCodeWrappedLineCount = (
  step: CodeExplainerStep,
  fontSize: number,
  innerWidthPx: number,
): number => {
  const charWidth = fontSize * CHAR_WIDTH_FACTOR;
  const safeInnerWidth = Math.max(1, innerWidthPx);

  const lines = step.code.replace(/\r\n/g, "\n").split("\n");
  return lines.reduce((sum, line) => {
    const lineWidth = Math.max(1, line.length) * charWidth;
    const segments = Math.max(1, Math.ceil(lineWidth / safeInnerWidth));
    return sum + segments;
  }, 0);
};

const getAnnotationTextLines = (value: string): string[] =>
  value.replace(/\r\n/g, "\n").split("\n");

const getStepAnnotationWrappedLineCount = (
  step: CodeExplainerStep,
  fontSize: number,
  innerWidthPx: number,
): number => {
  const charWidth = fontSize * CHAR_WIDTH_FACTOR;
  const safeInnerWidth = Math.max(1, innerWidthPx);
  const bubbleInnerWidthPx = Math.max(1, safeInnerWidth - 32);
  const annotations = [...(step.callouts ?? []), ...(step.errors ?? [])];
  const wrappedLinesForStep = annotations.reduce((sum, annotation) => {
    const source = annotation.code ?? annotation.message;
    const wrappedLines = getAnnotationTextLines(source).reduce(
      (lineSum, line) => {
        const lineWidth = Math.max(1, line.length) * charWidth;
        const segments = Math.max(1, Math.ceil(lineWidth / bubbleInnerWidthPx));
        return lineSum + segments;
      },
      0,
    );

    const bubbleOverheadLines = 1.2;
    return sum + wrappedLines + bubbleOverheadLines;
  }, 0);

  return Math.ceil(wrappedLinesForStep);
};

export const computeResponsiveCodeLayout = ({
  steps,
  compositionWidth,
  compositionHeight,
  showLineNumbers,
}: {
  steps: CodeExplainerStep[];
  compositionWidth: number;
  compositionHeight: number;
  showLineNumbers: boolean;
}): ResponsiveCodeLayout => {
  const maxPanelWidth = Math.max(320, Math.floor(compositionWidth * 0.94));
  const minPanelWidth =
    compositionWidth <= 420
      ? Math.max(180, Math.floor(compositionWidth * 0.56))
      : compositionWidth <= 560
        ? Math.max(220, Math.floor(compositionWidth * 0.52))
        : Math.max(260, Math.floor(compositionWidth * 0.48));

  const longestLineChars = getLongestLineLength(steps);
  const widthBasedMaxFont = getMaxFontSizeForWidth(compositionWidth);
  const maxCodeHeight = compositionHeight * getMaxCodeHeightRatio(compositionWidth);

  const chooseFontSize = (): number => {
    for (let font = widthBasedMaxFont; font >= CODE_MIN_FONT_SIZE; font -= 1) {
      const charWidth = font * CHAR_WIDTH_FACTOR;
      const gutterPx = showLineNumbers ? LINE_NUMBER_GUTTER_CH * charWidth : 0;
      const innerWidthAtMaxPanel =
        maxPanelWidth - PANEL_HORIZONTAL_PADDING_PX - gutterPx;
      const maxStepTotalWrappedLines = steps.reduce((max, step) => {
        const codeLines = getStepCodeWrappedLineCount(
          step,
          font,
          innerWidthAtMaxPanel,
        );
        const annotationLines = getStepAnnotationWrappedLineCount(
          step,
          font,
          innerWidthAtMaxPanel,
        );
        return Math.max(max, codeLines + annotationLines);
      }, 1);
      const codeHeight = maxStepTotalWrappedLines * font * CODE_LINE_HEIGHT;
      if (codeHeight <= maxCodeHeight) return font;
    }

    return CODE_MIN_FONT_SIZE;
  };

  const fontSize = chooseFontSize();
  const charWidth = fontSize * CHAR_WIDTH_FACTOR;
  const gutterPx = showLineNumbers ? LINE_NUMBER_GUTTER_CH * charWidth : 0;
  const naturalInnerWidth = longestLineChars * charWidth + gutterPx;
  const naturalPanelWidth = naturalInnerWidth + PANEL_HORIZONTAL_PADDING_PX;
  const panelWidth = clamp(naturalPanelWidth, minPanelWidth, maxPanelWidth);
  const wrapSafetyMarginPx = charWidth * 2;
  const shouldWrap = naturalPanelWidth >= panelWidth - wrapSafetyMarginPx;
  const innerWidthForHeight = Math.max(
    1,
    panelWidth - PANEL_HORIZONTAL_PADDING_PX - gutterPx,
  );
  const maxStepTotalWrappedLinesAtFinalWidth = steps.reduce((max, step) => {
    const codeLines = getStepCodeWrappedLineCount(
      step,
      fontSize,
      innerWidthForHeight,
    );
    const annotationLines = getStepAnnotationWrappedLineCount(
      step,
      fontSize,
      innerWidthForHeight,
    );
    return Math.max(max, codeLines + annotationLines);
  }, 1);
  const codeAreaMinHeight = clamp(
    Math.round(maxStepTotalWrappedLinesAtFinalWidth * fontSize * CODE_LINE_HEIGHT + 20),
    100,
    Math.round(compositionHeight * (compositionWidth <= 560 ? 0.52 : 0.7)),
  );

  return {
    fontSize,
    panelWidth,
    shouldWrap,
    codeAreaMinHeight,
  };
};
