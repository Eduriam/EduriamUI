import type { ID } from "../../../models/ID";
import { SlideType } from "./Slide";

export interface BaseSlide {
  id: ID;
  type: SlideType;
}
