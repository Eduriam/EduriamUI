import { IconButton } from "@eduriam/ui-core";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";

import { SyntaxHighlightedCode } from "./SyntaxHighlightedCode";

const FONT_SIZE = 16;
const LINE_HEIGHT = "21.1px";

export interface CodeEditorFillInCodeProps {
  /** Current code value. */
  value: string;

  /** Called when the user edits the code. */
  onChange: (value: string) => void;

  /** Default code value used when the reset button is clicked. */
  defaultValue?: string;

  /** Optional Prism language for syntax highlighting (e.g. "javascript", "python"). */
  language?: string;
}

/**
 * Editable code textarea with optional default value and a reset button.
 *
 * Uses monospace (JetBrains Mono) font. When language is set, syntax
 * highlighting is shown behind the textarea (overlay approach).
 */
export const CodeEditorFillInCode: React.FC<CodeEditorFillInCodeProps> = ({
  value,
  onChange,
  defaultValue = "",
  language,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const handleReset = useCallback(() => {
    onChange(defaultValue);
  }, [onChange, defaultValue]);

  // Keep content height in sync with textarea scrollHeight for overlay
  useEffect(() => {
    const el = textareaRef.current;
    if (!el || !language) return;
    const ro = new ResizeObserver(() => {
      setContentHeight(el.scrollHeight);
    });
    ro.observe(el);
    setContentHeight(el.scrollHeight);
    return () => ro.disconnect();
  }, [value, language]);

  const textareaSx = {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: FONT_SIZE,
    lineHeight: LINE_HEIGHT,
    p: 4,
  };

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
      {language ? (
        <>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              minHeight: contentHeight || "100%",
              transform: `translateY(-${scrollTop}px)`,
              pointerEvents: "none",
              ...textareaSx,
            }}
          >
            <SyntaxHighlightedCode
              code={value}
              language={language}
              sx={{
                whiteSpace: "pre",
                display: "block",
                fontSize: FONT_SIZE,
                lineHeight: LINE_HEIGHT,
              }}
            />
          </Box>
          <Box
            ref={textareaRef}
            component="textarea"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              onChange(e.target.value)
            }
            onScroll={(e: React.UIEvent<HTMLTextAreaElement>) =>
              setScrollTop((e.target as HTMLTextAreaElement).scrollTop)
            }
            spellCheck={false}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              resize: "none",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              color: "transparent",
              caretColor: "text.primary",
              overflow: "auto",
              "&::placeholder": {
                color: "text.secondary",
              },
              "&::selection": {
                backgroundColor: "action.selected",
              },
              ...textareaSx,
            }}
          />
        </>
      ) : (
        <Box
          ref={textareaRef}
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
            "&::placeholder": {
              color: "text.secondary",
            },
            ...textareaSx,
          }}
        />
      )}
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
