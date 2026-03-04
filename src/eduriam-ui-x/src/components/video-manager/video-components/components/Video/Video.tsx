import React from "react";

import Box from "@mui/material/Box";

import type { ComponentSize } from "../../../types/shared";
import { resolveSize } from "../../../utils/resolveSize";
import type { BaseVideoComponent } from "../../VideoComponent";

export interface IVideo extends BaseVideoComponent {
  type: "VIDEO";
  url: string;
  size?: ComponentSize;
}

export interface IVideoProps {
  comp: IVideo;
}

export const Video: React.FC<IVideoProps> = ({ comp }) => {
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
        component="video"
        src={comp.url}
        sx={{ width, height: "auto", borderRadius: 2 }}
        autoPlay
        loop
        muted
      />
    </Box>
  );
};

export default Video;
