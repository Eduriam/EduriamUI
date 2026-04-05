import type { IDString } from "../../../models/ID";
import { SlideType } from "./Slide";

export interface BaseSlide {
  id: IDString;
  type: SlideType;
}
