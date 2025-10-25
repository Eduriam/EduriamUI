import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";

import { StudyBlockComponentType } from "../../types/StudyBlockComponentTypes";
import LongAudio from "./LongAudio";

const meta: Meta<typeof LongAudio> = {
  title: "x/study-block-components/LongAudio",
  component: LongAudio,
};

export default meta;
type Story = StoryObj<typeof LongAudio>;

export const Base: Story = {
  args: {
    component: {
      id: "aud-long-1",
      type: StudyBlockComponentType.LONG_AUDIO,
      audioUrl: "https://mocks.linguino.org/audio-long.mp3",
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Play audio")).toBeInTheDocument();
  },
};
