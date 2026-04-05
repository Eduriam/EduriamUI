import React from "react";

import type { BaseSlide } from "../../BaseSlide";
import type { IRawSlide } from "../../raw-slide/RawSlide";
import { RawSlide } from "../../raw-slide/RawSlide";

export interface IOneCodeHeaderSlide extends BaseSlide {
  type: "ONE_CODE_HEADER";
  text: string;
}

export interface IOneCodeHeaderSlideProps {
  slide: IOneCodeHeaderSlide;
  fps: number;
}

/**
 * Renders a single centered code-styled text using inline markdown code.
 */
export const OneCodeHeaderSlide: React.FC<IOneCodeHeaderSlideProps> = ({
  slide,
  fps,
}) => {
  const rawSlide: IRawSlide = {
    id: slide.id,
    type: "RAW",
    components: [
      {
        id: `${slide.id}-code-header`,
        type: "TEXT",
        startTime: 0,
        column: "first",
        text: `\`${slide.text}\``,
      },
    ],
  };

  return <RawSlide slide={rawSlide} fps={fps} />;
};

export default OneCodeHeaderSlide;
