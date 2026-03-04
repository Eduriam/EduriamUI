import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { BaseVideoComponent } from "../../VideoComponent";

export type Alignment = "LEFT" | "CENTER" | "RIGHT" | "JUSTIFY";

export interface IParagraph extends BaseVideoComponent {
  type: "PARAGRAPH";
  text: string;
  alignment: Alignment;
  color?: string;
}

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
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
