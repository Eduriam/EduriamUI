import type { ID } from "../../../../models/ID";
import type { VideoComponent } from "../../video-components/VideoComponent";
import { BaseSlide } from "../BaseSlide";

export interface IRawSlide extends BaseSlide {
  type: "RAW";
  components: VideoComponent[];
}

export class RawSlide implements IRawSlide {
  id: ID;
  type: "RAW";
  private components: VideoComponent[];

  constructor(slide: IRawSlide) {
    this.id = slide.id;
    this.type = "RAW";
    this.components = slide.components;
  }

  getComponents(): VideoComponent[] {
    return this.components;
  }
}
