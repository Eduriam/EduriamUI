import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";
import { Player } from "@remotion/player";

import { CodeExplainer, type ICodeExplainer } from "./CodeExplainer";

const STORYBOOK_FPS = 30;
const STORYBOOK_WIDTH = 1920;
const STORYBOOK_HEIGHT = 1080;

const StoryComposition = ({ comp }: { comp: ICodeExplainer }) => (
  <CodeExplainer comp={comp} />
);

const getDurationInFrames = (comp: ICodeExplainer): number => {
  const defaultStepDurationMs = comp.stepDurationMs ?? 2500;
  const totalFrames = comp.steps.reduce((sum, step) => {
    const ms = step.durationMs ?? defaultStepDurationMs;
    return sum + Math.max(1, Math.round((ms / 1000) * STORYBOOK_FPS));
  }, 0);

  return Math.max(1, totalFrames);
};

const meta: Meta<typeof CodeExplainer> = {
  title: "x/video-manager/video-components/CodeExplainer",
  component: CodeExplainer,
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
type Story = StoryObj<typeof CodeExplainer>;

export const JavaScriptWalkthrough: Story = {
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
      id: "code-explainer-1",
      type: "CODE_EXPLAINER",
      startTime: 0,
      position: "CENTER",
      size: 900,
      colorMode: "DARK",
      stepDurationMs: 2400,
      transitionDurationMs: 500,
      showLineNumbers: true,
      steps: [
        {
          id: "step-1",
          language: "ts",
          code: `const user = {
  name: "Ada",
  age: 26,
};

console.log(user);
//           ^?`,
        },
        {
          id: "step-2",
          language: "ts",
          code: `const user = {
  name: "Ada",
  age: 26,
};

// @errors: 2339
console.log(user.location);`,
        },
        {
          id: "step-3",
          language: "ts",
          code: `const user = {
  name: "Ada",
  age: 26,
  location: "London",
};

console.log(user.location);
//           ^?`,
        },
      ],
    },
  },
};
