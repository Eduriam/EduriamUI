import {
  getTerminalBottomSafetyPx,
  TERMINAL_FONT_FAMILY,
  TERMINAL_HORIZONTAL_PADDING_PX,
  TERMINAL_LINE_HEIGHT,
} from "../constants";
import type { TerminalExplainerStep } from "../types";

const CHAR_WIDTH_FACTOR = 0.62;

type TextMeasurer = (text: string) => number;

const getNormalizedLines = (output: string): string[] => {
  return output.replace(/\r\n/g, "\n").split("\n");
};

const createTerminalTextMeasurer = (fontSize: number): TextMeasurer => {
  if (typeof document === "undefined") {
    return (text) => Math.max(1, text.length) * fontSize * CHAR_WIDTH_FACTOR;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    return (text) => Math.max(1, text.length) * fontSize * CHAR_WIDTH_FACTOR;
  }

  context.font = `400 ${fontSize}px ${TERMINAL_FONT_FAMILY}`;
  return (text) => {
    const safeText = text.length > 0 ? text : " ";
    return Math.max(1, context.measureText(safeText).width);
  };
};

const estimateStepContentHeightPx = ({
  step,
  fontSize,
  innerWidthPx,
  wrap,
  measureText,
}: {
  step: TerminalExplainerStep;
  fontSize: number;
  innerWidthPx: number;
  wrap: boolean;
  measureText: TextMeasurer;
}): number => {
  const lines = getNormalizedLines(step.output);
  const lineHeightPx = fontSize * TERMINAL_LINE_HEIGHT;

  if (!wrap) {
    return Math.max(1, lines.length) * lineHeightPx;
  }

  const charWidthPx = Math.max(1, measureText("0"));
  const maxCharsPerVisualLine = Math.max(1, Math.floor(innerWidthPx / charWidthPx));
  const visualLines = lines.reduce((total, line) => {
    return total + Math.max(1, Math.ceil(line.length / maxCharsPerVisualLine));
  }, 0);

  return Math.max(1, visualLines) * lineHeightPx;
};

const measureStepContentHeightPx = ({
  step,
  fontSize,
  innerWidthPx,
  wrap,
  measureText,
}: {
  step: TerminalExplainerStep;
  fontSize: number;
  innerWidthPx: number;
  wrap: boolean;
  measureText: TextMeasurer;
}): number => {
  if (typeof document === "undefined") {
    return estimateStepContentHeightPx({
      step,
      fontSize,
      innerWidthPx,
      wrap,
      measureText,
    });
  }

  const probe = document.createElement("div");
  probe.style.position = "absolute";
  probe.style.left = "-99999px";
  probe.style.top = "0";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.margin = "0";
  probe.style.padding = "0";
  probe.style.boxSizing = "border-box";
  probe.style.width = `${Math.max(1, innerWidthPx)}px`;
  probe.style.fontFamily = TERMINAL_FONT_FAMILY;
  probe.style.fontSize = `${fontSize}px`;
  probe.style.lineHeight = String(TERMINAL_LINE_HEIGHT);
  probe.style.whiteSpace = wrap ? "pre-wrap" : "pre";
  probe.style.overflowWrap = wrap ? "anywhere" : "normal";
  probe.style.wordBreak = wrap ? "break-word" : "normal";
  probe.textContent = step.output.length > 0 ? step.output : " ";

  document.body.appendChild(probe);
  const measured = Math.ceil(probe.scrollHeight);
  document.body.removeChild(probe);

  if (measured > 0) {
    return measured;
  }

  return estimateStepContentHeightPx({
    step,
    fontSize,
    innerWidthPx,
    wrap,
    measureText,
  });
};

export const getTerminalInnerWidthPx = ({
  panelWidth,
}: {
  panelWidth: number;
}): number => {
  return Math.max(1, panelWidth - TERMINAL_HORIZONTAL_PADDING_PX);
};

export const computeStepScrollOffsets = ({
  steps,
  fontSize,
  panelWidth,
  viewportHeight,
  wrap,
}: {
  steps: TerminalExplainerStep[];
  fontSize: number;
  panelWidth: number;
  viewportHeight: number;
  wrap: boolean;
}): number[] => {
  const measureText = createTerminalTextMeasurer(fontSize);
  const innerWidthPx = getTerminalInnerWidthPx({ panelWidth });
  const bottomSafetyPx = getTerminalBottomSafetyPx(fontSize);

  return steps.map((step) => {
    const contentHeightPx =
      measureStepContentHeightPx({
        step,
        fontSize,
        innerWidthPx,
        wrap,
        measureText,
      }) + bottomSafetyPx;

    return Math.max(0, contentHeightPx - viewportHeight);
  });
};
