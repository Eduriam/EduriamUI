import React, { useMemo } from "react";

import Box from "@mui/material/Box";

import {
  CODE_FONT_FAMILY,
  CODE_FONT_SIZE,
  CODE_THEME,
  LINE_NUMBER_GUTTER_CH,
} from "../../constants";
import type { CodeExplainerColorMode, CodeExplainerStep } from "../../types";
import { buildLineAnnotations } from "../../util/annotations";
import { getLineTokens, getTokenColor, getTokenColors } from "../../util/syntax";
import { AnnotationBubble } from "../AnnotationBubble/AnnotationBubble";

export interface CodeStepLayerProps {
  step: CodeExplainerStep;
  colorMode: CodeExplainerColorMode;
  showLineNumbers: boolean;
  opacity: number;
  translateY: number;
  annotationOpacity: number;
}

export const CodeStepLayer: React.FC<CodeStepLayerProps> = ({
  step,
  colorMode,
  showLineNumbers,
  opacity,
  translateY,
  annotationOpacity,
}) => {
  const theme = CODE_THEME[colorMode];
  const tokenColors = useMemo(() => getTokenColors(colorMode), [colorMode]);

  const annotationsByLine = useMemo(() => buildLineAnnotations(step), [step]);
  const lines = useMemo(() => step.code.replace(/\r\n/g, "\n").split("\n"), [step]);
  const showAnnotations = annotationOpacity > 0.01;

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <Box
        component="div"
        sx={{
          m: 0,
          fontFamily: CODE_FONT_FAMILY,
          fontSize: CODE_FONT_SIZE,
          lineHeight: 1.5,
          color: theme.foreground,
          whiteSpace: "pre",
        }}
      >
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const annotations = annotationsByLine.get(lineNumber);
          const hasError = Boolean(annotations?.errors.length);
          const hasCallout = !hasError && Boolean(annotations?.callouts.length);

          const tokens = getLineTokens(line, step.language);
          const errorRanges = (annotations?.errors ?? [])
            .map((error) => {
              if (!error.column) return null;
              const start = Math.max(0, error.column - 1);
              const length = Math.max(1, error.length ?? 1);
              return {
                start,
                end: start + length,
              };
            })
            .filter((value): value is { start: number; end: number } =>
              Boolean(value),
            );

          return (
            <React.Fragment key={`${lineNumber}-${line}`}>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  borderRadius: 1,
                  backgroundColor: hasError
                    ? theme.errorLineBg
                    : hasCallout
                      ? theme.calloutLineBg
                      : "transparent",
                }}
              >
                {showLineNumbers ? (
                  <Box
                    component="span"
                    sx={{
                      minWidth: `${LINE_NUMBER_GUTTER_CH}ch`,
                      color: theme.lineNumber,
                      userSelect: "none",
                    }}
                  >
                    {String(lineNumber).padStart(2, "0")}
                  </Box>
                ) : null}

                <Box component="span" sx={{ flex: 1 }}>
                  {tokens.length > 0 ? (
                    tokens.map(({ type, content, start, end }, tokenIndex) => {
                      const hasErrorUnderline = errorRanges.some(
                        (range) => start < range.end && end > range.start,
                      );

                      return (
                        <Box
                          key={`${lineNumber}-${tokenIndex}`}
                          component="span"
                          sx={{
                            color: getTokenColor(type, tokenColors, theme.foreground),
                            ...(hasErrorUnderline && {
                              textDecorationLine: "underline",
                              textDecorationStyle: "wavy",
                              textDecorationColor: "#ef4444",
                            }),
                          }}
                        >
                          {content}
                        </Box>
                      );
                    })
                  ) : (
                    "\u00A0"
                  )}
                </Box>
              </Box>

              {showAnnotations
                ? annotations?.callouts.map((callout, calloutIndex) => (
                    <AnnotationBubble
                      key={`callout-${lineNumber}-${calloutIndex}`}
                      annotation={callout}
                      stepLanguage={step.language}
                      colorMode={colorMode}
                      tokenColors={tokenColors}
                      showLineNumbers={showLineNumbers}
                      annotationOpacity={annotationOpacity}
                      variant="callout"
                    />
                  ))
                : null}

              {showAnnotations
                ? annotations?.errors.map((error, errorIndex) => (
                    <AnnotationBubble
                      key={`error-${lineNumber}-${errorIndex}`}
                      annotation={error}
                      stepLanguage={step.language}
                      colorMode={colorMode}
                      tokenColors={tokenColors}
                      showLineNumbers={showLineNumbers}
                      annotationOpacity={annotationOpacity}
                      variant="error"
                    />
                  ))
                : null}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
};

export default CodeStepLayer;

