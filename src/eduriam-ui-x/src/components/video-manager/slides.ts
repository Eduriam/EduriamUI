import type { ID } from "../../models/ID";
import type {
  ComponentType,
  SceneComponent,
} from "./components/SceneComponent";
import type { ComponentPosition } from "./types/shared";

export type SlideType = "CUSTOM" | "ONE_HEADER";

export type CustomSlide = {
  id: string;
  type: "CUSTOM";
  components: SceneComponent[];
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
  toComponents(): SceneComponent[];
}

export class CustomSlideClass implements SlideClass {
  private readonly slide: CustomSlide;
  constructor(slide: CustomSlide) {
    this.slide = slide;
  }
  toComponents(): SceneComponent[] {
    return this.slide.components ?? [];
  }
}

export class OneHeaderSlideClass implements SlideClass {
  private readonly slide: OneHeaderSlide;
  constructor(slide: OneHeaderSlide) {
    this.slide = slide;
  }
  toComponents(): SceneComponent[] {
    const position: ComponentPosition = this.slide.args.position ?? "CENTER";
    return [
      {
        id: `${this.slide.id}-header`,
        type: "HEADER",
        text: this.slide.args.text,
        position,
      },
    ];
  }
}
