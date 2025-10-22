import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";

import SimpleCircularProgress from "./SimpleCircularProgress";

const meta: Meta<typeof SimpleCircularProgress> = {
  title: "x/shared/SimpleCircularProgress",
  component: SimpleCircularProgress,
};

export default meta;
type Story = StoryObj<typeof SimpleCircularProgress>;

export const Base: Story = {
  args: {
    progress: 65,
    children: "Center",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Center")).toBeInTheDocument();
  },
};
