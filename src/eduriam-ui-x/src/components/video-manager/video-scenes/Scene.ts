import type { ID } from "../../../models/ID";
import { Slide } from "../video-slides/Slide";

export interface Caption {
  text: string;
  startMs: number;
  endMs: number;
  timestampMs: number | null;
  confidence: number | null;
}

export type Scene = {
  id?: ID;
  slides: Slide[];
  audio?: {
    url: string;
    captions?: Caption[];
  };
  duration: number; // Duration in milliseconds
};
