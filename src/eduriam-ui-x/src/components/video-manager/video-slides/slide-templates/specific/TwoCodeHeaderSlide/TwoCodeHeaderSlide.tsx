import React from "react";

import type { BaseSlide } from "../../../BaseSlide";
import { type IRawSlide, RawSlide } from "../../../raw-slide/RawSlide";
import type { ITimedSlideHeader } from "../TimedSlideHeader";

/** Two short, one-line code labels, independently revealed in the first and second columns. */
export interface ITwoCodeHeaderSlide extends BaseSlide {
  type: "TWO_CODE_HEADER";
  leftHeader: ITimedSlideHeader;
  rightHeader: ITimedSlideHeader;
}

/** Render with the same inline-code presentation as OneCodeHeaderSlide. Header text is raw code. */
export interface ITwoCodeHeaderSlideProps {
  slide: ITwoCodeHeaderSlide;
  fps: number;
}

/** Compare two short code snippets; use code explanation slides for multiline examples. */
export const TwoCodeHeaderSlide: React.FC<ITwoCodeHeaderSlideProps> = ({
  slide,
  fps,
}) => {
  const rawSlide: IRawSlide = {
    id: slide.id,
    type: "RAW",
    startTime: slide.startTime,
    components: [
      {
        ...slide.leftHeader,
        type: "TEXT",
        column: "first",
        text: `\`${slide.leftHeader.text}\``,
      },
      {
        ...slide.rightHeader,
        type: "TEXT",
        column: "second",
        text: `\`${slide.rightHeader.text}\``,
      },
    ],
  };
  return <RawSlide slide={rawSlide} fps={fps} />;
};
