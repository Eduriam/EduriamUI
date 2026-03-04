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
import { getTerminalTokenColor } from "../../util/tokenLayout";

export interface TerminalStepLayerProps {
  step: TerminalExplainerStep;
  colorMode: TerminalExplainerColorMode;
  fontSize: number;
  wrap: boolean;
  scrollOffsetPx: number;
}

export const TerminalStepLayer: React.FC<TerminalStepLayerProps> = ({
  step,
  colorMode,
  fontSize,
  wrap,
  scrollOffsetPx,
}) => {
  const theme = TERMINAL_THEME[colorMode];
  const bottomSafetyPx = getTerminalBottomSafetyPx(fontSize);
  const lines = useMemo(
    () => step.output.replace(/\r\n/g, "\n").split("\n"),
    [step],
  );

  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <Box
        component="div"
        sx={{
          m: 0,
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
          const matches = line.matchAll(/(\s+|[^\s]+)/g);
          const tokens = [...matches].map((match) => match[0] ?? "").filter(Boolean);

          return (
            <Box
              key={`${lineIndex}-${line}`}
              component="div"
              sx={{ minHeight: `${TERMINAL_LINE_HEIGHT}em` }}
            >
              {tokens.length > 0
                ? tokens.map((token, tokenIndex) => (
                    <Box
                      key={`${lineIndex}-${tokenIndex}`}
                      component="span"
                      sx={{
                        color: getTerminalTokenColor({
                          token,
                          line,
                          tokenIndex,
                          theme,
                        }),
                      }}
                    >
                      {token}
                    </Box>
                  ))
                : "\u00A0"}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TerminalStepLayer;
