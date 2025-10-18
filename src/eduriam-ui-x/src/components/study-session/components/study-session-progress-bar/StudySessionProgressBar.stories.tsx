import type { Meta, StoryObj } from "@storybook/react";
import StudySessionProgressBar from "./StudySessionProgressBar";

const meta: Meta<typeof StudySessionProgressBar> = {
  title: "atoms/StudySessionProgressBar",
  component: StudySessionProgressBar,
};

export default meta;
type Story = StoryObj<typeof StudySessionProgressBar>;

export const Base: Story = {
  args: { value: 50, maxValue: 100 },
};
