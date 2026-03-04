import { interpolateColors } from "remotion";

import React, { useMemo } from "react";

import Box from "@mui/material/Box";

import {
  getTerminalBottomSafetyPx,
  TERMINAL_FONT_FAMILY,
  TERMINAL_LINE_HEIGHT,
  TERMINAL_THEME,
} from "../../constants";
import type {
  TerminalExplainerColorMode,
  TerminalExplainerStep,
} from "../../types";
import {
  buildTerminalStepTokenLayout,
  buildTerminalTokenTransitionLayout,
  getTerminalTokenColor,
} from "../../util/tokenLayout";

export interface TerminalTransitionLayerProps {
  oldStep: TerminalExplainerStep;
  newStep: TerminalExplainerStep;
  colorMode: TerminalExplainerColorMode;
  transitionProgress: number;
  fontSize: number;
  wrap: boolean;
  scrollOffsetPx: number;
}

export const TerminalTransitionLayer: React.FC<TerminalTransitionLayerProps> = ({
  oldStep,
  newStep,
  colorMode,
  transitionProgress,
  fontSize,
  wrap,
  scrollOffsetPx,
}) => {
  const theme = TERMINAL_THEME[colorMode];
  const bottomSafetyPx = getTerminalBottomSafetyPx(fontSize);

  const lines = useMemo(
    () => newStep.output.replace(/\r\n/g, "\n").split("\n"),
    [newStep],
  );
  const oldLines = useMemo(
    () => oldStep.output.replace(/\r\n/g, "\n").split("\n"),
    [oldStep],
  );

  const newLayout = useMemo(() => buildTerminalStepTokenLayout(lines), [lines]);
  const oldLayout = useMemo(() => buildTerminalStepTokenLayout(oldLines), [oldLines]);

  const transitions = useMemo(
    () => buildTerminalTokenTransitionLayout(oldLayout.flat, newLayout.flat),
    [oldLayout.flat, newLayout.flat],
  );

  const inverseProgress = 1 - transitionProgress;

  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <Box
        component="div"
        sx={{
          m: 0,
          position: "relative",
          transform: `translateY(${-scrollOffsetPx}px)`,
          pb: `${bottomSafetyPx}px`,
          fontFamily: TERMINAL_FONT_FAMILY,
          fontSize,
          lineHeight: TERMINAL_LINE_HEIGHT,
          color: theme.foreground,
          whiteSpace: wrap ? "pre-wrap" : "pre",
          overflowWrap: wrap ? "anywhere" : "normal",
          wordBreak: wrap ? "break-word" : "normal",
        }}
      >
        {lines.map((line, lineIndex) => {
          const tokens = newLayout.byLine[lineIndex] ?? [];

          return (
            <Box
              key={`${lineIndex}-${line}`}
              component="div"
              sx={{ minHeight: `${TERMINAL_LINE_HEIGHT}em` }}
            >
              {tokens.length > 0
                ? tokens.map((token) => {
                    const oldToken = transitions.oldByNewGlobalIndex.get(token.globalIndex);
                    const oldLine = oldToken ? (oldLines[oldToken.lineIndex] ?? "") : "";

                    const newColor = getTerminalTokenColor({
                      token: token.content,
                      line,
                      tokenIndex: token.lineTokenIndex,
                      theme,
                    });
                    const oldColor = oldToken
                      ? getTerminalTokenColor({
                          token: oldToken.content,
                          line: oldLine,
                          tokenIndex: oldToken.lineTokenIndex,
                          theme,
                        })
                      : newColor;

                    const translateXCh = oldToken
                      ? (oldToken.start - token.start) * inverseProgress
                      : 0;
                    const translateYEm = oldToken
                      ? (oldToken.lineIndex - token.lineIndex) *
                        TERMINAL_LINE_HEIGHT *
                        inverseProgress
                      : 0.25 * inverseProgress;

                    return (
                      <Box
                        key={`${token.lineIndex}-${token.globalIndex}`}
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
                        }}
                      >
                        {token.content}
                      </Box>
                    );
                  })
                : "\u00A0"}
            </Box>
          );
        })}

        {!wrap
          ? transitions.removedOldTokens.map((oldToken) => {
              const oldLine = oldLines[oldToken.lineIndex] ?? "";

              return (
                <Box
                  key={`removed-${oldToken.globalIndex}`}
                  component="span"
                  sx={{
                    position: "absolute",
                    left: `${oldToken.start}ch`,
                    top: `${oldToken.lineIndex * TERMINAL_LINE_HEIGHT}em`,
                    color: getTerminalTokenColor({
                      token: oldToken.content,
                      line: oldLine,
                      tokenIndex: oldToken.lineTokenIndex,
                      theme,
                    }),
                    opacity: inverseProgress,
                    transform: `translateY(${-0.2 * inverseProgress}em)`,
                    pointerEvents: "none",
                  }}
                >
                  {oldToken.content}
                </Box>
              );
            })
          : null}
      </Box>
    </Box>
  );
};

export default TerminalTransitionLayer;
