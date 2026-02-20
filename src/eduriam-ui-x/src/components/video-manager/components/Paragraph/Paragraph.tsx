import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { ComponentPosition } from "../../types/shared";
import { positionToStyle } from "../../utils/positionToStyle";

export type Alignment = "LEFT" | "CENTER" | "RIGHT" | "JUSTIFY";

export type IParagraph = {
  id: string;
  type: "PARAGRAPH";
  text: string;
  position: ComponentPosition;
  alignment: Alignment;
  color?: string;
};

export interface IParagraphProps {
  comp: IParagraph;
}

export const Paragraph: React.FC<IParagraphProps> = ({ comp }) => {
  const textAlign: "left" | "right" | "center" | "justify" =
    comp.alignment === "LEFT"
      ? "left"
      : comp.alignment === "RIGHT"
        ? "right"
        : comp.alignment === "JUSTIFY"
          ? "justify"
          : "center";
  return (
    <Box style={positionToStyle(comp.position)}>
      <Typography
        variant="h4"
        sx={{
          textAlign,
          ...(comp.color !== undefined && { color: comp.color }),
        }}
      >
        {comp.text}
      </Typography>
    </Box>
  );
};

export default Paragraph;
