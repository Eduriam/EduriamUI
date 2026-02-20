import type { ID } from "../../models/ID";
import type { ComponentPosition } from "./types/shared";
import type {
  ComponentType,
  VideoComponent,
} from "./video-components/VideoComponent";

export type SlideType = "CUSTOM" | "ONE_HEADER";

export type CustomSlide = {
  id: string;
  type: "CUSTOM";
  components: VideoComponent[];
};

export type OneHeaderSlide = {
  id: string;
  type: "ONE_HEADER";
  args: {
    text: string;
    position?: ComponentPosition;
  };
};

export type Slide = CustomSlide | OneHeaderSlide;

export type SlideComponent = {
  id: ID;
  type: ComponentType;
  startTime: number;
};

export interface SlideClass {
  toComponents(): VideoComponent[];
}

export class CustomSlideClass implements SlideClass {
  private readonly slide: CustomSlide;
  constructor(slide: CustomSlide) {
    this.slide = slide;
  }
  toComponents(): VideoComponent[] {
    return this.slide.components ?? [];
  }
}

export class OneHeaderSlideClass implements SlideClass {
  private readonly slide: OneHeaderSlide;
  constructor(slide: OneHeaderSlide) {
    this.slide = slide;
  }
  toComponents(): VideoComponent[] {
    const position: ComponentPosition = this.slide.args.position ?? "CENTER";
    return [
      {
        id: `${this.slide.id}-header`,
        type: "HEADER",
        startTime: 0,
        text: this.slide.args.text,
        position,
      },
    ];
  }
}
