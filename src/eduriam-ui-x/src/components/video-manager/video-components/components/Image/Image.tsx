import React from "react";

import Box from "@mui/material/Box";

import type { ComponentSize } from "../../../types/shared";
import { resolveSize } from "../../../utils/resolveSize";
import type { BaseVideoComponent } from "../../VideoComponent";

export interface IImage extends BaseVideoComponent {
  type: "IMAGE";
  url: string;
  size: ComponentSize;
}

export interface IImageProps {
  comp: IImage;
}

export const Image: React.FC<IImageProps> = ({ comp }) => {
  const width = resolveSize(comp.size);
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
      <Box
        component="img"
        src={comp.url}
        sx={{
          width,
          height: "auto",
          borderRadius: 2,
        }}
      />
    </Box>
  );
};

export default Image;
