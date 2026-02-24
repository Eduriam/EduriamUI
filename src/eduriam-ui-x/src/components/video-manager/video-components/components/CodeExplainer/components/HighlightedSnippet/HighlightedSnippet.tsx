import React from "react";

import Box from "@mui/material/Box";

import { CODE_FONT_FAMILY, CODE_FONT_SIZE } from "../../constants";
import { getLineTokens, getTokenColor } from "../../util/syntax";

export interface HighlightedSnippetProps {
  code: string;
  language: string;
  tokenColors: Record<string, string>;
  fallbackColor: string;
}

export const HighlightedSnippet: React.FC<HighlightedSnippetProps> = ({
  code,
  language,
  tokenColors,
  fallbackColor,
}) => {
  const lines = code.replace(/\r\n/g, "\n").split("\n");

  return (
    <Box
      component="div"
      sx={{
        whiteSpace: "pre",
        fontFamily: CODE_FONT_FAMILY,
        fontSize: CODE_FONT_SIZE,
        lineHeight: 1.5,
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

