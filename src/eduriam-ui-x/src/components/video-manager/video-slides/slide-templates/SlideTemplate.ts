import { ICodeExplanationSlide } from "./specific/CodeExplanationSlide";
import { IListSlide } from "./specific/ListSlide";
import { IOneCodeHeaderSlide } from "./specific/OneCodeHeaderSlide";
import { IOneHeaderSlide } from "./specific/OneHeaderSlide";
import { IOneImageSlide } from "./specific/OneImageSlide";
import { IThreeImagesSlide } from "./specific/ThreeImagesSlide";

/** Union of all slide-template data types. */
export type SlideTemplates =
  | IOneHeaderSlide
  | ICodeExplanationSlide
  | IThreeImagesSlide
  | IOneImageSlide
  | IListSlide
  | IOneCodeHeaderSlide;
