import { RawSlide } from "./raw-slide/RawSlide";
import { SlideTemplates } from "./slide-templates/SlideTemplate";

/** Any slide: either raw or a template. */
export type Slide = RawSlide | SlideTemplates;

export type SlideType = "RAW" | "ONE_HEADER";
