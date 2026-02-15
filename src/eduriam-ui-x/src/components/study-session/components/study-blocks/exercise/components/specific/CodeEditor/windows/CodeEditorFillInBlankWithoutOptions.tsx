import React from "react";

import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import type { TypographyProps } from "@mui/material/Typography";
import Typography from "@mui/material/Typography";

import type { CodeLine } from "../CodeEditorTypes";

export interface CodeEditorFillInBlankWithoutOptionsProps {
  /** Code lines with text and blank segments. */
  lines: CodeLine[];

  /** Map from blankId to the current typed value. */
  filledBlanks: Record<string, string>;

  /** Called when the user types in a blank. */
  onBlankChange?: (blankId: string, value: string) => void;
}

/**
 * Renders a read-only code template where blank segments are inline text
 * inputs that the user fills by typing on the keyboard (no option buttons).
 */
export const CodeEditorFillInBlankWithoutOptions: React.FC<
  CodeEditorFillInBlankWithoutOptionsProps
> = ({ lines, filledBlanks, onBlankChange }) => {
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
        <Box
          key={lineIdx}
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            minHeight: 21.1,
          }}
        >
          {line.map((segment, segIdx) => {
            if (segment.type === "text") {
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

            return (
              <InputBase
                key={segIdx}
                value={filledBlanks[segment.blankId] ?? ""}
                onChange={(e) =>
                  onBlankChange?.(segment.blankId, e.target.value)
                }
                placeholder=""
                sx={{
                  display: "inline-flex",
                  verticalAlign: "middle",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                  px: 1,
                  py: 0,
                  minWidth: "6ch",
                  width: "auto",
                  "& .MuiInputBase-input": {
                    p: 0,
                    py: 0.5,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "1rem",
                    lineHeight: 1.4,
                  },
                }}
                inputProps={{
                  "aria-label": `blank ${segment.blankId}`,
                  size: Math.max(
                    4,
                    (filledBlanks[segment.blankId] ?? "").length + 1,
                  ),
                }}
              />
            );
          })}
        </Box>
      ))}
    </Box>
  );
};

export default CodeEditorFillInBlankWithoutOptions;
