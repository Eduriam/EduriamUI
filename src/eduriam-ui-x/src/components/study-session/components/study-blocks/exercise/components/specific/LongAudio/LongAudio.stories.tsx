import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";

import { ExerciseStudyBlockComponentType } from "../../ExerciseStudyBlockComponentTypes";
import LongAudio from "./LongAudio";

const meta: Meta<typeof LongAudio> = {
  title: "x/study-session/study-blocks/exercise-components/LongAudio",
  component: LongAudio,
};

export default meta;
type Story = StoryObj<typeof LongAudio>;

export const Base: Story = {
  args: {
    component: {
      id: "aud-long-1",
      type: ExerciseStudyBlockComponentType.LONG_AUDIO,
      audioUrl: "https://mocks.linguino.org/audio-long.mp3",
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Play audio")).toBeInTheDocument();
  },
};
