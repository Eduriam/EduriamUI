import React from "react";

import { IImage } from "../../../video-components/components/Image/Image";
import type { BaseSlide } from "../../BaseSlide";
import type { IRawSlide } from "../../raw-slide/RawSlide";
import { RawSlide } from "../../raw-slide/RawSlide";

type SlideImage = Pick<IImage, "id" | "startTime" | "url">;

export interface IOneImageSlide extends BaseSlide {
  type: "ONE_IMAGE";
  image: SlideImage;
}

export interface IOneImageSlideProps {
  slide: IOneImageSlide;
  fps: number;
}

/**
 * Renders one centered medium-sized image through RAW slide composition.
 */
export const OneImageSlide: React.FC<IOneImageSlideProps> = ({ slide, fps }) => {
  const rawSlide: IRawSlide = {
    id: slide.id,
    type: "RAW",
    components: [
      {
        id: slide.image.id,
        type: "IMAGE",
        startTime: slide.image.startTime,
        column: "first",
        url: slide.image.url,
        size: "MEDIUM",
      },
    ],
  };

  return <RawSlide slide={rawSlide} fps={fps} />;
};

export default OneImageSlide;
