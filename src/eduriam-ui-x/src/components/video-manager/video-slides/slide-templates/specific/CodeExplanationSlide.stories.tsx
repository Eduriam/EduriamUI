import { Player } from "@remotion/player";
import type { Meta, StoryObj } from "@storybook/react";

import React, { useMemo } from "react";

import {
  CodeExplanationSlide,
  ICodeExplanationSlide,
} from "./CodeExplanationSlide";

interface CodeExplanationSlideStoryProps {
  slide: ICodeExplanationSlide;
}

const CodeExplanationSlideStory: React.FC<CodeExplanationSlideStoryProps> = ({
  slide,
}) => {
  const fps = 30;
  const Component = useMemo(() => {
    const Comp: React.FC = () => (
      <CodeExplanationSlide slide={slide} fps={fps} />
    );
    return Comp;
  }, [slide]);

  return (
    <Player
      component={Component}
      durationInFrames={180}
      fps={fps}
      compositionWidth={1920}
      compositionHeight={1080}
      style={{ width: "100%" }}
      controls
    />
  );
};

const meta: Meta<typeof CodeExplanationSlideStory> = {
  title: "x/video-manager/video-slides/CodeExplanationSlide",
  component: CodeExplanationSlideStory,
};

export default meta;
type Story = StoryObj<typeof CodeExplanationSlideStory>;

export const Default: Story = {
  args: {
    slide: {
      id: "code-explanation-1",
      type: "CODE_EXPLANATION",
      codeExplanation: {
        id: "ce-1",
        steps: [
          {
            id: "step-1",
            startTime: 0,
            language: "ts",
            code: `const user = {
  name: "Ada",
  age: 26,
};`,
          },
          {
            id: "step-2",
            startTime: 2500,
            language: "ts",
            code: `const user = {
  name: "Ada",
  age: 26,
};

console.log(user.name);`,
          },
        ],
      },
    },
  },
};
