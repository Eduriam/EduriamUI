import React from "react";

import Box from "@mui/material/Box";
import type { TypographyProps } from "@mui/material/Typography";
import Typography from "@mui/material/Typography";

import CodeBlank from "../../../../../../shared/CodeBlank/CodeBlank";
import type { CodeLine } from "../CodeEditorTypes";
import { SyntaxHighlightedCode } from "./SyntaxHighlightedCode";

export interface CodeEditorFillInBlankWithOptionsProps {
  /** Code lines with text and blank segments. */
  lines: CodeLine[];

  /** Map from blankId to filled value (empty string or undefined = not filled). */
  filledBlanks: Record<string, string>;

  /** Called when the user clicks a filled blank to remove the value. */
  onBlankClick?: (blankId: string) => void;

  /** Optional Prism language for syntax highlighting (e.g. "javascript", "html"). */
  language?: string;
}

/**
 * Renders a read-only code template where blank segments are shown as
 * interactive `CodeBlank` buttons and text segments use monospace code
 * typography. Users fill blanks by selecting from option buttons.
 */
export const CodeEditorFillInBlankWithOptions: React.FC<CodeEditorFillInBlankWithOptionsProps> = ({
  lines,
  filledBlanks,
  onBlankClick,
  language,
}) => {
  return (
    <Box
      sx={{
        px: 4,
        py: 3,
        overflow: "auto",
        flexGrow: 1,
      }}
    >
      {lines.map((line, lineIdx) => (
        <Box key={lineIdx} sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", minHeight: 21.1 }}>
          {line.map((segment, segIdx) => {
            if (segment.type === "text") {
              if (language) {
                return (
                  <SyntaxHighlightedCode
                    key={segIdx}
                    code={segment.value}
                    language={language}
                    sx={{ whiteSpace: "pre" }}
                  />
                );
              }
              return (
                <Typography
                  key={segIdx}
                  component="span"
                  variant={"code" as TypographyProps["variant"]}
                  sx={{ whiteSpace: "pre" }}
                >
                  {segment.value}
                </Typography>
              );
            }

            const filled = !!filledBlanks[segment.blankId];
            const value = filledBlanks[segment.blankId] ?? "\u00A0\u00A0\u00A0\u00A0";

            return (
              <CodeBlank
                key={segIdx}
                code={value}
                filled={filled}
                onClick={
                  filled ? () => onBlankClick?.(segment.blankId) : undefined
                }
              />
            );
          })}
        </Box>
      ))}
    </Box>
  );
};

export default CodeEditorFillInBlankWithOptions;
