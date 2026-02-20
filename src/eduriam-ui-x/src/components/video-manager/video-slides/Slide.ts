import type { IRawSlide } from "./raw-slide/RawSlide";
import type { SlideTemplates } from "./slide-templates/SlideTemplate";

/** Discriminant for slide kinds. Define explicitly to avoid circular dependency with BaseSlide. */
export type SlideType = Slide["type"];

/** Any slide: either a raw slide or a template. */
export type Slide = IRawSlide | SlideTemplates;
