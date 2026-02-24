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
import {
  createCodeTextMeasurer,
  getCodeInnerWidthPx,
  getStepVisualLineStartOffsetsPx,
  getWrappedVisualLinesForText,
} from "../../util/scroll";
import {
  getLineTokens,
  getTokenColor,
  getTokenColors,
} from "../../util/syntax";
import { AnnotationBubble } from "../AnnotationBubble/AnnotationBubble";

export interface CodeStepLayerProps {
  step: CodeExplainerStep;
  colorMode: CodeExplainerColorMode;
  showLineNumbers: boolean;
  annotationOpacity: number;
  fontSize: number;
  wrap: boolean;
  scrollOffsetPx: number;
  panelWidth: number;
  viewportHeightPx: number;
}

export const CodeStepLayer: React.FC<CodeStepLayerProps> = ({
  step,
  colorMode,
  showLineNumbers,
  annotationOpacity,
  fontSize,
  wrap,
  scrollOffsetPx,
  panelWidth,
  viewportHeightPx,
}) => {
  const theme = CODE_THEME[colorMode];
  const tokenColors = useMemo(() => getTokenColors(colorMode), [colorMode]);

  const annotationsByLine = useMemo(() => buildLineAnnotations(step), [step]);
  const lines = useMemo(
    () => step.code.replace(/\r\n/g, "\n").split("\n"),
    [step],
  );
  const lineStartOffsetsPx = useMemo(
    () =>
      getStepVisualLineStartOffsetsPx({
        step,
        fontSize,
        panelWidth,
        showLineNumbers,
        wrap,
      }),
    [step, fontSize, panelWidth, showLineNumbers, wrap],
  );
  const showAnnotations = annotationOpacity > 0.01;
  const codeStartOffsetCh = showLineNumbers ? LINE_NUMBER_GUTTER_CH : 0;
  const lineHeightPx = fontSize * CODE_LINE_HEIGHT;
  const measureText = useMemo(
    () => createCodeTextMeasurer(fontSize),
    [fontSize],
  );
  const innerWidthPx = useMemo(
    () =>
      getCodeInnerWidthPx({
        fontSize,
        panelWidth,
        showLineNumbers,
        measureText,
      }),
    [fontSize, panelWidth, showLineNumbers, measureText],
  );
  const bubbleInnerWidthPx = Math.max(1, innerWidthPx - 32);
  const annotationOverlays = useMemo(() => {
    const overlays: Array<{
      key: string;
      topPx: number;
      annotation: CodeExplainerAnnotation;
      variant: "callout" | "error";
    }> = [];

    for (let index = 0; index < lines.length; index += 1) {
      const lineNumber = index + 1;
      const annotations = annotationsByLine.get(lineNumber);
      if (!annotations) continue;

      const lineTopPx = lineStartOffsetsPx[index] ?? index * lineHeightPx;
      const lineBasePx = lineTopPx + lineHeightPx;
      const annotationsForLine: Array<{
        key: string;
        annotation: CodeExplainerAnnotation;
        variant: "callout" | "error";
      }> = [
        ...annotations.callouts.map((annotation, calloutIndex) => ({
          key: `callout-${lineNumber}-${calloutIndex}`,
          annotation,
          variant: "callout" as const,
        })),
        ...annotations.errors.map((annotation, errorIndex) => ({
          key: `error-${lineNumber}-${errorIndex}`,
          annotation,
          variant: "error" as const,
        })),
      ];

      let belowStackOrder = 0;
      let aboveStackOrder = 0;
      for (const item of annotationsForLine) {
        const source = item.annotation.code ?? item.annotation.message;
        const wrappedLines = getWrappedVisualLinesForText({
          text: source,
          innerWidthPx: bubbleInnerWidthPx,
          measureText,
        });
        const bubbleHeightPx = (wrappedLines + 1.2) * lineHeightPx;
        const belowTopPx = lineBasePx + belowStackOrder * 1.1 * lineHeightPx;
        const aboveTopPx =
          lineTopPx - bubbleHeightPx - aboveStackOrder * 1.1 * lineHeightPx;
        const visibleBottomPx = scrollOffsetPx + viewportHeightPx;
        const spaceBelowPx = visibleBottomPx - belowTopPx;
        const spaceAbovePx = lineTopPx - scrollOffsetPx;
        const shouldPlaceAbove =
          spaceBelowPx < bubbleHeightPx && spaceAbovePx > spaceBelowPx;
        const topPx = shouldPlaceAbove ? Math.max(0, aboveTopPx) : belowTopPx;

        overlays.push({
          key: item.key,
          topPx,
          annotation: item.annotation,
          variant: item.variant,
        });

        if (shouldPlaceAbove) {
          aboveStackOrder += 1;
        } else {
          belowStackOrder += 1;
        }
      }
    }

    return overlays;
  }, [
    annotationsByLine,
    bubbleInnerWidthPx,
    lineHeightPx,
    lineStartOffsetsPx,
    lines.length,
    measureText,
    scrollOffsetPx,
    viewportHeightPx,
  ]);

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
          transform: `translateY(${-scrollOffsetPx}px)`,
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
                  {tokens.length > 0
                    ? tokens.map(
                        ({ type, content, start, end }, tokenIndex) => {
                          const hasErrorUnderline = errorRanges.some(
                            (range) => start < range.end && end > range.start,
                          );

                          return (
                            <Box
                              key={`${lineNumber}-${tokenIndex}`}
                              component="span"
                              sx={{
                                color: getTokenColor(
                                  type,
                                  tokenColors,
                                  theme.foreground,
                                ),
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
                        },
                      )
                    : "\u00A0"}
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
                  top: `${overlay.topPx}px`,
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
