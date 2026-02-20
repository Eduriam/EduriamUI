import type React from "react";

import type { ComponentPosition } from "../types/shared";

const base: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
};

const map: Record<ComponentPosition, React.CSSProperties> = {
  TOP_LEFT: { alignItems: "flex-start", justifyContent: "flex-start" },
  TOP_CENTER: { alignItems: "flex-start", justifyContent: "center" },
  TOP_RIGHT: { alignItems: "flex-start", justifyContent: "flex-end" },
  CENTER_LEFT: { alignItems: "center", justifyContent: "flex-start" },
  CENTER: { alignItems: "center", justifyContent: "center" },
  CENTER_RIGHT: { alignItems: "center", justifyContent: "flex-end" },
  BOTTOM_LEFT: { alignItems: "flex-end", justifyContent: "flex-start" },
  BOTTOM_CENTER: { alignItems: "flex-end", justifyContent: "center" },
  BOTTOM_RIGHT: { alignItems: "flex-end", justifyContent: "flex-end" },
};

export const positionToStyle = (
  position: ComponentPosition,
): React.CSSProperties => ({
  ...base,
  ...map[position],
});
