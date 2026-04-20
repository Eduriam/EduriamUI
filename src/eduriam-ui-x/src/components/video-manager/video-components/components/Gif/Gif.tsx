import React from "react";

import { Gif as RemotionGif } from "@remotion/gif";
import Box from "@mui/material/Box";

import type { ComponentSize } from "../../../types/shared";
import { resolveSize } from "../../../utils/resolveSize";
import type { BaseVideoComponent } from "../../VideoComponent";

export interface IGif extends BaseVideoComponent {
  type: "GIF";
  url: string;
  size: ComponentSize;
}

export interface IGifProps {
  comp: IGif;
}

export const Gif: React.FC<IGifProps> = ({ comp }) => {
  const responsiveWidth = resolveSize(comp.size);

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
      <RemotionGif
        src={comp.url}
        fit="contain"
        style={{ width: responsiveWidth, height: "auto", borderRadius: 8 }}
      />
    </Box>
  );
};

export default Gif;
