import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "core/feedback/ProgressBar",
  component: ProgressBar,
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Small: Story = {
  args: { size: "small", value: 40 },
};

export const Medium: Story = {
  args: { size: "medium", value: 40 },
};

export const Large: Story = {
  args: { size: "large", value: 40 },
};
