import React from "react";
import { AbsoluteFill } from "remotion";

export type IBackgroundVideo = {
  id: string;
  type: "BACKGROUND_VIDEO";
  url: string;
};

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
