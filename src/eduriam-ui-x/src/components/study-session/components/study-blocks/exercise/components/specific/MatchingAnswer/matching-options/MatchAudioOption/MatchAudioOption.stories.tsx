import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent } from "storybook/test";

import MatchAudioOption from "./MatchAudioOption";

const meta = {
  title: "x/study-session/study-blocks/exercise-components/MatchAudioOption",
  component: MatchAudioOption,
  parameters: { layout: "centered" },
} satisfies Meta<typeof MatchAudioOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    audioUrl: "https://mocks.linguino.org/audio-short.mp3",
    onClick: fn(),
  },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByLabelText("toggle-audio"));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Selected: Story = {
  args: {
    audioUrl: "https://mocks.linguino.org/audio-short.mp3",
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    audioUrl: "https://mocks.linguino.org/audio-short.mp3",
    disabled: true,
  },
};

export const WrongShake: Story = {
  args: {
    audioUrl: "https://mocks.linguino.org/audio-short.mp3",
    animateWrong: true,
  },
};
