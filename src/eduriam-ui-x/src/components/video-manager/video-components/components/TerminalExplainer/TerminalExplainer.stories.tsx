import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";
import { Player } from "@remotion/player";

import { TerminalExplainer, type ITerminalExplainer } from "./TerminalExplainer";
import { getTotalDurationFramesFromStepStarts } from "./util/timing";

const STORYBOOK_FPS = 30;
const STORYBOOK_WIDTH = 1920;
const STORYBOOK_HEIGHT = 1080;

const StoryComposition = ({ comp }: { comp: ITerminalExplainer }) => (
  <TerminalExplainer comp={comp} />
);

const getDurationInFrames = (comp: ITerminalExplainer): number => {
  return getTotalDurationFramesFromStepStarts({
    steps: comp.steps,
    fps: STORYBOOK_FPS,
  });
};

const withStepStartTimes = <T extends { id: string; output: string }>(
  steps: T[],
  stepIntervalMs: number,
): Array<T & { startTime: number }> =>
  steps.map((step, index) => ({
    ...step,
    startTime: index * stepIntervalMs,
  }));

const meta: Meta<typeof TerminalExplainer> = {
  title: "x/video-manager/video-components/TerminalExplainer",
  component: TerminalExplainer,
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
type Story = StoryObj<typeof TerminalExplainer>;

export const CommandWalkthrough: Story = {
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
      id: "terminal-explainer-commands",
      type: "TERMINAL_EXPLAINER",
      startTime: 0,
      column: "first",
      title: "deploy-session",
      steps: withStepStartTimes(
        [
          {
            id: "step-1",
            output: `$ npm run build

> eduriam-ui-x@0.0.0 build
> vite build

vite v5.4.2 building for production...
transforming (1168) modules...`,
          },
          {
            id: "step-2",
            output: `$ npm run build

> eduriam-ui-x@0.0.0 build
> vite build

vite v5.4.2 building for production...
transforming (1168) modules...
rendering chunks...
computing gzip size...
dist/index.html  2.34 kB  | gzip: 0.87 kB`,
          },
          {
            id: "step-3",
            output: `$ npm run build

> eduriam-ui-x@0.0.0 build
> vite build

vite v5.4.2 building for production...
transforming (1168) modules...
rendering chunks...
computing gzip size...
dist/index.html  2.34 kB  | gzip: 0.87 kB
dist/assets/index-2f9cc6.js  238.04 kB  | gzip: 72.43 kB

Done in 7.41s`,
          },
        ],
        2600,
      ),
    },
  },
};

export const LongOutputAutoScroll: Story = {
  render: CommandWalkthrough.render,
  args: {
    comp: {
      id: "terminal-explainer-long-output",
      type: "TERMINAL_EXPLAINER",
      startTime: 0,
      column: "first",
      title: "test-runner",
      steps: withStepStartTimes(
        [
          {
            id: "long-1",
            output: `$ npm run test:ci

PASS  src/components/video-manager/video-components/components/CodeExplainer/CodeExplainer.test.tsx
PASS  src/components/video-manager/video-player/VideoPlayer.test.tsx
PASS  src/components/study-session/components/StudySession.test.tsx`,
          },
          {
            id: "long-2",
            output: `$ npm run test:ci

PASS  src/components/video-manager/video-components/components/CodeExplainer/CodeExplainer.test.tsx
PASS  src/components/video-manager/video-player/VideoPlayer.test.tsx
PASS  src/components/study-session/components/StudySession.test.tsx
PASS  src/components/study-session/components/study-blocks/exercise/components/specific/ClassDiagram/ClassDiagram.test.tsx
PASS  src/components/study-session/components/study-blocks/exercise/components/specific/StateDiagram/StateDiagram.test.tsx
PASS  src/components/study-session/components/study-blocks/exercise/components/specific/FlowchartDiagram/FlowchartDiagram.test.tsx`,
          },
          {
            id: "long-3",
            output: `$ npm run test:ci

PASS  src/components/video-manager/video-components/components/CodeExplainer/CodeExplainer.test.tsx
PASS  src/components/video-manager/video-player/VideoPlayer.test.tsx
PASS  src/components/study-session/components/StudySession.test.tsx
PASS  src/components/study-session/components/study-blocks/exercise/components/specific/ClassDiagram/ClassDiagram.test.tsx
PASS  src/components/study-session/components/study-blocks/exercise/components/specific/StateDiagram/StateDiagram.test.tsx
PASS  src/components/study-session/components/study-blocks/exercise/components/specific/FlowchartDiagram/FlowchartDiagram.test.tsx
PASS  src/components/study-session/components/study-blocks/exercise/components/specific/GitGraphDiagram/GitGraphDiagram.test.tsx
PASS  src/components/study-session/components/study-blocks/exercise/components/specific/ArchitectureDiagram/ArchitectureDiagram.test.tsx
PASS  src/components/study-session/components/study-blocks/exercise/components/specific/EntityRelationshipDiagram/EntityRelationshipDiagram.test.tsx
PASS  src/components/video-manager/video-components/components/TerminalExplainer/TerminalExplainer.test.tsx

Test Suites: 10 passed, 10 total
Tests:       74 passed, 74 total
Snapshots:   0 total
Time:        15.62 s`,
          },
        ],
        2800,
      ),
    },
  },
};
