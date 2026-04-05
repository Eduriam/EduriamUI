import React from "react";

import { IImage } from "../../../video-components/components/Image/Image";
import type { BaseSlide } from "../../BaseSlide";
import type { IRawSlide } from "../../raw-slide/RawSlide";
import { RawSlide } from "../../raw-slide/RawSlide";

type SlideImage = Pick<IImage, "id" | "startTime" | "url">;

export interface IThreeImagesSlide extends BaseSlide {
  type: "THREE_IMAGES";
  leftImage: SlideImage;
  middleImage: SlideImage;
  rightImage: SlideImage;
}

export interface IThreeImagesSlideProps {
  slide: IThreeImagesSlide;
  fps: number;
}

/**
 * Renders three columns with one medium-sized image in each column through RAW slide composition.
 */
export const ThreeImagesSlide: React.FC<IThreeImagesSlideProps> = ({
  slide,
  fps,
}) => {
  const rawSlide: IRawSlide = {
    id: slide.id,
    type: "RAW",
    components: [
      {
        id: slide.leftImage.id,
        type: "IMAGE",
        startTime: slide.leftImage.startTime,
        column: "first",
        url: slide.leftImage.url,
        size: "MEDIUM",
      },
      {
        id: slide.middleImage.id,
        type: "IMAGE",
        startTime: slide.middleImage.startTime,
        column: "second",
        url: slide.middleImage.url,
        size: "MEDIUM",
      },
      {
        id: slide.rightImage.id,
        type: "IMAGE",
        startTime: slide.rightImage.startTime,
        column: "third",
        url: slide.rightImage.url,
        size: "MEDIUM",
      },
    ],
  };

  return <RawSlide slide={rawSlide} fps={fps} />;
};

export default ThreeImagesSlide;
