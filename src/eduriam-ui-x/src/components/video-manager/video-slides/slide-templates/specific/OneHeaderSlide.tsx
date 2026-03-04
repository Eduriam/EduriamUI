import { AbsoluteFill } from "remotion";

import React from "react";

import { useTheme } from "@mui/material/styles";

import { Text } from "../../../video-components/components/Text/Text";
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
 * Renders a {@link IOneHeaderSlide} template – a single centred text
 * over the theme's default background.
 */
export const OneHeaderSlide: React.FC<IOneHeaderSlideProps> = ({ slide }) => {
  const theme = useTheme();
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{ backgroundColor: theme.palette.background.default }}
      />
      <Text
        comp={{
          id: `${slide.id}-header`,
          type: "TEXT",
          startTime: 0,
          column: "first",
          text: slide.text,
        }}
      />
    </AbsoluteFill>
  );
};

export default OneHeaderSlide;
