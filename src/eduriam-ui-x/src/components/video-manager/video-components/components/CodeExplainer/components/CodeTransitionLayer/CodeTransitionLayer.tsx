import React, { useMemo } from "react";

import Box from "@mui/material/Box";
import { interpolateColors } from "remotion";

import {
  CODE_FONT_FAMILY,
  CODE_FONT_SIZE,
  CODE_THEME,
  LINE_NUMBER_GUTTER_CH,
} from "../../constants";
import type { CodeExplainerColorMode, CodeExplainerStep } from "../../types";
import { buildLineAnnotations } from "../../util/annotations";
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
}

export const CodeTransitionLayer: React.FC<CodeTransitionLayerProps> = ({
  oldStep,
  newStep,
  colorMode,
  showLineNumbers,
  transitionProgress,
  annotationOpacity,
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
                    tokens.map((token, tokenIndex) => {
                      const oldToken = transitions.oldByNewGlobalIndex.get(
                        token.globalIndex,
                      );
                      const hasErrorUnderline = errorRanges.some(
                        (range) => token.start < range.end && token.end > range.start,
                      );

                      const newColor = getTokenColor(
                        token.type,
                        tokenColors,
                        theme.foreground,
                      );
                      const oldColor = oldToken
                        ? getTokenColor(oldToken.type, tokenColors, theme.foreground)
                        : newColor;

                      const translateXCh = oldToken
                        ? (oldToken.start - token.start) * inverseProgress
                        : 0;
                      const translateYEm = oldToken
                        ? (oldToken.lineIndex - token.lineIndex) * 1.5 * inverseProgress
                        : 0.25 * inverseProgress;

                      return (
                        <Box
                          key={`${lineNumber}-${tokenIndex}`}
                          component="span"
                          sx={{
                            display: "inline-block",
                            color: interpolateColors(
                              transitionProgress,
                              [0, 1],
                              [oldColor, newColor],
                            ),
                            opacity: oldToken ? 1 : transitionProgress,
                            transform: `translate(${translateXCh}ch, ${translateYEm}em)`,
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
                      stepLanguage={newStep.language}
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
                      stepLanguage={newStep.language}
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

        {transitions.removedOldTokens.map((oldToken) => (
          <Box
            key={`removed-${oldToken.globalIndex}`}
            component="span"
            sx={{
              position: "absolute",
              left: `${codeStartOffsetCh + oldToken.start}ch`,
              top: `${oldToken.lineIndex * 1.5}em`,
              color: getTokenColor(oldToken.type, tokenColors, theme.foreground),
              opacity: inverseProgress,
              transform: `translateY(${-0.2 * inverseProgress}em)`,
              pointerEvents: "none",
            }}
          >
            {oldToken.content}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CodeTransitionLayer;

