import { AbsoluteFill, Sequence } from "remotion";

import React from "react";

import { useTheme } from "@mui/material/styles";

import type { VideoComponent } from "../../video-components/VideoComponent";
import type { IBackgroundColor } from "../../video-components/components/BackgroundColor/BackgroundColor";
import { BackgroundColor } from "../../video-components/components/BackgroundColor/BackgroundColor";
import type { IBackgroundImage } from "../../video-components/components/BackgroundImage/BackgroundImage";
import { BackgroundImage } from "../../video-components/components/BackgroundImage/BackgroundImage";
import {
  BackgroundVideo,
  type IBackgroundVideo,
} from "../../video-components/components/BackgroundVideo/BackgroundVideo";
import { VideoComponentFactory } from "../../video-components/factory/VideoComponentFactory";
import type { BaseSlide } from "../BaseSlide";

export interface IRawSlide extends BaseSlide {
  type: "RAW";
  components: VideoComponent[];
}

export interface IRawSlideProps {
  slide: IRawSlide;
  fps: number;
}

/**
 * Renders a {@link IRawSlide} by laying out its components.
 *
 * Background components are rendered as full-fill layers;
 * all other components are placed in Remotion {@link Sequence}s
 * offset by their `startTime`.
 */
export const RawSlide: React.FC<IRawSlideProps> = ({ slide, fps }) => {
  const theme = useTheme();
  const { components } = slide;

  const bg = components.find((c) => c.type === "BACKGROUND_COLOR") as
    | IBackgroundColor
    | undefined;
  const bgImg = components.find((c) => c.type === "BACKGROUND_IMAGE") as
    | IBackgroundImage
    | undefined;
  const bgVid = components.find((c) => c.type === "BACKGROUND_VIDEO") as
    | IBackgroundVideo
    | undefined;

  const others = components
    .filter(
      (c) =>
        c.type !== "BACKGROUND_COLOR" &&
        c.type !== "BACKGROUND_IMAGE" &&
        c.type !== "BACKGROUND_VIDEO",
    )
    .sort((a, b) => {
      const ai = (a as { id?: string }).id ?? "";
      const bi = (b as { id?: string }).id ?? "";
      return ai.localeCompare(bi);
    });

  return (
    <AbsoluteFill>
      {bg ? (
        <BackgroundColor comp={bg} />
      ) : bgImg ? (
        <BackgroundImage comp={bgImg} />
      ) : bgVid ? (
        <BackgroundVideo comp={bgVid} />
      ) : (
        <AbsoluteFill
          style={{ backgroundColor: theme.palette.background.default }}
        />
      )}

      {others.map((c, idx) => {
        const startMs = c.startTime ?? 0;
        const startFrame = Math.max(0, Math.round((startMs / 1000) * fps));
        const key = (c as { id?: string }).id ?? `comp-${idx}`;
        return (
          <Sequence key={key} from={startFrame}>
            {VideoComponentFactory.renderComponent(c)}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export default RawSlide;
