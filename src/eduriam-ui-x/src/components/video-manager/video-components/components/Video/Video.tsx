import { Box } from "@adapters/mui";
import {
  Freeze,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import React from "react";

import type { ComponentSize } from "../../../types/shared";
import { resolveSize } from "../../../utils/resolveSize";
import type { BaseVideoComponent } from "../../VideoComponent";

export interface IVideo extends BaseVideoComponent {
  type: "VIDEO";
  url: string;
  mediaDurationMs?: number;
  size?: ComponentSize;
}

export interface IVideoProps {
  comp: IVideo;
}

export const Video: React.FC<IVideoProps> = ({ comp }) => {
  const responsiveWidth = resolveSize(comp.size);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (comp.mediaDurationMs && comp.mediaDurationMs > 0) {
    const last = Math.max(
      0,
      Math.ceil((comp.mediaDurationMs / 1000) * fps) - 1,
    );
    return (
      <Freeze frame={last} active={frame >= last}>
        <OffthreadVideo
          src={comp.url}
          muted
          style={{ width: responsiveWidth, height: "auto", borderRadius: 8 }}
        />
      </Freeze>
    );
  }
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
        sx={{ width: responsiveWidth, height: "auto", borderRadius: 2 }}
        autoPlay
        loop
        muted
      />
    </Box>
  );
};

export default Video;
