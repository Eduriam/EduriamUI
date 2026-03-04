import { theme } from "@eduriam/ui-core";
import { Player } from "@remotion/player";
import type { Meta, StoryObj } from "@storybook/react";

import {
  type IMermaidStateDiagram,
  MermaidStateDiagram,
} from "./MermaidStateDiagram";
import { getTotalDurationFramesFromStepStarts } from "../../MermaidDiagram/util/timing";

const STORYBOOK_FPS = 30;
const STORYBOOK_WIDTH = 1920;
const STORYBOOK_HEIGHT = 1080;

const StoryComposition = ({ comp }: { comp: IMermaidStateDiagram }) => (
  <MermaidStateDiagram comp={comp} />
);

const getDurationInFrames = (comp: IMermaidStateDiagram): number => {
  return getTotalDurationFramesFromStepStarts({
    steps: comp.steps,
    fps: STORYBOOK_FPS,
  });
};

const meta: Meta<typeof MermaidStateDiagram> = {
  title: "x/video-manager/video-components/diagrams/MermaidStateDiagram",
  component: MermaidStateDiagram,
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
type Story = StoryObj<typeof MermaidStateDiagram>;

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
      id: "mermaid-state-diagram-1",
      type: "STATE_DIAGRAM",
      startTime: 0,
      column: "first",
      steps: [
        {
          id: "step-1",
          diagram: `stateDiagram-v2
[*] --> Idle
Idle --> Loading: Start
Loading --> Success: Done
Loading --> Error: Fail
Success --> [*]
Error --> Idle: Retry`,
          startTime: 0,
        },
      ],
    },
  },
};

