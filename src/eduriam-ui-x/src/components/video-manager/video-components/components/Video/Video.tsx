import React from "react";

import Box from "@mui/material/Box";

import type { ComponentPosition, ComponentSize } from "../../../types/shared";
import { positionToStyle } from "../../../utils/positionToStyle";
import { resolveSize } from "../../../utils/resolveSize";
import type { BaseVideoComponent } from "../../VideoComponent";

export interface IVideo extends BaseVideoComponent {
  type: "VIDEO";
  url: string;
  size?: ComponentSize;
  position: ComponentPosition;
}

export interface IVideoProps {
  comp: IVideo;
}

export const Video: React.FC<IVideoProps> = ({ comp }) => {
  const width = resolveSize(comp.size);
  return (
    <Box style={positionToStyle(comp.position)}>
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
