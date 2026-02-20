import { BaseSlide } from "../BaseSlide";
import { RawSlide } from "../raw-slide/RawSlide";
import { OneHeaderSlide } from "./specific/OneHeaderSlide";

/** Converts a template slide to a RawSlide. */
export interface SlideTemplate extends BaseSlide {
  getRawSlide(): RawSlide;
}

/** Union of all slide template data types. */
export type SlideTemplates = OneHeaderSlide;
