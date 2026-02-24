import React from "react";

import Box from "@mui/material/Box";

import {
  ANNOTATION_ARROW_OFFSET_CH,
  CODE_FONT_FAMILY,
  CODE_LINE_HEIGHT,
  CODE_THEME,
} from "../../constants";
import type {
  AnnotationVariant,
  CodeExplainerAnnotation,
  CodeExplainerColorMode,
} from "../../types";
import { HighlightedSnippet } from "../HighlightedSnippet/HighlightedSnippet";

export interface AnnotationBubbleProps {
  annotation: CodeExplainerAnnotation;
  stepLanguage: string;
  colorMode: CodeExplainerColorMode;
  tokenColors: Record<string, string>;
  variant: AnnotationVariant;
  fontSize: number;
}

export const AnnotationBubble: React.FC<AnnotationBubbleProps> = ({
  annotation,
  stepLanguage,
  colorMode,
  tokenColors,
  variant,
  fontSize,
}) => {
  const theme = CODE_THEME[colorMode];
  const column = Math.max(1, annotation.column ?? 1);
  const bubbleBackground =
    variant === "error" ? theme.errorBg : theme.calloutBg;

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        position: "relative",
        zIndex: 4,
        mt: 0.5,
        width: "100%",
        minWidth: 0,
      }}
    >
      <Box
        component="div"
        sx={{
          position: "relative",
          flex: 1,
          width: "auto",
          maxWidth: "100%",
          minWidth: 0,
          backgroundColor: bubbleBackground,
          color: theme.foreground,
          borderRadius: 1,
          px: 2,
          py: 1,
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
          wordBreak: "break-word",
          ...(variant === "error" && { borderLeft: "4px solid #ef4444" }),
        }}
      >
        {variant === "callout" ? (
          <Box
            component="span"
            sx={{
              position: "absolute",
              left: `min(calc(${Math.max(0, column - 1)}ch + ${ANNOTATION_ARROW_OFFSET_CH}ch), calc(100% - 1rem))`,
              top: "-2px",
              width: "1rem",
              height: "1rem",
              transform: "rotate(45deg) translateY(-50%)",
              backgroundColor: bubbleBackground,
            }}
          />
        ) : null}

        {annotation.code ? (
          <HighlightedSnippet
            code={annotation.code}
            language={annotation.language ?? stepLanguage}
            tokenColors={tokenColors}
            fallbackColor={theme.foreground}
            fontSize={fontSize}
          />
        ) : (
          <Box
            component="div"
            sx={{
              fontFamily: CODE_FONT_FAMILY,
              fontSize,
              lineHeight: CODE_LINE_HEIGHT,
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
            }}
          >
            {annotation.message}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AnnotationBubble;

