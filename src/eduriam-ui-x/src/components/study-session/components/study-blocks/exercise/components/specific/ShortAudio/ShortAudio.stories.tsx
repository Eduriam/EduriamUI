import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";

import { StudyBlockComponentType } from "../../StudyBlockComponentTypes";
import ShortAudio from "./ShortAudio";

const meta: Meta<typeof ShortAudio> = {
  title: "x/study-session/study-blocks/exercise-components/ShortAudio",
  component: ShortAudio,
};

export default meta;
type Story = StoryObj<typeof ShortAudio>;

export const Base: Story = {
  args: {
    component: {
      id: "abcdefg",
      type: StudyBlockComponentType.SHORT_AUDIO,
      audioUrl: "https://mocks.linguino.org/audio-short.mp3",
    },
    playOnMount: false,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Play audio")).toBeInTheDocument();
  },
};
