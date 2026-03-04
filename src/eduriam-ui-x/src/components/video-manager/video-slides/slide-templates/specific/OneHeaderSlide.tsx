import { AbsoluteFill } from "remotion";

import React from "react";

import { useTheme } from "@mui/material/styles";

import { Header } from "../../../video-components/components/Header/Header";
import type { BaseSlide } from "../../BaseSlide";

export interface IOneHeaderSlide extends BaseSlide {
  type: "ONE_HEADER";
  text: string;
}

export interface IOneHeaderSlideProps {
  slide: IOneHeaderSlide;
  fps: number;
}

/**
 * Renders a {@link IOneHeaderSlide} template – a single centred header
 * over the theme's default background.
 */
export const OneHeaderSlide: React.FC<IOneHeaderSlideProps> = ({ slide }) => {
  const theme = useTheme();
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{ backgroundColor: theme.palette.background.default }}
      />
      <Header
        comp={{
          id: `${slide.id}-header`,
          type: "HEADER",
          startTime: 0,
          text: slide.text,
        }}
      />
    </AbsoluteFill>
  );
};

export default OneHeaderSlide;
