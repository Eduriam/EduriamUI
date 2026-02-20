import React from "react";

import Box from "@mui/material/Box";

import type { ComponentPosition, ComponentSize } from "../../../types/shared";
import { positionToStyle } from "../../../utils/positionToStyle";
import { resolveSize } from "../../../utils/resolveSize";
import type { BaseVideoComponent } from "../../VideoComponent";

export interface IImage extends BaseVideoComponent {
  type: "IMAGE";
  url: string;
  size: ComponentSize;
  position: ComponentPosition;
}

export interface IImageProps {
  comp: IImage;
}

export const Image: React.FC<IImageProps> = ({ comp }) => {
  const width = resolveSize(comp.size);
  return (
    <Box style={positionToStyle(comp.position)}>
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
