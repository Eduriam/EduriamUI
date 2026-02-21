import React from "react";

import Box from "@mui/material/Box";

import {
  ANNOTATION_ARROW_OFFSET_CH,
  CODE_FONT_FAMILY,
  CODE_FONT_SIZE,
  CODE_THEME,
  LINE_NUMBER_GUTTER_CH,
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
  showLineNumbers: boolean;
  annotationOpacity: number;
  variant: AnnotationVariant;
}

export const AnnotationBubble: React.FC<AnnotationBubbleProps> = ({
  annotation,
  stepLanguage,
  colorMode,
  tokenColors,
  showLineNumbers,
  annotationOpacity,
  variant,
}) => {
  const theme = CODE_THEME[colorMode];
  const column = Math.max(1, annotation.column ?? 1);
  const bubbleBackground =
    variant === "error" ? theme.errorBg : theme.calloutBg;

  return (
    <Box
      component="div"
      sx={{
        opacity: annotationOpacity,
        display: "flex",
        mt: 0.5,
      }}
    >
      {showLineNumbers ? (
        <Box component="span" sx={{ width: `${LINE_NUMBER_GUTTER_CH}ch` }} />
      ) : null}

      <Box
        component="div"
        sx={{
          position: "relative",
          width: "fit-content",
          maxWidth: "100%",
          minWidth: `${Math.max(column + 4, 18)}ch`,
          backgroundColor: bubbleBackground,
          color: theme.foreground,
          borderRadius: 1,
          px: 2,
          py: 1,
          whiteSpace: "pre-wrap",
          ...(variant === "error" && { borderLeft: "4px solid #ef4444" }),
        }}
      >
        {variant === "callout" ? (
          <Box
            component="span"
            sx={{
              position: "absolute",
              left: `calc(${Math.max(0, column - 1)}ch + ${ANNOTATION_ARROW_OFFSET_CH}ch)`,
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
          />
        ) : (
          <Box
            component="div"
            sx={{
              fontFamily: CODE_FONT_FAMILY,
              fontSize: CODE_FONT_SIZE,
              lineHeight: 1.5,
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

