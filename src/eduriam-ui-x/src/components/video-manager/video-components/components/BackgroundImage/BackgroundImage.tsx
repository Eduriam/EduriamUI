import { AbsoluteFill } from "remotion";

import React from "react";

import type { BackgroundVideoComponent } from "../../VideoComponent";

export interface IBackgroundImage extends BackgroundVideoComponent {
  type: "BACKGROUND_IMAGE";
  url: string;
}

export interface IBackgroundImageProps {
  comp: IBackgroundImage;
}

export const BackgroundImage: React.FC<IBackgroundImageProps> = ({ comp }) => (
  <AbsoluteFill
    style={{
      backgroundImage: `url(${comp.url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />
);

export default BackgroundImage;

