import { theme } from "@eduriam/ui-core";
import { Player } from "@remotion/player";
import type { Meta, StoryObj } from "@storybook/react";

import {
  type IMermaidClassDiagramVideoComponent,
  MermaidClassDiagramVideoComponent,
} from "./MermaidClassDiagramVideoComponent";
import { getTotalDurationFramesFromStepStarts } from "./util/timing";

const STORYBOOK_FPS = 30;
const STORYBOOK_WIDTH = 1920;
const STORYBOOK_HEIGHT = 1080;

const StoryComposition = ({
  comp,
}: {
  comp: IMermaidClassDiagramVideoComponent;
}) => <MermaidClassDiagramVideoComponent comp={comp} />;

const getDurationInFrames = (
  comp: IMermaidClassDiagramVideoComponent,
): number => {
  return getTotalDurationFramesFromStepStarts({
    steps: comp.steps,
    fps: STORYBOOK_FPS,
  });
};

const withStepStartTimes = <T extends { id: string; diagram: string }>(
  steps: T[],
  stepIntervalMs: number,
): Array<T & { startTime: number }> =>
  steps.map((step, index) => ({
    ...step,
    startTime: index * stepIntervalMs,
  }));

const meta: Meta<typeof MermaidClassDiagramVideoComponent> = {
  title: "x/video-manager/video-components/MermaidClassDiagram",
  component: MermaidClassDiagramVideoComponent,
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
type Story = StoryObj<typeof MermaidClassDiagramVideoComponent>;

export const StepByStepClassDiagram: Story = {
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
      id: "mermaid-class-diagram-1",
      type: "MERMAID_CLASS_DIAGRAM",
      startTime: 0,
      column: "first",
      steps: withStepStartTimes(
        [
          {
            id: "step-1",
            diagram: `classDiagram
class User {
  +String id
  +String email
}

class Course {
  +String id
  +String title
}`,
          },
          {
            id: "step-2",
            diagram: `classDiagram
class User {
  +String id
  +String email
}

class Course {
  +String id
  +String title
}

class Enrollment {
  +String id
  +Date enrolledAt
}

User "1" --> "*" Enrollment : has
Course "1" --> "*" Enrollment : contains`,
          },
          {
            id: "step-3",
            diagram: `classDiagram
class User {
  +String id
  +String email
}

class Instructor {
  +String id
  +String name
}

class Course {
  +String id
  +String title
}

class Enrollment {
  +String id
  +Date enrolledAt
}

User "1" --> "*" Enrollment : has
Course "1" --> "*" Enrollment : contains
Instructor "1" --> "*" Course : teaches`,
          },
        ],
        5000,
      ),
    },
  },
};



