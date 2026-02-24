import React, { useMemo } from "react";

import Box from "@mui/material/Box";

import {
  CODE_FONT_FAMILY,
  CODE_LINE_HEIGHT,
  CODE_THEME,
  LINE_NUMBER_GUTTER_CH,
} from "../../constants";
import type {
  CodeExplainerAnnotation,
  CodeExplainerColorMode,
  CodeExplainerStep,
} from "../../types";
import { buildLineAnnotations } from "../../util/annotations";
import { getLineTokens, getTokenColor, getTokenColors } from "../../util/syntax";
import { AnnotationBubble } from "../AnnotationBubble/AnnotationBubble";

export interface CodeStepLayerProps {
  step: CodeExplainerStep;
  colorMode: CodeExplainerColorMode;
  showLineNumbers: boolean;
  annotationOpacity: number;
  fontSize: number;
  wrap: boolean;
}

export const CodeStepLayer: React.FC<CodeStepLayerProps> = ({
  step,
  colorMode,
  showLineNumbers,
  annotationOpacity,
  fontSize,
  wrap,
}) => {
  const theme = CODE_THEME[colorMode];
  const tokenColors = useMemo(() => getTokenColors(colorMode), [colorMode]);

  const annotationsByLine = useMemo(() => buildLineAnnotations(step), [step]);
  const lines = useMemo(() => step.code.replace(/\r\n/g, "\n").split("\n"), [step]);
  const showAnnotations = annotationOpacity > 0.01;
  const codeStartOffsetCh = showLineNumbers ? LINE_NUMBER_GUTTER_CH : 0;
  const annotationOverlays = useMemo(() => {
    const overlays: Array<{
      key: string;
      topEm: number;
      annotation: CodeExplainerAnnotation;
      variant: "callout" | "error";
    }> = [];

    for (let index = 0; index < lines.length; index += 1) {
      const lineNumber = index + 1;
      const annotations = annotationsByLine.get(lineNumber);
      if (!annotations) continue;

      let stackOrder = 0;
      for (let calloutIndex = 0; calloutIndex < annotations.callouts.length; calloutIndex += 1) {
        overlays.push({
          key: `callout-${lineNumber}-${calloutIndex}`,
          topEm: (index + 1) * CODE_LINE_HEIGHT + stackOrder * 1.1,
          annotation: annotations.callouts[calloutIndex],
          variant: "callout",
        });
        stackOrder += 1;
      }

      for (let errorIndex = 0; errorIndex < annotations.errors.length; errorIndex += 1) {
        overlays.push({
          key: `error-${lineNumber}-${errorIndex}`,
          topEm: (index + 1) * CODE_LINE_HEIGHT + stackOrder * 1.1,
          annotation: annotations.errors[errorIndex],
          variant: "error",
        });
        stackOrder += 1;
      }
    }

    return overlays;
  }, [annotationsByLine, lines.length]);

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
      }}
    >
      <Box
        component="div"
        sx={{
          m: 0,
          fontFamily: CODE_FONT_FAMILY,
          fontSize,
          lineHeight: CODE_LINE_HEIGHT,
          color: theme.foreground,
          whiteSpace: wrap ? "pre-wrap" : "pre",
          overflowWrap: wrap ? "anywhere" : "normal",
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
                  minWidth: 0,
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

                <Box component="span" sx={{ flex: 1, minWidth: 0 }}>
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
                            overflowWrap: wrap ? "anywhere" : "normal",
                            wordBreak: wrap ? "break-word" : "normal",
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

            </React.Fragment>
          );
        })}

        {showAnnotations ? (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              overflow: "visible",
              zIndex: 6,
              pointerEvents: "none",
              opacity: annotationOpacity,
            }}
          >
            {annotationOverlays.map((overlay) => (
              <Box
                key={overlay.key}
                sx={{
                  position: "absolute",
                  left: `${codeStartOffsetCh}ch`,
                  right: 0,
                  top: `${overlay.topEm}em`,
                }}
              >
                <AnnotationBubble
                  annotation={overlay.annotation}
                  stepLanguage={step.language}
                  colorMode={colorMode}
                  tokenColors={tokenColors}
                  variant={overlay.variant}
                  fontSize={fontSize}
                />
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default CodeStepLayer;

