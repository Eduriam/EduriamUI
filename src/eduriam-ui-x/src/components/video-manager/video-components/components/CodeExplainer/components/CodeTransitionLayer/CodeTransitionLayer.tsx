import { interpolateColors } from "remotion";

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
import { getTokenColor, getTokenColors } from "../../util/syntax";
import {
  buildStepTokenLayout,
  buildTokenTransitionLayout,
} from "../../util/tokenLayout";
import { AnnotationBubble } from "../AnnotationBubble/AnnotationBubble";

export interface CodeTransitionLayerProps {
  oldStep: CodeExplainerStep;
  newStep: CodeExplainerStep;
  colorMode: CodeExplainerColorMode;
  showLineNumbers: boolean;
  transitionProgress: number;
  annotationOpacity: number;
  fontSize: number;
  wrap: boolean;
  scrollOffsetPx: number;
  panelWidth: number;
  viewportHeightPx: number;
}

export const CodeTransitionLayer: React.FC<CodeTransitionLayerProps> = ({
  oldStep,
  newStep,
  colorMode,
  showLineNumbers,
  transitionProgress,
  annotationOpacity,
  fontSize,
  wrap,
  scrollOffsetPx,
  panelWidth,
  viewportHeightPx,
}) => {
  const theme = CODE_THEME[colorMode];
  const tokenColors = useMemo(() => getTokenColors(colorMode), [colorMode]);
  const lines = useMemo(
    () => newStep.code.replace(/\r\n/g, "\n").split("\n"),
    [newStep],
  );
  const newLayout = useMemo(
    () => buildStepTokenLayout(lines, newStep.language),
    [lines, newStep.language],
  );
  const oldLines = useMemo(
    () => oldStep.code.replace(/\r\n/g, "\n").split("\n"),
    [oldStep],
  );
  const oldLayout = useMemo(
    () => buildStepTokenLayout(oldLines, oldStep.language),
    [oldLines, oldStep.language],
  );
  const transitions = useMemo(
    () => buildTokenTransitionLayout(oldLayout.flat, newLayout.flat),
    [oldLayout.flat, newLayout.flat],
  );
  const annotationsByLine = useMemo(
    () => buildLineAnnotations(newStep),
    [newStep],
  );
  const lineStartOffsetsPx = useMemo(
    () =>
      getStepVisualLineStartOffsetsPx({
        step: newStep,
        fontSize,
        panelWidth,
        showLineNumbers,
        wrap,
      }),
    [newStep, fontSize, panelWidth, showLineNumbers, wrap],
  );
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

  const inverseProgress = 1 - transitionProgress;
  const showAnnotations = annotationOpacity > 0.01;
  const codeStartOffsetCh = showLineNumbers ? LINE_NUMBER_GUTTER_CH : 0;

  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <Box
        component="div"
        sx={{
          m: 0,
          position: "relative",
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
          const tokens = newLayout.byLine[index] ?? [];
          const errorRanges = (annotations?.errors ?? [])
            .map((error) => {
              if (!error.column) return null;
              const start = Math.max(0, error.column - 1);
              const length = Math.max(1, error.length ?? 1);
              return { start, end: start + length };
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
                    ? tokens.map((token, tokenIndex) => {
                        const oldToken = transitions.oldByNewGlobalIndex.get(
                          token.globalIndex,
                        );
                        const hasErrorUnderline = errorRanges.some(
                          (range) =>
                            token.start < range.end && token.end > range.start,
                        );

                        const newColor = getTokenColor(
                          token.type,
                          tokenColors,
                          theme.foreground,
                        );
                        const oldColor = oldToken
                          ? getTokenColor(
                              oldToken.type,
                              tokenColors,
                              theme.foreground,
                            )
                          : newColor;

                        const translateXCh = oldToken
                          ? (oldToken.start - token.start) * inverseProgress
                          : 0;
                        const translateYEm = oldToken
                          ? (oldToken.lineIndex - token.lineIndex) *
                            CODE_LINE_HEIGHT *
                            inverseProgress
                          : 0.25 * inverseProgress;

                        return (
                          <Box
                            key={`${lineNumber}-${tokenIndex}`}
                            component="span"
                            sx={{
                              display: wrap ? "inline" : "inline-block",
                              color: interpolateColors(
                                transitionProgress,
                                [0, 1],
                                [oldColor, newColor],
                              ),
                              opacity: oldToken ? 1 : transitionProgress,
                              transform: wrap
                                ? "none"
                                : `translate(${translateXCh}ch, ${translateYEm}em)`,
                              overflowWrap: wrap ? "anywhere" : "normal",
                              wordBreak: wrap ? "break-word" : "normal",
                              ...(hasErrorUnderline && {
                                textDecorationLine: "underline",
                                textDecorationStyle: "wavy",
                                textDecorationColor: "#ef4444",
                              }),
                            }}
                          >
                            {token.content}
                          </Box>
                        );
                      })
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
                  stepLanguage={newStep.language}
                  colorMode={colorMode}
                  tokenColors={tokenColors}
                  variant={overlay.variant}
                  fontSize={fontSize}
                />
              </Box>
            ))}
          </Box>
        ) : null}

        {!wrap
          ? transitions.removedOldTokens.map((oldToken) => (
              <Box
                key={`removed-${oldToken.globalIndex}`}
                component="span"
                sx={{
                  position: "absolute",
                  left: `${codeStartOffsetCh + oldToken.start}ch`,
                  top: `${oldToken.lineIndex * CODE_LINE_HEIGHT}em`,
                  color: getTokenColor(
                    oldToken.type,
                    tokenColors,
                    theme.foreground,
                  ),
                  opacity: inverseProgress,
                  transform: `translateY(${-0.2 * inverseProgress}em)`,
                  pointerEvents: "none",
                }}
              >
                {oldToken.content}
              </Box>
            ))
          : null}
      </Box>
    </Box>
  );
};

export default CodeTransitionLayer;
