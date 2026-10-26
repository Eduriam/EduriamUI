import React from "react";

import type { BaseSlide } from "../../../BaseSlide";
import { type IRawSlide, RawSlide } from "../../../raw-slide/RawSlide";
import type { ITimedSlideHeader } from "../TimedSlideHeader";

/** Two short labels in the first and second columns, each with its own reveal time. */
export interface ITwoHeaderSlide extends BaseSlide {
  type: "TWO_HEADER";
  leftHeader: ITimedSlideHeader;
  rightHeader: ITimedSlideHeader;
}

/** Renders a two-header slide using the existing responsive column layout. */
export interface ITwoHeaderSlideProps {
  slide: ITwoHeaderSlide;
  fps: number;
}

/** Display two keywords or short phrases; use a list for longer or more numerous items. */
export const TwoHeaderSlide: React.FC<ITwoHeaderSlideProps> = ({
  slide,
  fps,
}) => {
  const rawSlide: IRawSlide = {
    id: slide.id,
    type: "RAW",
    startTime: slide.startTime,
    components: [
      { ...slide.leftHeader, type: "TEXT", column: "first" },
      { ...slide.rightHeader, type: "TEXT", column: "second" },
    ],
  };
  return <RawSlide slide={rawSlide} fps={fps} />;
};
