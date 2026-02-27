import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { SyntaxHighlightedCode } from "./SyntaxHighlightedCode";

/** Figma studySession/terminal/* variables. */
const TERMINAL_BG = "#0c0c0c";
const TERMINAL_TEXT = "#cccccc";

export interface CodeEditorTerminalProps {
  /** Lines of terminal output to display. */
  lines: string[];

  /** Optional Prism language for syntax highlighting (e.g. "bash", "shell"). */
  language?: string;
  dataTest?: string;
}

/**
 * Renders predefined terminal output with a dark background and
 * monospace font. No interaction is supported — this is display-only.
 *
 * Colors match the Figma design system terminal variables.
 * When language is set, each line is syntax-highlighted (e.g. "bash").
 */
export const CodeEditorTerminal: React.FC<CodeEditorTerminalProps> = ({
  lines,
  language,
  dataTest,
}) => {
  return (
    <Box
      data-test={dataTest}
      sx={{
        flexGrow: 1,
        overflow: "auto",
        backgroundColor: TERMINAL_BG,
        p: 3,
        minHeight: 150,
      }}
    >
      {lines.map((line, idx) => (
        <Box
          key={idx}
          component="div"
          sx={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 16,
            lineHeight: "21.1px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {language ? (
            <SyntaxHighlightedCode
              code={line || "\u00A0"}
              language={language}
              sx={{
                color: TERMINAL_TEXT,
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
              defaultColor={TERMINAL_TEXT}
              tokenColors={
                // Terminal uses dark bg; override so tokens stay visible
                {
                  keyword: "#569cd6",
                  string: "#ce9178",
                  number: "#b5cea8",
                  comment: "#6a9955",
                  function: "#dcdcaa",
                  "class-name": "#4ec9b0",
                  plain: TERMINAL_TEXT,
                }
              }
            />
          ) : (
            <Typography
              component="span"
              sx={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 16,
                lineHeight: "21.1px",
                color: TERMINAL_TEXT,
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {line || "\u00A0"}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default CodeEditorTerminal;
