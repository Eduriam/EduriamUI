import type { IDString } from "../../../../../models/ID";

/** A header that appears at a slide-relative time in milliseconds and remains until the slide ends. */
export interface ITimedSlideHeader {
  id: IDString;
  text: string;
  startTime: number;
}
