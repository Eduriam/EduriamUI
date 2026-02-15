import { IconButton } from "@eduriam/ui-core";

import React from "react";

import Box from "@mui/material/Box";

export interface CodeEditorFillInCodeProps {
  /** Current code value. */
  value: string;

  /** Called when the user edits the code. */
  onChange: (value: string) => void;

  /** Default code value used when the reset button is clicked. */
  defaultValue?: string;
}

/**
 * Editable code textarea with optional default value and a reset button.
 *
 * Uses monospace (JetBrains Mono) font via the theme `code` variant styling.
 * The reset button appears at the bottom-right corner.
 */
export const CodeEditorFillInCode: React.FC<CodeEditorFillInCodeProps> = ({
  value,
  onChange,
  defaultValue = "",
}) => {
  function handleReset() {
    onChange(defaultValue);
  }

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflow: "hidden",
      }}
    >
      <Box
        component="textarea"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        spellCheck={false}
        sx={{
          flexGrow: 1,
          resize: "none",
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          color: "text.primary",
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 16,
          lineHeight: "21.1px",
          p: 4,
          "&::placeholder": {
            color: "text.secondary",
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
        }}
      >
        <IconButton
          icon="restore"
          variant="text"
          size="small"
          color="textPrimary"
          onClick={handleReset}
        />
      </Box>
    </Box>
  );
};

export default CodeEditorFillInCode;
