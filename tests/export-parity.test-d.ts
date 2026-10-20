import type { VideoDefinition } from "../src/eduriam-ui-x/src/index";

const definition: VideoDefinition = {
  fps: 30,
  videoWidth: 1920,
  videoHeight: 1080,
  scenes: [
    {
      id: "explanation",
      duration: 1000,
      audio: { url: "/audio.mp3", startMs: 2000, endMs: 3000, captions: [] },
      slides: [],
    },
  ],
};
void definition;
