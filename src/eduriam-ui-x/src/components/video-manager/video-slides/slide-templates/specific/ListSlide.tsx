import React from "react";

import { IDString } from "../../../../../models/ID";
import type { BaseSlide } from "../../BaseSlide";
import type { IRawSlide } from "../../raw-slide/RawSlide";
import { RawSlide } from "../../raw-slide/RawSlide";

export interface IListSlideItem {
  id: IDString;
  text: string;
  startTime: number;
}

export interface IListSlide extends BaseSlide {
  type: "LIST";
  items: IListSlideItem[];
  variant: "ORDERED" | "UNORDERED";
}

export interface IListSlideProps {
  slide: IListSlide;
  fps: number;
}

/**
 * Renders a bulleted list through RAW slide composition.
 * Each list item can appear at a specific start time.
 */
export const ListSlide: React.FC<IListSlideProps> = ({ slide, fps }) => {
  void fps;

  const rawSlide: IRawSlide = {
    id: slide.id,
    type: "RAW",
    components: [
      {
        id: `${slide.id}-list`,
        type: "LIST",
        startTime: 0,
        column: "first",
        ordered: slide.variant === "ORDERED",
        items: slide.items,
      },
    ],
  };

  return <RawSlide slide={rawSlide} fps={fps} />;
};

export default ListSlide;
