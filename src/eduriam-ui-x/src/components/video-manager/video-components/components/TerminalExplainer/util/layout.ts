import {
  TERMINAL_HORIZONTAL_PADDING_PX,
  TERMINAL_LINE_HEIGHT,
  TERMINAL_MAX_FONT_SIZE,
  TERMINAL_MIN_FONT_SIZE,
} from "../constants";
import type { TerminalExplainerStep } from "../types";

type ResponsiveTerminalLayout = {
  fontSize: number;
  panelWidth: number;
  shouldWrap: boolean;
  viewportHeight: number;
};

const CHAR_WIDTH_FACTOR = 0.62;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const getMaxFontSizeForWidth = (compositionWidth: number): number => {
  if (compositionWidth <= 420) return 15;
  if (compositionWidth <= 560) return 17;
  if (compositionWidth <= 768) return 20;
  if (compositionWidth <= 1024) return 22;
  return TERMINAL_MAX_FONT_SIZE;
};

const getViewportHeightRatio = (compositionWidth: number): number => {
  if (compositionWidth <= 420) return 0.44;
  if (compositionWidth <= 560) return 0.46;
  if (compositionWidth <= 768) return 0.48;
  return 0.5;
};

const getLongestLineLength = (steps: TerminalExplainerStep[]): number => {
  let longest = 1;

  for (const step of steps) {
    const lines = step.output.replace(/\r\n/g, "\n").split("\n");
    for (const line of lines) {
      if (line.length > longest) longest = line.length;
    }
  }

  return longest;
};

const getMaxLineCount = (steps: TerminalExplainerStep[]): number => {
  return steps.reduce((max, step) => {
    const lineCount = step.output.replace(/\r\n/g, "\n").split("\n").length;
    return Math.max(max, lineCount);
  }, 1);
};

const getResponsiveFontSize = ({
  compositionWidth,
  maxLineCount,
}: {
  compositionWidth: number;
  maxLineCount: number;
}): number => {
  const widthBasedMax = getMaxFontSizeForWidth(compositionWidth);

  // Slightly reduce font when there are many lines, but do not try to fit all lines.
  const densityReduction = Math.floor(Math.max(0, maxLineCount - 14) / 8);

  return clamp(
    widthBasedMax - densityReduction,
    TERMINAL_MIN_FONT_SIZE,
    widthBasedMax,
  );
};

export const computeResponsiveTerminalLayout = ({
  steps,
  compositionWidth,
  compositionHeight,
}: {
  steps: TerminalExplainerStep[];
  compositionWidth: number;
  compositionHeight: number;
}): ResponsiveTerminalLayout => {
  const maxPanelWidth = Math.max(360, Math.floor(compositionWidth * 0.94));
  const minPanelWidth =
    compositionWidth <= 560
      ? Math.max(240, Math.floor(compositionWidth * 0.7))
      : Math.max(340, Math.floor(compositionWidth * 0.56));

  const longestLineChars = getLongestLineLength(steps);
  const maxLineCount = getMaxLineCount(steps);
  const fontSize = getResponsiveFontSize({
    compositionWidth,
    maxLineCount,
  });

  const charWidth = fontSize * CHAR_WIDTH_FACTOR;
  const naturalInnerWidth = longestLineChars * charWidth;
  const naturalPanelWidth = naturalInnerWidth + TERMINAL_HORIZONTAL_PADDING_PX;
  const panelWidth = clamp(naturalPanelWidth, minPanelWidth, maxPanelWidth);
  const shouldWrap = naturalPanelWidth >= panelWidth - charWidth;

  const viewportHeight = clamp(
    Math.round(compositionHeight * getViewportHeightRatio(compositionWidth)),
    140,
    Math.round(compositionHeight * 0.62),
  );

  return {
    fontSize,
    panelWidth,
    shouldWrap,
    viewportHeight,
  };
};
