import React from "react";
import { AbsoluteFill } from "remotion";

export type IBackgroundImage = {
  id: string;
  type: "BACKGROUND_IMAGE";
  url: string;
};

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
