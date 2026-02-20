import { ID } from "../../../../../models/ID";
import { ComponentPosition } from "../../../types/shared";
import { SlideType } from "../../Slide";
import { RawSlide } from "../../raw-slide/RawSlide";
import { SlideTemplate } from "../SlideTemplate";

export class OneHeaderSlide implements SlideTemplate {
  id: ID;
  type: SlideType;
  private text: string;
  private position: ComponentPosition;
  constructor(id: ID, text: string, position: ComponentPosition) {
    this.id = id;
    this.type = "ONE_HEADER";
    this.text = text;
    this.position = position;
  }

  getRawSlide(): RawSlide {
    return new RawSlide({
      id: this.id,
      type: "RAW",
      components: [
        {
          id: `${this.id}-header`,
          type: "HEADER",
          startTime: 0,
          text: this.text,
          position: this.position,
        },
      ],
    });
  }
}
