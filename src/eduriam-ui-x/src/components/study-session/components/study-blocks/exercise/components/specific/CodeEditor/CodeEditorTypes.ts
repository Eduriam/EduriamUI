/**
 * Segment inside a fillInBlank code template.
 *
 * - `"text"` segments are rendered as-is (monospace code).
 * - `"blank"` segments are interactive blanks that the user fills
 *   by clicking option buttons or typing.
 */
export type CodeSegment =
  | { type: "text"; value: string }
  | { type: "blank"; blankId: string };

/**
 * A single line of code segments used by the fillInBlank windows.
 */
export type CodeLine = CodeSegment[];

// ---------------------------------------------------------------------------
// Tab types
// ---------------------------------------------------------------------------

export type CodeEditorTabType =
  | "fillInBlankWithOptions"
  | "fillInBlankWithoutOptions"
  | "fillInCode"
  | "browser"
  | "table"
  | "terminal";

interface BaseTab {
  /** Unique identifier for the tab. */
  id: string;
  /** Display label shown in the tab bar. */
  label: string;
}

/**
 * Fill-in-blank tab **with options**: read-only code template where blank
 * segments are populated by the user via CodeOptionButtons.
 */
export interface FillInBlankWithOptionsTab extends BaseTab {
  type: "fillInBlankWithOptions";
  /** Code template split into lines of segments. */
  lines: CodeLine[];
  /** Map from blankId to the correct value. */
  correctAnswers: Record<string, string>;
  /** Option button values shown below the editor when this tab is active. */
  options: string[];
  /** Optional Prism language for syntax highlighting (e.g. "javascript", "html"). */
  language?: string;
}

/**
 * Fill-in-blank tab **without options**: read-only code template where blank
 * segments are populated by the user typing on the keyboard.
 */
export interface FillInBlankWithoutOptionsTab extends BaseTab {
  type: "fillInBlankWithoutOptions";
  /** Code template split into lines of segments. */
  lines: CodeLine[];
  /** Map from blankId to the correct value. */
  correctAnswers: Record<string, string>;
  /** Optional Prism language for syntax highlighting (e.g. "javascript", "html"). */
  language?: string;
  /**
   * When set, a KeyboardExtension bar is shown with the characters from
   * the matching keyboard set (e.g. `"html"`, `"css"`, `"javascript"`).
   */
  keyboardSet?: string;
}

/**
 * Fill-in-code tab: editable code area with optional default value and
 * a reset button.
 */
export interface FillInCodeTab extends BaseTab {
  type: "fillInCode";
  /** Default code value the textarea starts with and resets to. */
  defaultValue?: string;
  /**
   * When set, the typed value is compared against this string (trimmed)
   * to compute RIGHT/WRONG. When omitted the tab is considered RIGHT
   * as soon as the user types anything.
   */
  correctAnswer?: string;
  /** Optional Prism language for syntax highlighting (e.g. "javascript", "python"). */
  language?: string;
  /**
   * When set, a KeyboardExtension bar is shown with the characters from
   * the matching keyboard set (e.g. `"html"`, `"css"`, `"javascript"`).
   */
  keyboardSet?: string;
}

/**
 * Browser tab: renders HTML (with optional inline CSS/JS) inside a
 * sandboxed iframe, isolated from the host page.
 */
export interface BrowserTab extends BaseTab {
  type: "browser";
  /** Raw HTML content to render. */
  html: string;
  /** Optional inline CSS injected into the document. */
  inlineCss?: string;
  /** Optional inline JS injected into the document. */
  inlineJs?: string;
}

/**
 * Table tab: displays a predefined data table.
 * The first row is treated as a header row.
 */
export interface TableTab extends BaseTab {
  type: "table";
  /** Table rows. First row = header. */
  rows: string[][];
}

/**
 * Terminal tab: displays predefined terminal output (no interaction).
 */
export interface TerminalTab extends BaseTab {
  type: "terminal";
  /** Lines of terminal output. */
  lines: string[];
  /** Optional Prism language for syntax highlighting (e.g. "bash", "shell"). */
  language?: string;
}

/**
 * Union of all possible code-editor tab configurations.
 */
export type CodeEditorTab =
  | FillInBlankWithOptionsTab
  | FillInBlankWithoutOptionsTab
  | FillInCodeTab
  | BrowserTab
  | TableTab
  | TerminalTab;

/**
 * Convenience union for both fill-in-blank variants.
 */
export type FillInBlankTab =
  | FillInBlankWithOptionsTab
  | FillInBlankWithoutOptionsTab;

// ---------------------------------------------------------------------------
// Passive tabs – types that are only shown after "Check" is clicked.
// ---------------------------------------------------------------------------

/** Tab types that are considered "passive" (output-only). */
export const PASSIVE_TAB_TYPES: ReadonlySet<CodeEditorTabType> = new Set([
  "browser",
  "table",
  "terminal",
]);
