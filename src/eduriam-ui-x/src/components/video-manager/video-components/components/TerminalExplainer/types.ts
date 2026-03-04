import type { BaseVideoComponent } from "../../VideoComponent";

export type TerminalExplainerColorMode = "DARK" | "LIGHT";

export interface TerminalExplainerStep {
  id?: string;
  output: string;
  startTime: number;
}

export interface ITerminalExplainer extends BaseVideoComponent {
  type: "TERMINAL_EXPLAINER";
  steps: TerminalExplainerStep[];
  title?: string;
}

export interface ITerminalExplainerProps {
  comp: ITerminalExplainer;
}

export type TerminalTokenPart = {
  content: string;
  start: number;
  end: number;
};

export type PositionedTerminalToken = TerminalTokenPart & {
  lineIndex: number;
  lineTokenIndex: number;
  globalIndex: number;
};

export type TerminalStepTokenLayout = {
  byLine: PositionedTerminalToken[][];
  flat: PositionedTerminalToken[];
};

export type TerminalTokenTransitionLayout = {
  oldByNewGlobalIndex: Map<number, PositionedTerminalToken>;
  removedOldTokens: PositionedTerminalToken[];
};

export type TerminalTheme = {
  panel: string;
  panelBorder: string;
  headerBg: string;
  terminalBg: string;
  terminalBorder: string;
  foreground: string;
  prompt: string;
  success: string;
  warning: string;
  error: string;
  muted: string;
};

export type StepState = {
  index: number;
  startFrame: number;
  duration: number;
  frameInStep: number;
  totalDurationInFrames: number;
};
