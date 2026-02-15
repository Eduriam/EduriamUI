import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/** Figma studySession/terminal/* variables. */
const TERMINAL_BG = "#0c0c0c";
const TERMINAL_TEXT = "#cccccc";

export interface CodeEditorTerminalProps {
  /** Lines of terminal output to display. */
  lines: string[];
}

/**
 * Renders predefined terminal output with a dark background and
 * monospace font. No interaction is supported — this is display-only.
 *
 * Colors match the Figma design system terminal variables.
 */
export const CodeEditorTerminal: React.FC<CodeEditorTerminalProps> = ({
  lines,
}) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: "auto",
        backgroundColor: TERMINAL_BG,
        p: 3,
        minHeight: 150,
      }}
    >
      {lines.map((line, idx) => (
        <Typography
          key={idx}
          component="div"
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
      ))}
    </Box>
  );
};

export default CodeEditorTerminal;
