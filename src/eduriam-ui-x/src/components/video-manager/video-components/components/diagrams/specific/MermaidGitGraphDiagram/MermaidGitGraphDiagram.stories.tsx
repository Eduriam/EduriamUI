import { theme } from "@eduriam/ui-core";
import { Player } from "@remotion/player";
import type { Meta, StoryObj } from "@storybook/react";

import {
  type IMermaidGitGraphDiagram,
  MermaidGitGraphDiagram,
} from "./MermaidGitGraphDiagram";
import { getTotalDurationFramesFromStepStarts } from "../../MermaidDiagram/util/timing";

const STORYBOOK_FPS = 30;
const STORYBOOK_WIDTH = 1920;
const STORYBOOK_HEIGHT = 1080;

const StoryComposition = ({ comp }: { comp: IMermaidGitGraphDiagram }) => (
  <MermaidGitGraphDiagram comp={comp} />
);

const getDurationInFrames = (comp: IMermaidGitGraphDiagram): number => {
  return getTotalDurationFramesFromStepStarts({
    steps: comp.steps,
    fps: STORYBOOK_FPS,
  });
};

const meta: Meta<typeof MermaidGitGraphDiagram> = {
  title: "x/video-manager/video-components/diagrams/MermaidGitGraphDiagram",
  component: MermaidGitGraphDiagram,
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
type Story = StoryObj<typeof MermaidGitGraphDiagram>;

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
      id: "mermaid-gitgraph-diagram-1",
      type: "GIT_GRAPH_DIAGRAM",
      startTime: 0,
      column: "first",
      steps: [
        {
          id: "step-1",
          diagram: `gitGraph
commit id: "Initial"
branch feature
checkout feature
commit id: "Feature work"
checkout main
commit id: "Hotfix"
merge feature`,
          startTime: 0,
        },
      ],
    },
  },
};

