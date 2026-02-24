import React from "react";

import Box from "@mui/material/Box";

import { CODE_FONT_FAMILY, CODE_LINE_HEIGHT } from "../../constants";
import { getLineTokens, getTokenColor } from "../../util/syntax";

export interface HighlightedSnippetProps {
  code: string;
  language: string;
  tokenColors: Record<string, string>;
  fallbackColor: string;
  fontSize: number;
}

export const HighlightedSnippet: React.FC<HighlightedSnippetProps> = ({
  code,
  language,
  tokenColors,
  fallbackColor,
  fontSize,
}) => {
  const lines = code.replace(/\r\n/g, "\n").split("\n");

  return (
    <Box
      component="div"
      sx={{
        whiteSpace: "pre-wrap",
        overflowWrap: "anywhere",
        wordBreak: "break-word",
        fontFamily: CODE_FONT_FAMILY,
        fontSize,
        lineHeight: CODE_LINE_HEIGHT,
      }}
    >
      {lines.map((line, lineIndex) => (
        <Box key={`${lineIndex}-${line}`} component="div">
          {getLineTokens(line, language).map(({ type, content }, tokenIndex) => (
            <Box
              key={`${lineIndex}-${tokenIndex}`}
              component="span"
              sx={{
                color: getTokenColor(type, tokenColors, fallbackColor),
                overflowWrap: "anywhere",
                wordBreak: "break-word",
              }}
            >
              {content}
            </Box>
          ))}
          {line.length === 0 ? "\u00A0" : null}
        </Box>
      ))}
    </Box>
  );
};

export default HighlightedSnippet;

