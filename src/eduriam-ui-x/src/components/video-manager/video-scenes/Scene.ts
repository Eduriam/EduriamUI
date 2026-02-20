import type { ID } from "../../../models/ID";
import { Slide } from "../video-slides/Slide";

export type Scene = {
  id?: ID;
  slides: Slide[];
  audio: { url: string };
};
