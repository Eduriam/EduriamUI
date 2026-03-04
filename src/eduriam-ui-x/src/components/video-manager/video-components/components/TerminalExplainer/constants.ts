import type { TerminalExplainerColorMode, TerminalTheme } from "./types";

export const TERMINAL_THEME: Record<TerminalExplainerColorMode, TerminalTheme> = {
  DARK: {
    panel: "#0b1220",
    panelBorder: "#1f2937",
    headerBg: "#111827",
    terminalBg: "#020617",
    terminalBorder: "#1e293b",
    foreground: "#dbe4f3",
    prompt: "#4ade80",
    success: "#86efac",
    warning: "#fbbf24",
    error: "#f87171",
    muted: "#94a3b8",
  },
  LIGHT: {
    panel: "#e2e8f0",
    panelBorder: "#94a3b8",
    headerBg: "#cbd5e1",
    terminalBg: "#f8fafc",
    terminalBorder: "#cbd5e1",
    foreground: "#0f172a",
    prompt: "#15803d",
    success: "#166534",
    warning: "#a16207",
    error: "#b91c1c",
    muted: "#475569",
  },
};

export const TERMINAL_FONT_FAMILY =
  '"JetBrains Mono", "Fira Code", Consolas, "Courier New", monospace';
export const TERMINAL_MIN_FONT_SIZE = 13;
export const TERMINAL_MAX_FONT_SIZE = 28;
export const TERMINAL_LINE_HEIGHT = 1.45;
export const TERMINAL_HORIZONTAL_PADDING_PX = 44;
export const TERMINAL_VERTICAL_PADDING_PX = 18;
export const TERMINAL_HEADER_HEIGHT_PX = 42;
export const TERMINAL_HEADER_DOT_SIZE_PX = 20;

const TERMINAL_BOTTOM_SAFETY_MIN_PX = 4;
const TERMINAL_BOTTOM_SAFETY_RATIO = 0.35;

export const getTerminalBottomSafetyPx = (fontSize: number): number => {
  return Math.max(
    TERMINAL_BOTTOM_SAFETY_MIN_PX,
    Math.ceil(fontSize * TERMINAL_BOTTOM_SAFETY_RATIO),
  );
};

export const TERMINAL_EXPLAINER_CONFIG = {
  colorMode: "DARK" as TerminalExplainerColorMode,
  transitionDurationMs: 550,
} as const;
