import React from "react";

import type { Slide } from "../Slide";
import { RawSlide } from "../raw-slide/RawSlide";
import { CodeExplanationSlide } from "../slide-templates/specific/CodeExplanationSlide";
import { ListSlide } from "../slide-templates/specific/ListSlide";
import { OneCodeHeaderSlide } from "../slide-templates/specific/OneCodeHeaderSlide";
import { OneHeaderSlide } from "../slide-templates/specific/OneHeaderSlide";
import { OneImageSlide } from "../slide-templates/specific/OneImageSlide";
import { ThreeImagesSlide } from "../slide-templates/specific/ThreeImagesSlide";

export class SlideFactory {
  static renderSlide(slide: Slide, fps: number): React.ReactNode {
    switch (slide.type) {
      case "RAW":
        return <RawSlide slide={slide} fps={fps} />;
      case "ONE_HEADER":
        return <OneHeaderSlide slide={slide} fps={fps} />;
      case "CODE_EXPLANATION":
        return <CodeExplanationSlide slide={slide} fps={fps} />;
      case "THREE_IMAGES":
        return <ThreeImagesSlide slide={slide} fps={fps} />;
      case "ONE_IMAGE":
        return <OneImageSlide slide={slide} fps={fps} />;
      case "LIST":
        return <ListSlide slide={slide} fps={fps} />;
      case "ONE_CODE_HEADER":
        return <OneCodeHeaderSlide slide={slide} fps={fps} />;
      default: {
        const _: never = slide;
        throw new Error(`Unhandled slide type`);
      }
    }
  }
}
