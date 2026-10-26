import { ICodeExplanationSlide } from "./specific/CodeExplanationSlide";
import { IListSlide } from "./specific/ListSlide";
import { IOneCodeHeaderSlide } from "./specific/OneCodeHeaderSlide";
import { IOneHeaderSlide } from "./specific/OneHeaderSlide";
import { IOneImageSlide } from "./specific/OneImageSlide";
import { IThreeImagesSlide } from "./specific/ThreeImagesSlide";
import { ITwoCodeHeaderSlide } from "./specific/TwoCodeHeaderSlide";
import { ITwoHeaderSlide } from "./specific/TwoHeaderSlide";

/** Union of all slide-template data types. */
export type SlideTemplates =
  | ITwoHeaderSlide
  | ITwoCodeHeaderSlide
  | IOneHeaderSlide
  | ICodeExplanationSlide
  | IThreeImagesSlide
  | IOneImageSlide
  | IListSlide
  | IOneCodeHeaderSlide;
