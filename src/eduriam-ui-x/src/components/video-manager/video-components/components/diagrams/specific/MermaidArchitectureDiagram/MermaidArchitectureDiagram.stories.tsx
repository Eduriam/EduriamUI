import { theme } from "@eduriam/ui-core";
import { Player } from "@remotion/player";
import type { Meta, StoryObj } from "@storybook/react";

import {
  type IMermaidArchitectureDiagram,
  MermaidArchitectureDiagram,
} from "./MermaidArchitectureDiagram";
import { getTotalDurationFramesFromStepStarts } from "../../MermaidDiagram/util/timing";

const STORYBOOK_FPS = 30;
const STORYBOOK_WIDTH = 1920;
const STORYBOOK_HEIGHT = 1080;

const StoryComposition = ({ comp }: { comp: IMermaidArchitectureDiagram }) => (
  <MermaidArchitectureDiagram comp={comp} />
);

const getDurationInFrames = (comp: IMermaidArchitectureDiagram): number => {
  return getTotalDurationFramesFromStepStarts({
    steps: comp.steps,
    fps: STORYBOOK_FPS,
  });
};

const meta: Meta<typeof MermaidArchitectureDiagram> = {
  title: "x/video-manager/video-components/diagrams/MermaidArchitectureDiagram",
  component: MermaidArchitectureDiagram,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          aspectRatio: "1920/1080",
          position: "relative",
          overflow: "hidden",
          background: theme.palette.background.default,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MermaidArchitectureDiagram>;

export const Default: Story = {
  render: (args) => (
    <Player
      component={StoryComposition}
      inputProps={{ comp: args.comp }}
      durationInFrames={getDurationInFrames(args.comp)}
      fps={STORYBOOK_FPS}
      compositionWidth={STORYBOOK_WIDTH}
      compositionHeight={STORYBOOK_HEIGHT}
      controls
      autoPlay
      clickToPlay={false}
      allowFullscreen={false}
      style={{ width: "100%", height: "100%" }}
      acknowledgeRemotionLicense={true}
    />
  ),
  args: {
    comp: {
      id: "mermaid-architecture-diagram-1",
      type: "ARCHITECTURE_DIAGRAM",
      startTime: 0,
      column: "first",
      steps: [
        {
          id: "step-1",
          diagram: `flowchart TB
Browser -->|HTTPS| Frontend[Frontend App]
Frontend -->|REST| API[Backend API]
API --> DB[(Database)]
API --> Cache[(Cache)]`,
          startTime: 0,
        },
      ],
    },
  },
};

