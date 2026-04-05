import React from "react";

import type { BaseSlide } from "../../BaseSlide";
import type { IRawSlide } from "../../raw-slide/RawSlide";
import { RawSlide } from "../../raw-slide/RawSlide";

export interface IOneHeaderSlide extends BaseSlide {
  type: "ONE_HEADER";
  text: string;
}

export interface IOneHeaderSlideProps {
  slide: IOneHeaderSlide;
  fps: number;
}

/**
 * Renders a {@link IOneHeaderSlide} template as a RAW slide with one text
 * component in the first column.
 */
export const OneHeaderSlide: React.FC<IOneHeaderSlideProps> = ({ slide, fps }) => {
  const rawSlide: IRawSlide = {
    id: slide.id,
    type: "RAW",
    startTime: slide.startTime,
    components: [
      {
        id: `${slide.id}-header`,
        type: "TEXT",
        startTime: 0,
        column: "first",
        text: slide.text,
      },
    ],
  };

  return <RawSlide slide={rawSlide} fps={fps} />;
};

export default OneHeaderSlide;
