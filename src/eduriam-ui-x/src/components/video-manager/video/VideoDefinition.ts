import { Scene } from "../video-scenes/Scene";

export type VideoDefinition = {
  scenes: Scene[];
  fps: number;
  videoWidth: number;
  videoHeight: number;
};
