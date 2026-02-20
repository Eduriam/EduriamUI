import type { ID } from "../../../models/ID";
import { Slide } from "../slides";

export type { ComponentPosition as Position } from "./shared";

export type Scene = {
  id?: ID;
  slides: Slide[];
  audio: { url: string };
};
