import type { ComponentSize } from "../types/shared";

export const resolveSize = (size: ComponentSize | undefined): number => {
  if (typeof size === "number") return size;
  if (size === "SMALL") return 300;
  if (size === "MEDIUM") return 600;
  if (size === "LARGE") return 900;
  return 600;
};
