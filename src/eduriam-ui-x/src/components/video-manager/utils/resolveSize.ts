import type { ComponentSize } from "../types/shared";

export const resolveSize = (size: ComponentSize | undefined): string => {
  if (typeof size === "number") return `${size}%`;
  if (size === "SMALL") return "25%";
  if (size === "MEDIUM") return "50%";
  if (size === "LARGE") return "75%";
  return "50%";
};
