import type { CodeExplainerColorMode, CodeTheme } from "./types";

export const CODE_THEME: Record<CodeExplainerColorMode, CodeTheme> = {
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

export const CODE_FONT_FAMILY = '"JetBrains Mono", Consolas, "Courier New", monospace';
export const CODE_FONT_SIZE = 28;
export const LINE_NUMBER_GUTTER_CH = 4;
export const ANNOTATION_ARROW_OFFSET_CH = 1.5;

