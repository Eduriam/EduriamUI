import React from "react";

import type { Slide } from "../Slide";
import { RawSlide } from "../raw-slide/RawSlide";
import { OneHeaderSlide } from "../slide-templates/specific/OneHeaderSlide";

export class SlideFactory {
  static renderSlide(slide: Slide, fps: number): React.ReactNode {
    switch (slide.type) {
      case "RAW":
        return <RawSlide slide={slide} fps={fps} />;
      case "ONE_HEADER":
        return <OneHeaderSlide slide={slide} fps={fps} />;
      default: {
        const _: never = slide;
        throw new Error(`Unhandled slide type`);
      }
    }
  }
}
