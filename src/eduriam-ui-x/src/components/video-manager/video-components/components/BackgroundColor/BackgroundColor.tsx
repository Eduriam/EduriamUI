import { AbsoluteFill } from "remotion";

import React from "react";

import { useTheme } from "@mui/material/styles";

import type { BaseVideoComponent } from "../../VideoComponent";

export interface IBackgroundColor extends BaseVideoComponent {
  type: "BACKGROUND_COLOR";
  color: string;
}

export interface IBackgroundColorProps {
  comp: IBackgroundColor;
}

export const BackgroundColor: React.FC<IBackgroundColorProps> = ({ comp }) => {
  const theme = useTheme();
  const themeColorMap: Record<string, string> = {
    default: theme.palette.background.default,
    paper: theme.palette.background.paper,
  };
  const backgroundColor = themeColorMap[comp.color] ?? comp.color;
  return <AbsoluteFill style={{ backgroundColor }} />;
};

export default BackgroundColor;
