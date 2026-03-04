import { AbsoluteFill } from "remotion";

import React from "react";

import type { BackgroundVideoComponent } from "../../VideoComponent";

export interface IBackgroundVideo extends BackgroundVideoComponent {
  type: "BACKGROUND_VIDEO";
  url: string;
}

export interface IBackgroundVideoProps {
  comp: IBackgroundVideo;
}

export const BackgroundVideo: React.FC<IBackgroundVideoProps> = ({ comp }) => (
  <AbsoluteFill>
    <video
      src={comp.url}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      autoPlay
      loop
      muted
    />
  </AbsoluteFill>
);

export default BackgroundVideo;

